import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import EventsList from "./components/EventsList";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import LogoutPage from "./components/logout/LogoutPage";
import CreateEvent from "./components/CreateEvent";
import TopBar from "./components/layout/TopBar";
import TicketsList from "./components/TicketsList";
import CreateTicket from "./components/CreateTicket";
import TicketDetails from "./components/TicketDetails";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <TopBar />
          <Route exact path="/events" component={EventsList} />
          <Route exact path="/events/:id" component={TicketsList} />
          <Route exact path="/showTickets/:id" component={TicketDetails} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/createEvent" component={CreateEvent} />
          <Route exact path="/createTicket" component={CreateTicket} />
          <Route exact path="/" render={() => <Redirect to="/events" />} />
        </div>
      </Router>
    );
  }
}

export default App;
