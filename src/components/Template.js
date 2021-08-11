import React, { useContext, useState, useEffect } from "react";
import { Button, Layout, Menu, message } from "antd";
import { AuthContext } from "../contexts/AuthContext";
import { Footer } from "antd/lib/layout/layout";
import {
  MenuOutlined,
  ContactsOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  AuditOutlined,
  ApartmentOutlined,
  BlockOutlined,
  ExceptionOutlined,
  KeyOutlined,
} from "@ant-design/icons";

function Template({ children, ...props }) {
  const { Header, Content, Sider } = Layout;
  const [, , logout, check] = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    check();
  }, []);

  async function navigate(target) {
    if (target !== props.history.location.pathname) {
      if (target === "/logout") {
        const loading = message.loading("Mohon tunggu..", 0);
        try {
          await logout().then(() => {
            message.destroy(loading.key);
          });
        } catch (e) {
          message.destroy(loading.key);
          message.error("Terjadi kesalahan, cobalah beberapa saat lagi");
        }
      } else {
        props.history.push(target);
      }
    }
  }

  function toggleSidebar(value) {
    setCollapsed(value);
  }

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider={true}>
      <Sider
        collapsible
        width="250"
        breakpoint="lg"
        trigger={null}
        style={{ backgroundColor: "#fff" }}
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          toggleSidebar(broken);
        }}
      >
        <div
          style={{ height: "28px", margin: "16px", backgroundColor: "#FBFBFB" }}
        />
        <Menu
          theme="light"
          defaultSelectedKeys={["/home"]}
          mode="inline"
          selectedKeys={props.history.location.pathname}
          onClick={(event) => {
            navigate(event.key);
          }}
        >
          <Menu.Item
            key="/salary"
            icon={<ContactsOutlined style={{ fontSize: "18px" }} />}
          >
            Penggajian
          </Menu.Item>
          <Menu.Item
            key="/employee"
            icon={<UserSwitchOutlined style={{ fontSize: "18px" }} />}
          >
            Karyawan
          </Menu.Item>
          <Menu.Item
            key="/department"
            icon={<AuditOutlined style={{ fontSize: "18px" }} />}
          >
            Department
          </Menu.Item>

          <Menu.Item
            key="/position"
            icon={<ApartmentOutlined style={{ fontSize: "18px" }} />}
          >
            Jabatan
          </Menu.Item>

          <Menu.Item
            key="/status"
            icon={<BlockOutlined style={{ fontSize: "18px" }} />}
          >
            Status
          </Menu.Item>

          <Menu.Item
            key="/tax"
            icon={<ExceptionOutlined style={{ fontSize: "18px" }} />}
          >
            Tax Status
          </Menu.Item>

          <Menu.Item
            key="/password"
            icon={<KeyOutlined style={{ fontSize: "18px" }} />}
          >
            Password
          </Menu.Item>

          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined style={{ fontSize: "18px" }} />}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "#FBFBFB", padding: "0px 18px" }}>
          <Button
            onClick={() => {
              toggleSidebar(!collapsed);
            }}
          >
            <MenuOutlined />
          </Button>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, minHeight: 360, backgroundColor: "#fff" }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#FBFBFB" }}>
          Software Provided by{" "}
          <a href="https://vjtechsolution.com" target="_blank" rel="noreferrer">
            https://vjtechsolution.com
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Template;
