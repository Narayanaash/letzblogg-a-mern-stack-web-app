import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getBlogs, deleteBlog } from "../actions/blogActions";
import PropsTypes from "prop-types";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

class BlogsList extends Component {
  componentDidMount() {
    this.props.getBlogs();
  }

  deleteBlog = (id) => {
    this.props.deleteBlog(id);
  };

  render() {
    const { blogs, loading } = this.props.blog;
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Container>
        {loading ? (
          <h5 className="loading">Loading...</h5>
        ) : (
          <Row>
            {blogs.map(({ _id, title, shortDesc, file, userId }) => (
              <Col key={_id} sm="6" md="4" className="mb-1">
                <Card className="mb-4">
                  <CardImg
                    className="home-list-img"
                    top
                    width="100%"
                    src={file ? `/uploads/${file}` : "/blog.jpg"}
                    alt=""
                  />
                  <CardBody>
                    <CardTitle>
                      <h5>{title}</h5>
                    </CardTitle>
                    <CardText>{shortDesc}</CardText>
                    <Button
                      tag={Link}
                      to={"/single-blog/" + _id}
                      color="primary"
                    >
                      Read More
                    </Button>
                    {isAuthenticated && userId === user._id ? (
                      <Button
                        className="trash"
                        color="danger"
                        onClick={() => this.deleteBlog(_id)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </Button>
                    ) : (
                      ""
                    )}
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    );
  }
}

BlogsList.PropsTypes = {
  getBlogs: PropsTypes.func.isRequired,
  blog: PropsTypes.object.isRequired,
  auth: PropsTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  auth: state.auth,
});

export default connect(mapStateToProps, { getBlogs, deleteBlog })(BlogsList);
