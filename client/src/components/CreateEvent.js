import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addEvent } from "../actions/Events";
import EventForm from "./EventForm";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";

class CreateEvent extends PureComponent {

  addEvent = event => {
    this.props.addEvent(event);
  };


  render() {
    const { authenticated } = this.props;

    if (!authenticated) return <Redirect to="/events" />;

    return (
      <div>
        
        <Paper className="styles" elevation={4}>
          <h1> Create Event </h1>
          <EventForm onSubmit={this.addEvent} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.event,
    events: state.events,
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users
  };
};

export default connect(
  mapStateToProps,
  {
    addEvent
  }
)(CreateEvent);
