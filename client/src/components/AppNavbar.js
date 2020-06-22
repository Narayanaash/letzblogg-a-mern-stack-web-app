import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import PropsTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { isAuthenticated, user } = props.auth;

  const authLinks = (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret className="text-capitalize">
        {user ? `Welcome ${user.name}` : ""}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={props.logout}>Logout</DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/add-blog">
          Add Blog
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const guestLinks = (
    <NavItem>
      <NavLink tag={Link} to="/login">
        Login
      </NavLink>
    </NavItem>
  );
  return (
    <div>
      <Navbar color="light" light expand="md" className="mb-5">
        <Container>
          <NavbarBrand tag={Link} to="/">
            <i className="fas fa-pen-nib"></i> <strong>LETZBLOGG</strong>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/about">
                  About
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

AppNavbar.PropsTypes = {
  logout: PropsTypes.func.isRequired,
  auth: PropsTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AppNavbar);
