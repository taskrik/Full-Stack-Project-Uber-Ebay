import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { fetchAllComments, fetchComment } from "../actions/Comments";
import Paper from "@material-ui/core/Paper";

class CommentsDisplay extends PureComponent {
  componentWillMount() {
    this.props.fetchAllComments();
  }

  getComment(commentId) {
    this.props.fetchComment(commentId);
  }

  getCurrentUser(userId) {
    this.props.getCurrentUser(userId);
  }

  render() {
    const { comments } = this.props;

    const com = this.props.data.match.params.id
    const filterComments = comments.filter(comment => comment.tickets.id == com)

    const commentsList = filterComments.sort(function (a, b) {
      return a.id - b.id;
    });

    return (
      <div>
        <Paper className="styles" elevation={4}>
          <h3>comments:</h3>
          <table>
            <thead>
              <tr>
                <th>Users Email</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {commentsList.map(comment => (
                <tr key={comment.id}>
                  <td>
                    {comment.users.email}
                  </td>

                  <td>
                    {comment.comment}
                  </td>
                  <td />
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    comments: state.comments,
    comment: state.comment,
    users: state.users === null ? null : state.users
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllComments,
    fetchComment,
  }
)(CommentsDisplay);