
import React from "react";
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import routes from "routes.js";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-info");
    document.body.classList.remove("bg-white");
    return () => {
      document.body.classList.add("bg-info");
      document.body.classList.remove("bg-default");
      document.body.classList.remove("bg-white");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes,loginsuccess) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const history = useHistory();
  if(localStorage.getItem('token')) {
    history.push('/cms')
  }
  const loginsuccess = () => {
    history.push('/cms')
  }
  return (
    <>
      <div className="main-content" ref={mainContent}>
        <div className="header bg-gradient-neutral py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="">ยินดีต้อนรับ สู่ Gan Banking</h1>
                  <p className="text-lead">
                    กรุณาลงชื่อเข้าใช้
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-info"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Switch>
              {getRoutes(routes, loginsuccess)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Auth;
