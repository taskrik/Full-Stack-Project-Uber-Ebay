import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllEvents, fetchEvent, addEvent } from "../actions/Events";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
import Moment from 'moment';
//import TablePagination from "@material-ui/core/TablePagination";

class EventsList extends PureComponent {

  componentWillMount() {
    this.props.fetchAllEvents();
  }

  fetchEvent(eventId) {
    this.props.fetchEvent(eventId);
  }

  addEvent = event => {
    this.props.addEvent(event);
  };

  render() {
    const { events, authenticated } = this.props;

    if (!authenticated) return <Redirect to="/login" />;

    const now = Moment().format("YYYY MM DD");
    const currentEvents = events.filter(event => Moment(event.endDate).format("YYYY MM DD") >= now)
    const OrderedEvents = currentEvents.sort(function (a, b) {
      return a.id - b.id;
    });

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <h1>All the Events</h1>
          <table>
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Starting</th>
                <th>Ending</th>
              </tr>
            </thead>
            <tbody>
              {OrderedEvents.map(event => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td> <Link
                    className="link"
                    to={`/events/${event.id}`}
                    onClick={() => this.fetchEvent(event.id)}
                  >
                    {event.name}
                  </Link></td>
                  <td> {Moment(event.startDate).format('ll')}</td>
                  <td>  {Moment(event.endDate).format('ll')}</td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <TablePagination  //I really tried but...
            colSpan={3}
            count={10}        
            rowsPerPage={2}
            page={1}
          /> */}
          <br />
          <br />
          <Link className="link" to={`/createEvent`}>
            CREATE EVENT
          </Link>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    events: state.events,
    authenticated: state.currentUser !== null,
    users: state.users === null ? null : state.users
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllEvents,
    fetchEvent,
    addEvent
  }
)(EventsList);
