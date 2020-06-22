import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { Link } from "react-router-dom";
import PropsTypes from "prop-types";
import {
  Alert,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
} from "reactstrap";

class Login extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
  };

  componentWillMount() {
    //If authenticated
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //If authenticated
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <Container className="my-5">
        <Row>
          <Col className="text-center">
            <h2 className="py-2">Login</h2>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form
              onSubmit={this.onSubmit}
              className="border p-5 rounded bg-light"
            >
              <FormGroup row>
                <Label for="email" sm={2}>
                  Email
                </Label>
                <Col sm={10}>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.inputHandler}
                    placeholder="Enter your registered email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={2}>
                  Password
                </Label>
                <Col sm={10}>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.inputHandler}
                    placeholder="Enter your password"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={{ size: 6, offset: 2 }}>
                  <Button color="primary">Submit</Button>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={{ size: 8, offset: 2 }}>
                  <Label for="">Don't have an account ? </Label>
                  <Link tag={Link} to="/register">
                    &nbsp;Register
                  </Link>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login.PropsTypes = {
  isAuthenticated: PropsTypes.bool,
  error: PropsTypes.object.isRequired,
  login: PropsTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login })(Login);
