import React from "react";
import { Route } from "react-router-dom"
import { Layout } from "antd";
import NavBar from "./Navbar";
import Scheadule from "../scheadule/Schedule"

function App() {
  return (
    <div >
      <NavBar />
      <Layout>
        <Layout.Content>
        <Route exact path="/calendar" component={Scheadule} />
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
