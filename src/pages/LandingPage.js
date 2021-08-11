import React, { useContext, useEffect } from "react";
import { Spin, Row, Col } from "antd";
import { AuthContext } from "../contexts/AuthContext";

export default function LandingPage() {
  const [, , , setUser] = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <Spin size="large" tip="Loading.." />
        </Col>
      </Row>
    </div>
  );
}
