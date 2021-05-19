import React, { useState } from "react";
import { Drawer, Button, Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
    MenuOutlined,
    BankOutlined,
    UserOutlined,
    FileDoneOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import logo from "./logo.png";


const Navbar = () => {
    return (
        <nav className="navbar">
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <img src={logo} style={{
                        height: "32px",
                        marginLeft: "1rem"
                    }} className="logo" alt="logo" />
                    <Link to="/" />
                </Menu.Item>
             <Menu.Item key="2" icon={<FileDoneOutlined />}>
                    <span className="nav-text">Employees</span>
                    <Link to="/employees" />
                </Menu.Item>
                <Menu.Item key="3" icon={<LogoutOutlined />}
                >
                    <span className="nav-text">Logout</span>
                    <Link to="/login" />
                </Menu.Item>
                <Menu.Item key="4" style={{ float: 'right', marginRight: '5px' }}
                >
                    <p style={{ display: 'inline-block', marginRight: '5px' }}>Welcome {localStorage.getItem("user")}</p>
                    <Avatar icon={<UserOutlined />} />
                    <Link to="/profile"/>
                </Menu.Item>
            </Menu>
        </nav>
    );
};

export default Navbar;