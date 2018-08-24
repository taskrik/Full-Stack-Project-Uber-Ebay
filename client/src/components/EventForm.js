import React, { PureComponent } from "react";
import Paper from "@material-ui/core/Paper";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class EventForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

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
                label="Name"
                name="name"
                value={
                  this.state.name || ''
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
                
                name="startDate"
                type="date"
                value={this.state.startDate || ''}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                
                name="endDate"
                type="date"
                value={this.state.endDate || ''}
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

export default EventForm;
