import React, { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css';
import {Button, ButtonGroup, Col, Form, FormGroup, Input, Label, Table} from "reactstrap";

const path = "https://localhost:5013/api/absence-requests";

function App() {
  const [ absences, setAbsences ] = useState([]);
  
  useEffect(() => {
    fetch(path)
        .then(response => response.json())
        .then((data) => setAbsences(data))
        .catch(err => console.error("API Error:", err));
  }, []);

    async function approveRequest(event) {
        const requestId = event.target.dataset.id;
        const approvedStatus = 1;
        const response = await fetch(
            `${path}/${requestId}`
        );
        const initialRequest = await response.json();
        const data = JSON.stringify(
            {
                id: initialRequest.id,
                employeeName: initialRequest.employeeName,
                absenceType: initialRequest.absenceType,
                absenceStatus: approvedStatus,
                startDate: initialRequest.startDate,
                endDate: initialRequest.endDate,
                comment: initialRequest.comment
            }
        );
        try {
            const response = await fetch(
                `${path}/${requestId}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: data,
                }
            );
            if (response.status === 202) {
                console.log("change accepted");
                updateRequestToState(await response.json(), approvedStatus);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function denyRequest(event) {
        const requestId = event.target.dataset.id;
        const deniedStatus = 2;
        const response = await fetch(
            `${path}/${requestId}`
        );
        const initialRequest = await response.json();
        const data = JSON.stringify(
            {
                id: initialRequest.id,
                employeeName: initialRequest.employeeName,
                absenceType: initialRequest.absenceType,
                absenceStatus: deniedStatus,
                startDate: initialRequest.startDate,
                endDate: initialRequest.endDate,
                comment: initialRequest.comment
            }
        );
        try {
            const response = await fetch(
                `${path}/${requestId}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: data,
                }
            );
            if (response.status === 202) {
                console.log("change accepted");
                updateRequestToState(await response.json(), deniedStatus);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteRequest(event) {
        const requestId = event.target.dataset.id;
        try {
            const response = await fetch(
                `${path}/${requestId}`, {
                    method: 'DELETE'
                }
            );
            if (response.status === 201) {
                console.log("successfully deleted");
            }
        } catch (error) {
            console.error(error);
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
                console.log("success");
                addRequestToState(await response.json());
            }
        } catch (error) {
            console.log(error);
        }
    }
  
      function addRequestToState(absence) {
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

    function updateRequestToState(absence, newStatus) {
        /*setAbsences(previousState => {
            return { ...previousState, absenceStatus: newStatus }
        });*/
    }
    
    const Request = (absence, index) => {
        const request = absence.absence;
        return (
            <tr key={index}>
                <th scope="row">{request.id}</th>
                <td>{request.employeeName}</td>
                <td>{request.absenceType}</td>
                <td>{request.startDate.slice(0, 10)}</td>
                <td>{request.endDate.slice(0, 10)}</td>
                <td>{request.comment}</td>
                <td>{request.absenceStatus}</td>
                <td>
                    <ButtonGroup>
                        <Button
                            data-id={request.id}
                            color="success"
                            onClick={approveRequest}
                        >
                            Approve
                        </Button>
                        <Button
                            data-id={request.id}
                            color="warning"
                            onClick={denyRequest}
                        >
                            Deny
                        </Button>
                        <Button
                            data-id={request.id}
                            color="danger"
                            onClick={deleteRequest}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
    }
    
    const RequestTable = () =>
        <Table
            bordered
            hover
            responsive
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
                    Status
                </th>
                <th>
                    Aktion
                </th>
            </tr>
            </thead>
            <tbody>
            {absences.map((absence, index) =>
                <Request absence={absence} index={index} />                
            )}
            </tbody>
        </Table>


    const RequestForm = () =>
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
                        <option value={2}>Training</option>
                        <option value={3}>Anderes</option>
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
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={2}>
                    <Button primary>
                        Neue Anfrage erstellen
                    </Button>
                </Col>
            </FormGroup>
        </Form>

    return (
      <div className="App">
          <div className="container-fluid px-5 my-5">
              <div className="col">
                  <h2 className="text-center mb-5">Absenzübersicht</h2>
                  <RequestTable />
              </div>
          </div>
          <div className="container my-5">
              <div className="col">
                  <h2 className="text-center mb-5">Absenzformular</h2>
                  <RequestForm />
              </div>
          </div>
      </div>
  );
}

export default App;
