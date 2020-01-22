import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Container, InputGroup, Input, InputGroupAddon, InputGroupText } from "reactstrap";
//Import Actions
import { logoutUser } from "../../actions/authActions";
import { getHospitalList } from "../../actions/hospitalAction";

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
                .filter(i => i.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 
                || i.city.indexOf(search.toLowerCase()) >= 0 );
        }
        return data
    }

    componentDidMount() {
        this.props.getHospitalList()
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const { data, loading } = this.props.hospital;
        let hospital, filterSection;

        if (loading) {
            hospital = (
                <Row className='py-5 justify-content-center'>
                    <Col md='12'>
                        <h4 className='text-center'>Loading data...</h4>
                    </Col>
                </Row>
            )
        }
            
        if (data) {
            if (data.data.length > 0) {
                const filtered = this.filter(data.data);
                hospital = (
                    <Row className='py-5'>
                        {filtered.map((item, i) => 
                            <Col md={{ size:8, offset:2 }} key={i}>
                                <Card className='mb-3'>
                                    <CardBody>
                                        <Row>
                                            <Col md='1'>
                                                <i className="fa fa-hospital-o"/>
                                            </Col>
                                            <Col md='11'>
                                                <h5> {item.name} </h5>
                                            </Col>
                                            <Col md='1'>
                                                <i className="fa fa-map-marker"/>
                                            </Col>
                                            <Col md='11'>
                                                <p> 
                                                    {item.fullAddress} <br />
                                                    {item.postCode}
                                                </p>
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
                                <Input placeholder="cari berdasarkan nama atau kota..." name="search" 
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
                hospital = (
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
                                    <i className="fa fa-hospital-o fa-5x"/>
                                </Col>
                                <Col md='10'>
                                    <h2> Cari Faskes </h2>
                                    <h2> Rumah sakit dan klinik </h2>  
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {filterSection}
                    {hospital}
                </Container>
            </div> 
        );
    }
}

Index.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getHospitalList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    hospital: state.hospital
});

export default connect(mapStateToProps, {
    logoutUser, getHospitalList
})(Index);
