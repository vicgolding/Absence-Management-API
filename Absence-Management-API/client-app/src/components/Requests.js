import React from 'react';
import { Button, ButtonGroup } from "reactstrap";
import { approveRequest, denyRequest, deleteRequest } from '../App.js';

function Requests(props) {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.employeeName}</td>
            <td>{props.absenceType}</td>
            <td>{props.startDate}</td>
            <td>{props.endDate}</td>
            <td>{props.comment}</td>
            <td>{props.absenceStatus}</td>
            <td>
                <ButtonGroup>
                    <Button
                        data-id={props.id}
                        data-status={1}
                        color="success"
                        onClick={approveRequest}
                    >
                        Approve
                    </Button>
                    <Button
                        data-id={props.id}
                        data-status={2}
                        color="warning"
                        onClick={denyRequest}
                    >
                        Deny
                    </Button>
                    <Button
                        data-id={props.id}
                        data-status={3}
                        color="danger"
                        onClick={deleteRequest}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}

export default Requests;