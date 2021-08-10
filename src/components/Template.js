import React, { useContext, useState } from "react";
import { Button, Layout, Menu, message } from "antd";
import { AuthContext } from "../contexts/AuthContext";
import {
  HomeOutlined,
  MenuOutlined,
  ContactsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/lib/layout/layout";

function Template({ children, ...props }) {
  const { Header, Content, Sider } = Layout;
  const [, , logout] = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

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
            key="/home"
            icon={<HomeOutlined style={{ fontSize: "18px" }} />}
          >
            Beranda
          </Menu.Item>
          <Menu.Item
            key="/salary"
            icon={<ContactsOutlined style={{ fontSize: "18px" }} />}
          >
            Penggajian
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
