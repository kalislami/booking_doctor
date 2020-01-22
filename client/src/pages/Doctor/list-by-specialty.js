import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Container, InputGroup, Input, InputGroupAddon, InputGroupText, Button, Alert } from "reactstrap";
//Import Actions
import { logoutUser } from "../../actions/authActions";
import { getDoctorBySpecialty } from "../../actions/doctorAction";
import { bookingDoctor } from "../../actions/bookingAction";

import NavigationBar from "../../layout/navigation";
import ShowModal from"./modal";

class Index extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            modal: false,
            nestedModal: false,
            allModal: false,
            selected: {},
            bookingDay: '',
            bookingDate: '',
            alert: false,
            loading: false
        };
    }
    onClickLogin = () => {
        this.props.history.push("/login");
    };

    onClickLogout = () => {
        this.props.logoutUser();
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    filter = (data) => {
        const {search} = this.state;
        if (search !== '') {
            return data
                .filter(i => i.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        }
        return data
    }

    openModal = (data) => {
        this.setState({ modal: true })
        if (data) {
            this.setState({ selected: data })
        }
    }

    closeModal = () => {
        this.setState({ modal: false })
    }

    toggleNestedModal = () => {
        this.setState({ 
            nestedModal: !this.state.nestedModal,
            allModal: false
        })
    }

    toggleAllModal = () => {
        this.setState({ 
            nestedModal: !this.state.nestedModal,
            allModal: true
        })
    }

    onDismiss = () => {
        this.setState({ alert: false });
    }

    booking = () => {
        this.setState({ loading: true })
        const { selected, bookingDate, bookingDay } = this.state
        const filteredPractice = selected.practice.filter(i => i.day === parseInt(bookingDay))[0];
        const bookingTime = new Date(`${bookingDate} ${filteredPractice.startTime}`)
        const hospitalID = filteredPractice.hospital._id
        
        const data = {
            bookingTime: bookingTime,
            hospitalID: hospitalID,
            doctorID: selected._id
        }

        this.props.bookingDoctor(data)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.booking.booking) {
            if (nextProps.booking.booking.success === true) {
                this.setState({ 
                    alert: true, 
                    loading: false,
                    modal: false,
                    nestedModal: false,
                    allModal: false
                })   
            }
        }
    }

    componentDidMount() {
        const id = this.props.location.data;
        if (!id) {
            this.props.history.push("/specialty")
        }
        else {
            this.props.getDoctorBySpecialty(id);
        }
    }

    componentWillMount() {
        this.props.booking.booking = null;
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { doctor, loading } = this.props.doctor;
        let content, filterSection, showModal = null;

        if (loading) {
            content = (
                <Row className='py-5 justify-content-center'>
                    <Col md='12'>
                        <h4 className='text-center'>Loading data...</h4>
                    </Col>
                </Row>
            )
        }
            
        if (doctor) {
            if (doctor.data.length > 0) {
                const filtered = this.filter(doctor.data);
                content = (
                    <Row className='py-5'>
                        {filtered.map((item, i) => 
                            <Col md={{ size:8, offset:2 }} key={i}>
                                <Card className='mb-3'>
                                    <CardBody>
                                        <Row>
                                            <Col md='1'>
                                                <i className="fa fa-user 2x"/>
                                            </Col>
                                            <Col md='8'>
                                                <h5> {item.name} </h5>
                                            </Col>
                                            <Col md='3'>
                                                <Button color='primary' onClick={this.openModal.bind(this, item)}>
                                                    Detail
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        )}
                    </Row>
                )

                filterSection = (
                    <Row className='pt-5 justify-content-center'>
                        <Col md='8'>
                            <InputGroup>
                                <Input placeholder="cari dokter..." name="search" 
                                    onChange={this.onChange} value={this.state.search}
                                />
                                <InputGroupAddon addonType="append">
                                <InputGroupText>
                                    <i className="fa fa-search" aria-hidden="true" />
                                </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                )
            }
            else {
                content = (
                    <Row className='py-5 justify-content-center'>
                        <Col md='12'>
                            <h5 className='text-center'>Empty data</h5>
                        </Col>
                    </Row>
                )
            }
        }

        const i = this.state.selected;
        if (this.state.modal) {
            showModal = (
                <ShowModal
                    onCancel={this.closeModal.bind(this)}
                    isOpen={this.state.modal}
                    formInput={this.onChange}
                    bookingDayVal={this.state.bookingDay}
                    bookingDate={this.state.bookingDate}
                    onBooking={this.booking.bind(this)}
                    data={i}
                    toggleNested={this.toggleNestedModal.bind(this)}
                    isOpenNested={this.state.nestedModal}
                    isOpenAll={this.state.allModal}
                    isLoading={this.state.loading}
                    auth={isAuthenticated}
                />
            )
        }
        

        return (
            <div>
                {showModal}
                <NavigationBar
                  isAuthenticated={isAuthenticated}
                  logout={this.onClickLogout}
                  login={this.onClickLogin}
                />
                <Container>
                    <Row className='pt-5 justify-content-center'>
                        <Col md='8'>
                            <Alert color='success'
                            isOpen={this.state.alert} toggle={this.onDismiss}>
                                Selamat! Booking dokter berhasil 
                            </Alert>
                            <Row>
                                <Col md='2' className='text-right'>
                                    <i className="fa fa-medkit fa-5x"/>
                                </Col>
                                <Col md='10'>
                                    <h2> Cari Dokter </h2>
                                    <h2> Umum dan spesialis </h2>  
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {filterSection}
                    {content}
                </Container>
            </div> 
        );
    }
}

Index.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getDoctorBySpecialty: PropTypes.func.isRequired,
    bookingDoctor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    doctor: state.doctor,
    booking: state.booking
});

export default connect(mapStateToProps, {
    logoutUser, getDoctorBySpecialty, bookingDoctor
})(Index);
