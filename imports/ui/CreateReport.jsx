import React, { Component } from 'react';

export default class CreateReport extends Component {
    state = {
        title: "",
        description: "",
    }

    createReport(event) {
        event.preventDefault();
        var _that = this;
        Meteor.call("createReport", this.state.title, this.state.description, function (err, res) {
            // console.log(err, res);
            if (!err && res) {
                _that.setState({title: "", description: ""});
            }
        })
    }

    handleChange(type, event) {
        var _st = {};
        _st[type] = event.target.value;
        this.setState(_st);
    }

  render() {
    return (
      <div>
          <h2>Create a New Report:</h2>
          <form onSubmit={this.createReport.bind(this)}>
              <label>
                  Title:
                  <input type="text" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
              </label>
              <label>
                  Description:
                  <input type="text" value={this.state.description} onChange={this.handleChange.bind(this, "description")} />
              </label>
              <input type="submit" value="Create Report" />
          </form>
      </div>
    );
  }
}
