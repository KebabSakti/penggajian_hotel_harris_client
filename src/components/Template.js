import React, { useContext, useState, useEffect } from "react";
import { Button, Layout, Drawer, message } from "antd";
import { AuthContext } from "../contexts/AuthContext";
import { Footer } from "antd/lib/layout/layout";
import { MenuOutlined } from "@ant-design/icons";
import MenuMain from "./MenuMain";

function Template({ children, ...props }) {
  const { Header, Content, Sider } = Layout;
  const [, , logout, check] = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);

  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerCollapsed ? "hidden" : "auto";
  }, [drawerCollapsed]);

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

  function toggleDrawer(value) {
    setDrawerCollapsed(value);
  }

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider={true}>
      <Drawer
        maskClosable={() => toggleDrawer(!drawerCollapsed)}
        placement="left"
        closable={true}
        visible={drawerCollapsed}
        getContainer={false}
        bodyStyle={{ padding: "0px", margin: "0px" }}
        style={{ position: "absolute" }}
        onClose={() => toggleDrawer(!drawerCollapsed)}
      >
        <div style={{ paddingTop: "50px" }}>
          <MenuMain navigate={navigate} {...props} />
        </div>
      </Drawer>
      <Sider
        collapsible
        collapsedWidth="0"
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
        <MenuMain navigate={navigate} {...props} />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "#FBFBFB", padding: "0px 18px" }}>
          {collapsed && (
            <Button
              type="dashed"
              shape="circle"
              onClick={() => {
                toggleDrawer(!drawerCollapsed);
              }}
            >
              <MenuOutlined />
            </Button>
          )}
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
