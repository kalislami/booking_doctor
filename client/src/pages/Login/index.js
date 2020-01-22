import React, { Component } from "react";
import { Button, Card, CardBody, CardGroup, Col,
  Container, Form, Input, InputGroup, InputGroupAddon, 
  InputGroupText, Row, FormFeedback } from 'reactstrap';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
      setLoader: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ setLoader: true });
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userData);
    setTimeout(() => {
      if (this.state.errors) {
        this.setState({ setLoader: false });
      }
    }, 1000)
  }

  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        // style={{
        //   height: "100vh",
        //   background: "linear-gradient(180deg, #00C9FF 0%, #92FE9D 100%)"
        // }}
      >
        <Container>
          <Row className="justify-content-center pt-5">
            <Col lg="5">
              <CardGroup>
                <Card className="px-3 py-1">
                  <CardBody>
                    <Form>
                      <Row>
                        <Col xs="3">
                        {/* <img
                          alt="Lyfe Logo"
                          src={logo}
                          width="70"
                          height="auto"
                          className="img-fluid"
                        /> */}
                        </Col>
                        <Col xs="9">
                          <h1 className="text-dark">Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                        </Col>
                      </Row>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" 
                          placeholder="Username" 
                          autoComplete="username"
                          name="username"
                          onChange={this.onChange}
                          value={this.state.username}
                          invalid={this.state.errors.username ? true : false}
                        />
                        {this.state.errors.username && (
                          <FormFeedback>{this.state.errors.username}</FormFeedback>
                        )}
                      </InputGroup>
                      
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" 
                          placeholder="Password" 
                          autoComplete="current-password"
                          name="password"
                          onChange={this.onChange}
                          value={this.state.password}
                          invalid={this.state.errors.password ? true : false}
                        />
                        {this.state.errors.password && (
                          <FormFeedback>{this.state.errors.password}</FormFeedback>
                        )}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="dark" className="px-4" onClick={this.onSubmit}>
                            {this.state.setLoader ? (
                              'Loading...'
                            ) : 'Login'}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
