import { useEffect, useState, useRef } from 'react';
import './App.css';
import './bootstrap.min.css';
import { Button, Col, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { ToastContainer } from 'react-toastify';
import { validateInput, showToast } from './functions';

const path = "https://localhost:5013/api/absence-requests";

function App() {
  const [ absences, setAbsences ] = useState([]);
  
  useEffect(() => {
    fetch(path)
        .then(response => response.json())
        .then((data) => setAbsences(data))
        .catch(error => showToast(`API error: ${error}`, 2000, "error"));
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
                            showToast("Successfully deleted", 2000, "warning");
                            const updatedRequests = absences.filter(a => a.id !== absenceRequest.id);
                            setAbsences(updatedRequests);
                        }
                    })
            } catch (error) {
                showToast(error, 2000, "error");
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
                                    showToast("Successfully updated", 2000, "info");
                                    setStatus(newStatus);
                                }
                            })
                    } else {
                        showToast("Unknown absence status", 2000, "error");
                    }
                } else {
                    showToast("Request not found", 2000, "error");
                }
            } catch (error) {
                showToast(error, 2000, "error");
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
        const [isDisabled, setDisabled] = useState(false);
        const [startDateValue, setStartDate] = useState("");
        const [endDateValue, setEndDate] = useState("");
        const startDateRef = useRef(null);
        const endDateRef = useRef(null);
        
        const validateStartDate = (e) => {
            setStartDate(e.target.value);
            let endDateValue = endDateRef.current.props.value;
            if (endDateValue && endDateValue < e.target.value) {
                showToast("Das Startdatum darf nicht nach dem Enddatum liegen.", 2000, "error", e.target.id);
                validateInput(e.target, false);
                setDisabled(true);
            } else {
                validateInput(e.target, true);
                setDisabled(false);
            }
        }
        
        const validateEndDate = (e) => {
            setEndDate(e.target.value);
            let startDateValue = startDateRef.current.props.value;
            if (startDateValue && startDateValue > e.target.value) {
                showToast("Das Startdatum darf nicht nach dem Enddatum liegen.", 2000, "error", e.target.id);
                validateInput(e.target, false);
                setDisabled(true);
            } else {
                validateInput(e.target, true);
                setDisabled(false);
            }
        }
        
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
                    showToast("Successfully added", 2000, "success");
                    addRequestToState(await response.json());
                } else {
                    showToast("Etwas ist schiefgelaufen!", 5000, "error");
                }
            } catch (error) {
                showToast(error, 2000, "error");
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
                            placeholder="Name eingeben"
                            required
                            onChange={e => {
                                if (e.target.value.match(/\d/g) != null) {
                                    showToast("Keine Zahlen erlaubt", 2000, "error", e.target.id);
                                    validateInput(e.target, false);
                                    setDisabled(true);
                                } else {
                                    validateInput(e.target, true);
                                    setDisabled(false);
                                }
                            }}
                        />
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
                            ref={startDateRef}
                            value={startDateValue}
                            onChange={(e) => validateStartDate(e)}
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
                            ref={endDateRef}
                            value={endDateValue}
                            onChange={(e) => validateEndDate(e)}
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
                            onChange={e => {
                                if (e.target.value.length >= 150) {
                                    showToast("Maximal 150 Zeichen", 2000, "error", e.target.id);
                                    validateInput(e.target, false);
                                    setDisabled(true);
                                } else {
                                    validateInput(e.target, true);
                                    setDisabled(false);
                                }
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={2}>
                        <Button primary disabled={isDisabled}>
                            Neuen Antrag erstellen
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

    return (
      <div className="App">
          <ToastContainer />
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
