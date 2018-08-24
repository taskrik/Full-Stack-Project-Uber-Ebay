import React, { PureComponent } from "react";
import Paper from "@material-ui/core/Paper";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import { fetchTicket } from "../actions/Tickets";

class CommentForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            state: this.props.state
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div>
                <Paper className="styles" elevation={4}>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField
                                label="Comment"
                                name="comment"
                                value={
                                    this.state.comment || ''
                                }
                                onChange={this.handleChange}
                            />
                        </div>
                        <br />
                        <Button type="submit">Save</Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state
    };
};

export default connect(mapStateToProps, { fetchTicket })(CommentForm);