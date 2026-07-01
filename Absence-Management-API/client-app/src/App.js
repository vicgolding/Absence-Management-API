import { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css';
import { Col, Table, Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap';

function App() {
  const [ absences, setAbsences ] = useState([]);
  
  const path = "https://localhost:5013/api/absence-requests";
  
  useEffect(() => {
    fetch(path)
        .then(response => response.json())
        .then((data) => setAbsences(data))
        .catch(err => console.error("API Error:", err));
  }, []);

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
  
  async function updateRequest(event) {
    const requestId = event.target.dataset.id;
    try {
      const response = await fetch(`${path}/${requestId}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error)
    }
  }
  
  async function deleteRequest(event) {
    const requestId = event.target.dataset.id;
    try {
      const response = await fetch(`${path}/${requestId}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  async function processFormData(formData) {
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
  
  return (
    <div className="App">
      <div className="container my-5">
        <div className="col">
          <h2 className="text-center mb-5">Absenzübersicht</h2>
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
                      <Button 
                          data-id={absence.id} 
                          color="warning" 
                          onClick={updateRequest}>
                        Update
                      </Button>
                      <Button
                          data-id={absence.id}
                          color="danger"
                          onClick={deleteRequest}>
                        Delete</Button>
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
          <h2 className="text-center mb-5">Absenzformular</h2>
          <Form action={processFormData}>
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
