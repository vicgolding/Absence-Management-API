import { useEffect, useState } from 'react';
import RequestTable from './components/RequestTable';
import RequestForm from './components/RequestForm';
import './App.css';
import './bootstrap.min.css';

export async function approveRequest(event) {
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
            // updateRequestToState(await response.json(), approvedStatus);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function denyRequest(event) {
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
            // updateRequestToState(await response.json(), deniedStatus);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteRequest(event) {
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

export async function handleSubmit(formData) {
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
            // addRequestToState(await response.json());
        }
    } catch (error) {
        console.log(error);
    }
}

const path = "https://localhost:5013/api/absence-requests";

function App() {
  const [ absences, setAbsences ] = useState([]);
  
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
  
  return (
      <div className="App">
          <div className="container-fluid px-5 my-5">
              <div className="col">
                  <h2 className="text-center mb-5">Absenzübersicht</h2>
                  <RequestTable requests={absences}/>
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
