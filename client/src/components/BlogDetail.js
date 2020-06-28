import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from "react-redux";
import BlogDetailMain from "./BlogDetailMain";
import { getBlogs, deleteBlog } from "../actions/blogActions";
import PropsTypes from "prop-types";
import { Button, Container, Row, Col } from "reactstrap";

class BlogDetail extends Component {
  componentDidMount() {
    this.props.getBlogs();
    // console.log(this.props.match.params.id);
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
            <Col sm="4">
              {blogs.map(({ _id, title, file, userId }) => (
                <div key={_id} className="sm-blog-list mb-3">
                  <div className="image">
                    <img src={file ? `/uploads/${file}` : "/blog.jpg"} alt="" />
                  </div>
                  <div className="content">
                    <b>{title}</b>
                    <br />
                    {isAuthenticated && userId === user._id ? (
                      <i
                        onClick={() => this.deleteBlog(_id)}
                        className="far fa-trash-alt"
                      ></i>
                    ) : (
                      ""
                    )}
                    <Button
                      tag={Link}
                      to={"/single-blog/" + _id}
                      color="light"
                      className="sm-blog-list-btn"
                    >
                      Read More...
                    </Button>
                  </div>
                </div>
              ))}
            </Col>
            <BlogDetailMain id={this.props.match.params.id} />
          </Row>
        )}
      </Container>
    );
  }
}

BlogDetail.PropsTypes = {
  getBlogs: PropsTypes.func.isRequired,
  blog: PropsTypes.object.isRequired,
  auth: PropsTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  auth: state.auth,
});

export default connect(mapStateToProps, { getBlogs, deleteBlog })(BlogDetail);
