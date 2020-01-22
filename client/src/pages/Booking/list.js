import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import 'moment-timezone';
import Moment from 'react-moment';
import { Row, Col, Card, CardBody, Container, InputGroup, Input, InputGroupAddon, InputGroupText } from "reactstrap";
//Import Actions
import { logoutUser } from "../../actions/authActions";
import { bookingDoctor, getAllBooking } from "../../actions/bookingAction";

import NavigationBar from "../../layout/navigation";

class Index extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
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
                .filter(i => i.doctorID.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        }
        return data
    }

    componentDidMount() {
        this.props.getAllBooking()
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { list, loading } = this.props.booking;
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
            
        if (list) {
            if (list.data.length > 0) {
                const filtered = this.filter(list.data);
                content = (
                    <Row className='py-5'>
                        {filtered.map((item, i) => 
                            <Col md={{ size:8, offset:2 }} key={i}>
                                <Card className='mb-3'>
                                    <CardBody>
                                        <Row>
                                            <Col md='2'>
                                                <i className="fa fa-book fa-4x"/>
                                            </Col>
                                            <Col md='8'>
                                                <h5> 
                                                    Janji dengan {item.doctorID.name}, <br /> 
                                                    pada tanggal: <Moment format='DD-MM-YYYY'>{item.bookingTime}</Moment>, 
                                                    jam <Moment format='H:mm'>{item.bookingTime}</Moment> WIB <br />
                                                    di {item.hospitalID.name}, kota {item.hospitalID.city}
                                                </h5>
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
                            <Row>
                                <Col md='2' className='text-right'>
                                    <i className="fa fa-book fa-5x"/>
                                </Col>
                                <Col md='10'>
                                    <h2> Jadwal Anda </h2>
                                    <h2> Janji dengan dokter </h2>  
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
    getAllBooking: PropTypes.func.isRequired,
    bookingDoctor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    booking: state.booking
});

export default connect(mapStateToProps, {
    logoutUser, getAllBooking, bookingDoctor
})(Index);
