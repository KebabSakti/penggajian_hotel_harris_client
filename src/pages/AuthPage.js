import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import { Layout, Card, Col, Row, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function AuthPage() {
  const { Content } = Layout;
  const [user, login] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  async function submitForm(value) {
    setLoading(true);
    try {
      await login(value.username, value.password).then((response) => {
        message.success("Selamat Datang " + response.data.name);
      });
    } catch (e) {
      message.error("Login gagal, cek kembali user dan password anda");
      setLoading(false);
    }
  }

  if (user != null) {
    return <Redirect to="/salary" />;
  }

  return (
    <Layout
      style={{ backgroundColor: "#fafafa", height: "100vh", width: "100vw" }}
    >
      <Content>
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col xs={22} sm={18} md={14} lg={10} xl={6}>
            <h1
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontSize: "30px",
              }}
            >
              Login Admin
            </h1>
            <Card style={{ padding: "15px 10px" }}>
              <Form
                form={form}
                name="login"
                initialValues={{ remember: true }}
                onFinish={submitForm}
              >
                <Form.Item
                  name="username"
                  style={{ marginBottom: "20px" }}
                  rules={[
                    { required: true, message: "Username tidak boleh kosong" },
                  ]}
                >
                  <Input
                    prefix={
                      <UserOutlined
                        style={{ paddingRight: "5px", color: "#d9d9d9" }}
                      />
                    }
                    placeholder="Username"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  style={{ marginBottom: "20px" }}
                  rules={[
                    { required: true, message: "Password tidak boleh kosong" },
                  ]}
                >
                  <Input
                    prefix={
                      <LockOutlined
                        style={{ paddingRight: "5px", color: "#d9d9d9" }}
                      />
                    }
                    type="password"
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default AuthPage;
