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
  Col,
} from "reactstrap";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

class BlogDetailMain extends Component {
  deleteBlog = (id) => {
    this.props.deleteBlog(id);
  };

  createMarkup(description) {
    return { __html: description };
  }

  render() {
    const { blogs } = this.props.blog;
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Col md="8" className="mb-1">
        {blogs.map(({ _id, title, file, description, userId }) =>
          _id !== this.props.id ? (
            ""
          ) : (
            <Card className="mb-4">
              <CardImg
                top
                width="100%"
                src={file ? `/uploads/${file}` : "/blog.jpg"}
                alt=""
              />
              <CardBody>
                <CardTitle>
                  <h5>{title}</h5>
                </CardTitle>
                <div className="share-btns">
                  <EmailShareButton
                    url={window.location.href}
                    subject={title}
                    body={description}
                    separator=" "
                  >
                    <EmailIcon className="mr-2" size={32} />
                  </EmailShareButton>
                  <FacebookShareButton
                    url={window.location.href}
                    quote={title}
                    hashtag="#Letzblogg"
                  >
                    <FacebookIcon className="mr-2" size={32} />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    title={title}
                    via="letzblogg"
                    hashtags="#letzblogg"
                  >
                    <TwitterIcon className="mr-2" size={32} />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={window.location.href}
                    title={title}
                    separator=" "
                  >
                    <WhatsappIcon size={32} />
                  </WhatsappShareButton>
                </div>
                <CardText
                  className="blog-detail-text"
                  dangerouslySetInnerHTML={this.createMarkup(description)}
                ></CardText>
                {isAuthenticated && userId === user._id ? (
                  <Button tag={Link} to={"/update-blog/" + _id} color="primary">
                    <i className="fa fa-edit"></i> Edit
                  </Button>
                ) : (
                  ""
                )}
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
          )
        )}
      </Col>
    );
  }
}

BlogDetailMain.PropsTypes = {
  getBlogs: PropsTypes.func.isRequired,
  blog: PropsTypes.object.isRequired,
  auth: PropsTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog,
  auth: state.auth,
});

export default connect(mapStateToProps, { getBlogs, deleteBlog })(
  BlogDetailMain
);
