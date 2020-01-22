import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
//Import Actions
import { logoutUser } from "../../actions/authActions";

import NavigationBar from "../../layout/navigation";

class Index extends Component {
    constructor() {
        super();
        this.state = {
        // showFlash: false
        };
    }
    onClickLogin = () => {
        this.props.history.push("/login");
    };

    onClickLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        return (
            <div>
                <NavigationBar
                  isAuthenticated={isAuthenticated}
                  logout={this.onClickLogout}
                  login={this.onClickLogin}
                />
                <Container>
                    <Row className='pt-5 justify-content-center'>
                        <Col md='12'>
                            {isAuthenticated && (
                                <h2> Hai {user.name} </h2>
                            )}
                            <h2>  Selamat datang di IHC Website</h2>
                            <h4>Kami memberikan pelayanan komprehensif dan terpadu dengan standar pelayanan terkreditasi.</h4>
                        </Col>
                    </Row>
                    <Row className='py-5 justify-content-center'>
                        <Col md='4'>
                            <Link to='/all-doctor'>
                                <Card>
                                    <CardBody className='text-center'>
                                        <i className="fa fa-book fa-4x my-3"/>
                                        <h5> Booking Cepat </h5>
                                        <h5> Pesan Dokter Langganan </h5>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>

                        <Col md='4'>
                            <Link to='/hospital'>
                                <Card>
                                    <CardBody className='text-center'>
                                        <i className="fa fa-hospital-o fa-4x my-3"/>
                                        <h5> Cari Faskes </h5>
                                        <h5> Rumah sakit dan klinik </h5>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>

                        <Col md='4'>
                            <Link to='/specialty'>
                                <Card>
                                    <CardBody className='text-center'>
                                        <i className="fa fa-medkit fa-4x my-3"/>
                                        <h5> Cari Dokter </h5>
                                        <h5> Umum dan spesialis </h5>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div> 
        );
    }
}

Index.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {
    logoutUser
})(Index);
