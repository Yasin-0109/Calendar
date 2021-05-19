import React from "react";
import { Route } from "react-router-dom"
import { Layout } from "antd";
import NavBar from "./Navbar";
import Scheadule from "../scheadule/Schedule"
import { profile } from "../profile";

function App() {
  return (
    <div >
      <NavBar />
      <Layout>
        <Layout.Content>
        <Route exact path="/" component={Scheadule} />
        <Route exact path="/profile" component={profile} />
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
