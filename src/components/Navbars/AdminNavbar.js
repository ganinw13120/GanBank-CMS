
import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar style={{color:"white"}}>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {localStorage.getItem('name')}
                    </span>
                  </Media>
                </Media>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
