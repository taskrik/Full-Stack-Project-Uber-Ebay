import React, { PureComponent } from "react";
import Paper from "@material-ui/core/Paper";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";

class TicketForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      event: this.props.event
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
                label="Author"
                name="authorName"
                value={
                  this.state.authorName || ''
                }
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                label="Description"
                name="description"
                value={
                  this.state.description || ''
                }
                onChange={this.handleChange}
              />
            </div>

            <div>
              <TextField
                label="Price"
                name="price"
                value={this.state.price || ''}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <TextField
                label="Image"
                name="image"
                value={this.state.image || ''}
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
    event: state.event
  };
};

export default connect(mapStateToProps)(TicketForm);