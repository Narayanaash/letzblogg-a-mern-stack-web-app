import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import PropsTypes from "prop-types";

class Register extends Component {
  state = {
    name: "",
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
      if (error.id === "REGISTER_FAIL") {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    //Add item via register action
    this.props.register(newUser);
  };

  render() {
    return (
      <Container className="my-5">
        <Row>
          <Col className="text-center">
            <h2 className="py-2">Register</h2>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form
              onSubmit={this.onSubmit}
              className="border p-5 pb-0 rounded bg-light"
            >
              <FormGroup row>
                <Label for="name" sm={2}>
                  Name
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                    onChange={this.inputHandler}
                    placeholder="Enter your good name"
                  />
                </Col>
              </FormGroup>
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
                  <Label for="">Already have an account ? </Label>
                  <Link tag={Link} to="/login">
                    &nbsp;Login
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

Register.PropsTypes = {
  isAuthenticated: PropsTypes.bool,
  error: PropsTypes.object.isRequired,
  register: PropsTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register })(Register);
