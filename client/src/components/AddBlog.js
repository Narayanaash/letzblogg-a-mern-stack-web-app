import React, { Component } from "react";
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
import CKEditor from "@ckeditor/ckeditor5-react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { addBlog, getBlogs } from "../actions/blogActions";
import PropsTypes from "prop-types";

class AddBlog extends Component {
  state = {
    title: "",
    shortDesc: "",
    file: null,
    description: "<p>write world's best blog now...</p>",
    uploading: false,
    uploaded: false,
    error: false,
  };

  componentWillMount() {
    //If authenticated
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fileInputHandler = async (e) => {
    await this.setState({ file: e.target.files[0] });
    console.log(this.state.file);
  };

  ckeditorInputHandler = (event, editor) => {
    const data = editor.getData();
    this.setState({ description: data });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { title, shortDesc, file, description } = this.state;

    if (!title || !shortDesc || !file || !description) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false, uploading: true });

      // const newBlog = {
      //   title: this.state.title,
      //   shortDesc: this.state.shortDesc,
      //   file: this.state.file,
      //   description: this.state.description,
      // };

      const data = new FormData();
      data.append("title", this.state.title);
      data.append("shortDesc", this.state.shortDesc);
      data.append("file", this.state.file);
      data.append("description", this.state.description);

      //Add item via addBlog action
      this.props.addBlog(data);
      this.setState({
        title: "",
        shortDesc: "",
        file: null,
        description: "<p>write world's best blog now...</p>",
        uploaded: false,
      });
    }
  };

  render() {
    const { uploaded, loading } = this.props.blog;

    return (
      <Container className="mb-5">
        {loading ? (
          <h5 className="loading">Loading...</h5>
        ) : (
          <TransitionGroup>
            <CSSTransition key="1" timeout={300} classNames="fade">
              <div>
                {this.state.error ? (
                  <Alert color="danger">No empty field allowed!</Alert>
                ) : this.state.uploading && !uploaded ? (
                  <Alert color="secondary">Blog upload in progress...</Alert>
                ) : uploaded ? (
                  <Alert color="success">Blog added successfully.</Alert>
                ) : (
                  ""
                )}
              </div>
            </CSSTransition>
          </TransitionGroup>
        )}

        <Form onSubmit={this.onSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={this.state.title}
                  onChange={this.inputHandler}
                  placeholder="write a title for your blog"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="shortDesc">Short Description</Label>
                <Input
                  type="text"
                  name="shortDesc"
                  id="shortDesc"
                  value={this.state.shortDesc}
                  placeholder="write a short description for your blog"
                  onChange={this.inputHandler}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="thumbnail">Thumbnail</Label>
            <Input
              type="file"
              name="file"
              id="thumbnail"
              onChange={this.fileInputHandler}
              accept=".jpg"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            {/* <Input type="text" name="description" id="description" value={this.state.description} placeholder="write a description for your blog" onChange={this.inputHandler} /> */}
            <CKEditor
              editor={ClassicEditor}
              onInit={(editor) => {}}
              name="description"
              id="description"
              onChange={this.ckeditorInputHandler}
              data={this.state.description}
            />
          </FormGroup>
          <Button color="primary" className="d-block ml-auto">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

AddBlog.PropsTypes = {
  getBlogs: PropsTypes.func.isRequired,
  addBlog: PropsTypes.func.isRequired,
  blog: PropsTypes.object.isRequired,
  isAuthenticated: PropsTypes.bool.isAuthenticated,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getBlogs, addBlog })(AddBlog);
