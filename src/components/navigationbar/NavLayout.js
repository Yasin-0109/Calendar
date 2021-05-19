import React from "react";
import { Route } from "react-router-dom"
import { Layout } from "antd";
import NavBar from "./Navbar";
import Scheadule from "../scheadule/Schedule"
import { profile } from "../profile";
import EmployeeList from "../profile/EmployeeList";
import TrainningList from "../profile/TrainingList";

function App() {
  return (
    <div >
      <NavBar />
      <Layout>
        <Layout.Content>
        <Route exact path="/" component={Scheadule} />
        <Route exact path="/employees" component={EmployeeList} />
        <Route exact path="/employees/:name" component={({match}) => (<TrainningList name = {match.params.name}/> )}/>
        <Route exact path="/profile" component={profile} />
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
