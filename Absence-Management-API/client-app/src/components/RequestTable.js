import React from 'react';
import { Table } from 'reactstrap';
import Requests from '../components/Requests';

const RequestTable = props =>
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
            {
                props.requests.map((request, index) =>
                <Requests 
                    key={index}
                    id={request.id}
                    employeeName={request.employeeName}
                    absenceType={request.absenceType}
                    startDate={request.startDate.slice(0, 10)}
                    endDate={request.endDate.slice(0, 10)}
                    comment={request.comment}
                    absenceStatus={request.absenceStatus}
                />
            )}
        </tbody>
    </Table>

export default RequestTable;