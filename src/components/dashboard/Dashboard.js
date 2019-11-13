import React, { Component } from "react";

class Dashboard extends Component {
  logout = () => {
    this.props.logoutUser();
  };
  render() {
    return (
      <div>
        <h2>Dummy Dashboard</h2>
      </div>
    );
  }
}

export default Dashboard;
