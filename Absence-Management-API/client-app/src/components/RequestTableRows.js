import React from 'react';
import {Button, ButtonGroup} from "reactstrap";

const RequestTableRows = props =>
    props.requests.map((request, index) => (
        <tr>
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
                        // onClick={approveRequest}
                    >
                        Approve
                    </Button>
                    <Button
                        data-id={request.id}
                        color="warning"
                        // onClick={denyRequest}
                    >
                        Deny
                    </Button>
                    <Button
                        data-id={request.id}
                        color="danger"
                        // onClick={deleteRequest}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    ));

export default RequestTableRows;