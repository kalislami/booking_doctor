import React from 'react';
import {
    Col, Row, Button, Modal, ModalBody, ModalFooter, 
    ModalHeader, Table, CardBody, Card, CardHeader,
    Label, InputGroup, Input
} from 'reactstrap';

const tableRow = (label, value) => (
    <tr>
        <td>{label}</td>
        <td>:</td>
        <td>
            {value}
        </td>
    </tr>
)

const getDay = (numb) => {
    let day;
    switch (numb) {
        case 0:
            day = 'Minggu'
            break;
        case 1:
            day = 'Senin'
            break;
        case 2:
            day = 'Selasa'
            break;
        case 3:
            day = 'Rabu'
            break;
        case 4:
            day = 'Kamis'
            break;
        case 5:
            day = 'Jumat'
            break;
        case 6:
            day = 'Sabtu'
            break;
    
        default:
            break;
    }
    return day
}

const getRangeHour = (data, key) => {
    const filtered = data.filter(val => val.day.toString() === key)
    if (filtered.length > 0) {
        return filtered[0].startTime + '-' + filtered[0].endTime
    }
    return '-'
}

const getHospital = (data, key) => {
    const filtered = data.filter(val => val.day.toString() === key)
    if (filtered.length > 0) {
        return filtered[0].hospital.name
    }
    return '-'
}

const getDates = (dayOfWeek) => {
    if (!isNaN(dayOfWeek)) {
        let dateW1 = new Date();
        let today = new Date();

        dateW1.setDate(dateW1.getDate() + (dayOfWeek + 7 - dateW1.getDay()) % 7);

        if (today.getDate() === dateW1.getDate()) {
            dateW1.setDate(dateW1.getDate() + (dayOfWeek + 14 - dateW1.getDay()) % 7);
        }
        
        return [
            {
                label: `${dateW1.getDate()}-${dateW1.getMonth() + 1}-${dateW1.getFullYear()}`,
                value: `${dateW1.getMonth() + 1}-${dateW1.getDate()}-${dateW1.getFullYear()}`
            }
        ]
    }
    return []
}

const ShowModal = (props) => (
    <Modal className="modal-lg modal-success" isOpen={props.isOpen} toggle={props.onCancel}>
        <ModalHeader toggle={props.onCancel}>Detail Dokter</ModalHeader>
        <ModalBody>
            <Row>
                <Col md='12'>
                    <Table borderless size='sm'>
                        <tbody>
                            {tableRow('Nama', props.data.name)}
                            {tableRow('Jadwal Praktik', '')}
                        </tbody>
                    </Table>
                    
                    <Table hover size='sm'>
                        <thead>
                            <tr>
                                <th>Hari</th>
                                <th>Jam</th>
                                <th>Lokasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.practice.map((item, i) => 
                                <tr key={i}>
                                    <td> {getDay(item.day)} </td>
                                    <td> {item.startTime + '-' + item.endTime} </td>
                                    <td> {item.hospital.name} </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    <Row className='mt-5'>
                        <Col md={{size:4, offset:2}}>
                            <Card>
                                <CardHeader>
                                    <h6>Keahlian</h6>
                                </CardHeader>
                                <CardBody>
                                    <ul>
                                        {props.data.skill.map((item, index) => 
                                            <li key={index}>{item.data}</li>
                                        )}
                                    </ul>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md='4'>
                            <Card>
                                <CardHeader>
                                    <h6>Penyakit Terkait</h6>
                                </CardHeader>
                                <CardBody>
                                    <ul>
                                        {props.data.relatedDiseases.map((item, index) => 
                                            <li key={index}>{item.data}</li>
                                        )}
                                    </ul>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal isOpen={props.isOpenNested} toggle={props.toggleNested} onClosed={props.isOpen ? props.onCancel : undefined}>
                <ModalHeader>Pilih waktu booking</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md='12'>
                            <Label>Hari:</Label>
                            <InputGroup className="mb-3">
                                <Input type="select" name="bookingDay"
                                    onChange={props.formInput}
                                    defaultValue={props.bookingDayVal}
                                >
                                    <option value=''>-- Pilih Hari --</option>
                                    {props.data.practice.map((op, i) => 
                                        <option key={i} value={op.day}>
                                            {getDay(op.day)}
                                        </option>
                                    )}
                                </Input>
                            </InputGroup>
                            <Label>Jam:</Label>
                            <InputGroup className="mb-3">
                               {getRangeHour(props.data.practice, props.bookingDayVal)}
                            </InputGroup>
                            <Label>Rumah Sakit:</Label>
                            <InputGroup className="mb-3">
                               {getHospital(props.data.practice, props.bookingDayVal)}
                            </InputGroup>
                            <Label>Pilih Tanggal:</Label>
                            <InputGroup className="mb-3">
                                <Input type="select" name="bookingDate"
                                    onChange={props.formInput}
                                    defaultValue={props.bookingDate}
                                >
                                    <option value=''>-- Pilih Tanggal --</option>
                                    {getDates(parseInt(props.bookingDayVal)).map((op, i) => 
                                        <option key={i} value={op.value}>
                                            {op.label}
                                        </option>
                                    )}
                                </Input>
                            </InputGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={props.toggleNested}>Cancel</Button>{' '}
                    {props.auth === true ? (
                        <Button color="primary" onClick={props.onBooking}>
                            {props.isLoading === true ? 'Loading...' : 'Submit'}
                        </Button>
                    ) : (
                        <span className='ml-3'>Login untuk bisa booking dokter</span>
                    ) }
                </ModalFooter>
            </Modal>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={props.onCancel}>Cancel</Button>
            <Button color="primary" onClick={props.toggleNested}>Booking</Button>
        </ModalFooter>
    </Modal>
)

export default ShowModal;