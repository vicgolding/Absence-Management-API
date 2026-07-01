import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../App.css';
import '../bootstrap.min.css';
import handleSubmit from '../App.js';

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

export default RequestForm;