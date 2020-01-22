import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Container, Button } from "reactstrap";
//Import Actions
import { logoutUser } from "../../actions/authActions";
import { getSpecialtyList } from "../../actions/doctorAction";

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

    componentDidMount() {
        this.props.getSpecialtyList()
    }

    viewDoctors = (id) => {
        this.props.history.push({
            pathname: "/specialty/doctor",
            data: id
        })
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { specialty, loading } = this.props.doctor;
        let content;

        if (loading) {
            content = (
                <Row className='py-5 justify-content-center'>
                    <Col md='12'>
                        <h4 className='text-center'>Loading data...</h4>
                    </Col>
                </Row>
            )
        }
            
        if (specialty) {
            if (specialty.data.length > 0) {
                content = (
                    <Row className='py-5'>
                        {specialty.data.map((item, i) => 
                            <Col md={{ size:8, offset:2 }} key={i}>
                                <Card className='mb-3'>
                                    <CardBody>
                                        <Row>
                                            <Col md='2'>
                                                <i className="fa fa-users fa-3x"/>
                                            </Col>
                                            <Col md='7'>
                                                <h5> {item.name} </h5>
                                                <p> {item.description} </p>
                                            </Col>
                                            <Col md='3'>
                                                <Button color='primary' className='mt-2' onClick={this.viewDoctors.bind(this, item._id)}>
                                                    View
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        )}
                    </Row>
                )
            }
            else {
                content = (
                    <Row className='py-5 justify-content-center'>
                        <Col md='12'>
                            <h4>Empty data</h4>
                        </Col>
                    </Row>
                )
            }
        }

        return (
            <div>
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
                                    <i className="fa fa-medkit fa-5x"/>
                                </Col>
                                <Col md='10'>
                                    <h2> Cari Dokter </h2>
                                    <h2> Umum dan spesialis </h2>  
                                </Col>
                            </Row>
                        </Col>
                    </Row>
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
    getSpecialtyList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    doctor: state.doctor
});

export default connect(mapStateToProps, {
    logoutUser, getSpecialtyList
})(Index);
