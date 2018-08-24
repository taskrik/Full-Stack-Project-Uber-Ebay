import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllTickets, fetchTicket, addTicket } from "../actions/Tickets";
import Paper from "@material-ui/core/Paper";
import { getRiskfactor } from '../shared/riskfactor';

class TicketsList extends PureComponent {

  componentWillMount() {
    this.props.fetchAllTickets();
  }

  fetchTicket(ticketId) {
    this.props.fetchTicket(ticketId);
  }

  addTicket = ticket => {
    this.props.addTicket(ticket);
  };

  getStyle = (riskfactor) => {
    var color = 'green';
    if(riskfactor > 33 && riskfactor <= 66) color = 'yellow';
    if(riskfactor > 66) color = 'red';

    return {
      color: color
    }
  }

  render() {
    const { ticket } = this.props
    const { tickets } = this.props
    const { comments } = this.props;
    const { users } = ticket;

    const ev = this.props.match.params.id
    const filterTickets = tickets.filter(ticket => ticket.events.id == ev)

    const OrderedTickets = filterTickets.sort(function (a, b) {
      return a.id - b.id;
    });

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <h1>All the Tickets</h1>
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Owner</th>
                <th>Price</th>
                <th>Description</th>
                <th>Link</th>
                <th>Fraud Indicator</th>
              </tr>
            </thead>
            <tbody>
              {OrderedTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.users.email}</td>
                  <td>{ticket.price}</td>
                  <td>{ticket.description}</td>
                  <td>
                    <Link
                      className="link"
                      to={`/showTickets/${ticket.id}`}
                      onClick={() => this.fetchTicket(ticket.id)}
                    >
                      See details
                    </Link>
                  </td>
                  <td style={this.getStyle(getRiskfactor(tickets, ticket, users, comments))}>{getRiskfactor(tickets, ticket, users, comments)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
          <Link className="link" to={`/createTicket`}>
            CREATE TICKET
          </Link>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    tickets: state.tickets,
    ticket: state.ticket,
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users,
    comments: state.comments
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllTickets,
    fetchTicket,
    addTicket
  }
)(TicketsList);
