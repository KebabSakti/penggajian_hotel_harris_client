import React from "react";
import { Menu } from "antd";
import {
  ContactsOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  AuditOutlined,
  ApartmentOutlined,
  BlockOutlined,
  ExceptionOutlined,
  KeyOutlined,
} from "@ant-design/icons";

function MenuMain({ navigate, ...props }) {
  return (
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
  );
}

export default MenuMain;
