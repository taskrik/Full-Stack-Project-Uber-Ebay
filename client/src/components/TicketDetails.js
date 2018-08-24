import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import CommentForm from "./CommentForm";
import { addComment } from "../actions/Comments";
import CommentsDisplay from './CommentsDisplay';
import { getRiskfactor } from '../shared/riskfactor';
import { fetchAllComments } from "../actions/Comments";

class TicketDetails extends PureComponent {
    componentWillMount() {
        this.props.fetchAllComments();
    }

    addComment = comment => {
        this.props.addComment(comment);
    };

    render() {
        const { ticket } = this.props
        const { tickets } = this.props
        const { comments } = this.props;
        const { users } = ticket;

        return (
            <div>
                <Paper className="outer-paper">
                    <h1>Ticket: {ticket.id}</h1>
                    <p>Price: {ticket.price}</p>
                    <p>Description: {ticket.description}</p>
                    <p>Image: {ticket.image}</p>
                    <p>Risk factor: {getRiskfactor(tickets, ticket, users, comments)} %</p>
                    <hr />
                </Paper>
                <CommentsDisplay data={this.props} />
                <CommentForm onSubmit={this.addComment} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ticket: state.ticket,
        users: state.users,
        tickets: state.tickets,
        comments: state.comments
    }
}

export default connect(mapStateToProps, { addComment, fetchAllComments })(TicketDetails)