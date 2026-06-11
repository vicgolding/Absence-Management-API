import { React, useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css';
import { Col, Table, Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';

function App() {
  const [ absences, setAbsences ] = useState([]);

  useEffect(() => {
    fetch("https://localhost:5013/api/absence-requests")
        .then(response => response.json())
        .then((data) => setAbsences(data))
        .catch(err => console.error("API Error:", err));
  }, []);
  
  async function handleFormData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    /* TODO: format dates
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const startDateYear = startDate.slice(0, 4);
    const startDateMonth = startDate.slice(5, 7);
    const startDateDay = startDate.slice(8, 10);
    const endDateYear = endDate.slice(0, 4);
    const endDateMonth = endDate.slice(5, 7);
    const endDateDay = endDate.slice(8, 10);
    const processedStartDate = `${startDateYear}-${startDateMonth}-${startDateDay}T00:00:00`;
    const processedEndDate = `${endDateYear}-${endDateMonth}-${endDateDay}T00:00:00`;  
    */
    try {
      const response = await fetch("https://localhost:5013/api/absence-requests", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        console.log("success");
      }    
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="App">
      <div className="container my-5">
        <div className="col">
          <h2>Absenzübersicht</h2>
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
            {absences.map((absence) => (
                <tr>
                  <th scope="row">
                    {absence.id}
                  </th>
                  <td>
                    {absence.employeeName}
                  </td>
                  <td>
                    {absence.absenceType}
                  </td>
                  <td>
                    {absence.startDate.slice(0, 10)}
                  </td>
                  <td>
                    {absence.endDate.slice(0, 10)}
                  </td>
                  <td>
                    {absence.comment}
                  </td>
                  <td>
                    {absence.absenceStatus}
                  </td>
                  <td>
                    <ButtonGroup>
                      <Button color="warning pt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path
                              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </Button>
                      <Button color="danger pt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                          <path
                              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                          <path
                              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                      </Button>
                      <Button color="success pt-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                             fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                          <path
                              d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                          <path
                              d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                        </svg>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
            ))}
            </tbody>
          </Table>
      </div>
    </div>
      <div className="container my-5">
        <div className="col">
          <h2>Absenzformular</h2>
          <Form onSubmit={handleFormData}>
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
                  <option value={1}>Urlaub</option>
                  <option value={2}>Krankheit</option>
                  <option value={3}>Training</option>
                  <option value={4}>Anderes</option>
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
                  for="comments"
                  sm={2}
              >
                Kommentare
              </Label>
              <Col sm={10}>
                <Input
                    id="comments"
                    name="comments"
                    type="textarea"                     
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={12}>
                <Button
                    block
                    primary
                >
                  Submit
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
