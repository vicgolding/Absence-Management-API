import { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css';
import { Button, Col, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { ToastContainer, toast, Slide } from 'react-toastify';

const path = "https://localhost:5013/api/absence-requests";

function App() {
  const [ absences, setAbsences ] = useState([]);
  
  useEffect(() => {
    fetch(path)
        .then(response => response.json())
        .then((data) => setAbsences(data))
        .catch(err => console.error("API Error:", err));
  }, []);
        
    const RequestTable = () => {
        return (
            <Table
                bordered
                hover
                striped
            >
                <thead>
                <tr>
                    <th>
                        Absenz ID-Nummer
                    </th>
                    <th>
                        Mitarbeiter:in
                    </th>
                    <th>
                        Abwesenheitstyp
                    </th>
                    <th>
                        Startdatum
                    </th>
                    <th>
                        Enddatum
                    </th>
                    <th>
                        Kommentar
                    </th>
                    <th>
                        Aktueller Status
                    </th>
                </tr>
                </thead>
                <tbody>
                {absences.map((absence) =>
                    <RequestRow absence={absence} />
                )}
                </tbody>
            </Table>
        );
    }
    
    const RequestRow = absence => {
        const [ absenceRequest ] = useState(absence.absence);
        const absenceType = absenceRequest.absenceType;
        const absenceTypes = ["Urlaub", "Krankheit", "Weiterbildung", "Sonstiges"];
        async function handleRemoveRequest() {
            try {
                await fetch(`${path}/${absenceRequest.id}`, {
                    method: 'DELETE'
                })
                    .then((response) => {
                        if (response.status === 204) {
                            console.log("successfully deleted");
                            const updatedRequests = absences.filter(a => a.id !== absenceRequest.id);
                            setAbsences(updatedRequests);
                        }
                    })
            } catch (error) {
                console.error(error);
            }
        }
        
        return (
            <tr key={absenceRequest.id}>
                <th scope="row">{absenceRequest.id}</th>
                <td>{absenceRequest.employeeName}</td>
                <td>{absenceTypes[absenceType]}</td>
                <td>
                    {absenceRequest.startDate.slice(0, 10)}
                </td>
                <td>
                    {absenceRequest.endDate.slice(0, 10)}
                </td>
                <td>{absenceRequest.comment}</td>
                <td>
                    <div className="action-btns">
                       <AbsenceStatus status={absenceRequest.absenceStatus} id={absenceRequest.id} />
                       <Button
                           className="action-btn"
                           data-id={absenceRequest.id}
                           data-status={3}
                           color="danger"
                           onClick={handleRemoveRequest}>
                           <i className="bi bi-trash3"></i>
                       </Button>
                    </div>
                 </td>
            </tr>
        )
    }

    const AbsenceStatus = (props) => {
        const [ status, setStatus ] = useState(props.status);
        const absenceStatuses = ["Offen", "Genehmigt", "Abgelehnt"];
        async function updateStatus(event){
            const newStatus = parseInt(event.target.closest("button").dataset.status);
            const requestId = props.id;
            try {
                const absenceRequest = absences.find(absence => absence.id === requestId);
                if (absenceRequest) {
                    if (newStatus === 1 || newStatus === 2) {
                        await fetch(`${path}/${requestId}`, {
                            method: 'PUT',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: absenceRequest.id,
                                employeeName: absenceRequest.employeeName,
                                absenceType: absenceRequest.absenceType,
                                absenceStatus: newStatus,
                                startDate: absenceRequest.startDate,
                                endDate: absenceRequest.endDate,
                                comment: absenceRequest.comment
                            })
                        })
                            .then((response) => {
                                if (response.status === 202) {
                                    console.log("successfully updated");
                                    setStatus(newStatus);
                                }
                            })
                    } else {
                        console.log("unknown absence status");
                    }
                } else {
                    console.log("request not found");
                }
            } catch (error) {
                console.error(error);
            }
        }

        return ([
            <span key={props.id} className="me-auto">
                {absenceStatuses[status]}
            </span>,
            <Button
                className="action-btn"
                data-id={props.id}
                data-status={1}
                color="success"
                onClick={updateStatus}
            >
                <i className="bi bi-check"></i>
            </Button>,
            <Button
                className="action-btn"
                data-id={props.id}
                data-status={2}
                color="warning"
                onClick={updateStatus}
            >
                <i className="bi bi-x"></i>
            </Button>
        ]);
    }

    const RequestForm = () => {
        const [ toggleClass, setToggleClass ] = useState("");
        const notify = (message, autoClose) => toast.error(message, {
            position: "top-center",
            autoClose: autoClose,
            hideProgressBar: true,
            theme: "colored",
            transition: Slide,
        });
        
        async function handleSubmit(formData) {
            const employeeName = formData.get("employeeName");
            const absenceType = parseFloat(formData.get("selectAbsenceType"));
            const startDate = formData.get("startDate");
            const endDate = formData.get("endDate");
            const comment = formData.get("comment");
            const data = JSON.stringify(
                {
                    employeeName: employeeName,
                    absenceType: absenceType,
                    absenceStatus: 0,
                    startDate: startDate,
                    endDate: endDate,
                    comment: comment
                }
            );
            try {
                const response = await fetch(
                    path, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: data,
                    }
                );
                // TODO: setTimeout()
                if (response.status === 201) {
                    console.log("successfully added");
                    addRequestToState(await response.json());
                } else {
                    notify("Etwas ist schiefgelaufen!", 5000);
                }
            } catch (error) {
                console.log(error);
            }
        }

        const addRequestToState = absence => {
            setAbsences([
                ...absences,
                {
                    id: absence.id,
                    employeeName: absence.employeeName,
                    absenceType: absence.absenceType,
                    absenceStatus: absence.absenceStatus,
                    startDate: absence.startDate,
                    endDate: absence.endDate,
                    comment: absence.comment
                }
            ]);
        }
                
        return (
            <Form
                action={handleSubmit}
            >
                <FormGroup row>
                    <Label
                        for="employeeName"
                        sm={2}
                    >
                        Mitarbeiter:in
                    </Label>
                    <Col sm={10}>
                        <Input
                            id="employeeName"
                            name="employeeName"
                            className={toggleClass}
                            placeholder="Name eingeben"
                            required
                            onChange={e => {
                                if (e.target.value.match(/\d/g) != null) {
                                    notify("keine Zahlen erlaubt", 2000);
                                    setToggleClass("is-invalid");
                                } else {
                                    setToggleClass("");
                                }
                            }}
                        />
                        <ToastContainer />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="selectAbsenceType"
                        sm={2}
                    >
                        Abwesenheitstyp
                    </Label>
                    <Col sm={10}>
                        <Input
                            id="selectAbsenceType"
                            name="selectAbsenceType"
                            type="select"
                        >
                            <option value={0}>Urlaub</option>
                            <option value={1}>Krankheit</option>
                            <option value={2}>Weiterbildung</option>
                            <option value={3}>Sonstiges</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="startDate"
                        sm={2}
                    >
                        Startdatum
                    </Label>
                    <Col sm={10}>
                        <Input
                            id="startDate"
                            name="startDate"
                            placeholder="date placeholder"
                            type="date"
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="endDate"
                        sm={2}
                    >
                        Enddatum
                    </Label>
                    <Col sm={10}>
                        <Input
                            id="endDate"
                            name="endDate"
                            placeholder="date placeholder"
                            type="date"
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="comment"
                        sm={2}
                    >
                        Kommentare
                    </Label>
                    <Col sm={10}>
                        <Input
                            id="comment"
                            name="comment"
                            type="textarea"
                            className={toggleClass}
                            maxLength={300}
                            onChange={e => {
                                if (e.target.value.length >= 300) {
                                    notify("maximal 300 Zeichen", 2000);
                                }
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={2}>
                        <Button primary>
                            Neuen Antrag erstellen
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

    return (
      <div className="App">
          <div className="container-fluid px-5 my-5">
              <div className="col">
                  <h2 className="text-center mb-5">Abwesenheitsanträge</h2>
                  <RequestTable />
              </div>
          </div>
          <div className="container my-5">
              <div className="col">
                  <h2 className="text-center mb-5">Erfassen eines neuen Abwesenheitsantrags</h2>
                  <RequestForm />
              </div>
          </div>
      </div>
  );
}

export default App;
