import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addTicket } from "../actions/Tickets";
import TicketForm from "./TicketForm";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";

class CreateTicket extends PureComponent {

  addTicket = ticket => {
    this.props.addTicket(ticket);
  };

  render() {
    const { authenticated } = this.props;

    if (!authenticated) return <Redirect to="/events" />;

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <h1> Create Ticket </h1>
          <TicketForm onSubmit={this.addTicket} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticket: state.ticket,
    tickets: state.tickets,
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users
  };
};

export default connect(mapStateToProps, { addTicket })(CreateTicket);

