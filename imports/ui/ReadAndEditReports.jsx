import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Reports from '../api/reports';

class ReadReports extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedReport: undefined,
            editedTitle: undefined,
            editedDescription: undefined,
        };

        // this.setSelectedReport = this.setSelectedReport.bind(this);
        // this.onDismiss = this.onDismiss.bind(this);
    }

    setSelectedReport(_id) {
        const _rpt = this.props.reports.find(function (r) {
            return r._id === _id;
        });
        this.setState({selectedReport: _rpt, editedTitle: _rpt.title, editedDescription: _rpt.description});
    }

    handleChange(type, event) {
        let _st = {};
        _st[type] = event.target.value;
        this.setState(_st);
    }

    resetSelected() {
        this.setState({
            selectedReport: undefined,
            editedTitle: undefined,
            editedDescription: undefined,
        })
    }

    editReport(id) {
        let _that = this;
        Meteor.call("editReport", id, this.state.editedTitle, this.state.editedDescription, function (err, res) {
            if (!err && res) {
                _that.resetSelected();
            }
        });
    }

    deleteReport(id) {
        let _that = this;
        Meteor.call("deleteReport", id, function (err, res) {
            if (!err && res) {
                _that.resetSelected();
            }
        });
    }

    render() {
        const _rpt = this.state.selectedReport
        const reports = this.props.reports.map(
            report => this.makeLink(report)
        );
        const _editsMade = _rpt && (_rpt.title !== this.state.editedTitle || _rpt.description !== this.state.editedDescription);

        return (
            <div>
                {_rpt && <div>
                    <h2>Report Details:</h2>
                    <p>Title: <input type="text" value={this.state.editedTitle} onChange={this.handleChange.bind(this, "editedTitle")} /></p>
                    <p>Description: <input type="text" value={this.state.editedDescription} onChange={this.handleChange.bind(this, "editedDescription")} /></p>
                    <p>Created by: {this.props.users.find(function(u) {
                        return u._id === _rpt.createdBy
                    })["username"]}</p>
                    <p>Created at: {_rpt.createdAt.toString()}</p>
                    {_editsMade && <button onClick={this.editReport.bind(this, _rpt._id)}>Save Edits</button>}
                    <button onClick={this.deleteReport.bind(this, _rpt._id)}>Delete</button>
                </div>}

                <h2>Click on Report to Show Details:</h2>
                <ul>{ reports }</ul>
            </div>
        );
  }

  makeLink(report) {
    return (
      <li key={report._id} onClick={this.setSelectedReport.bind(this, report._id)}>
        <a href={report.url} target="_blank">{report.title}</a>
      </li>
    );
  }
}

export default InfoContainer = withTracker(() => {
    let _reportsSub = Meteor.subscribe("reports");
    let _usersSub = Meteor.subscribe("users");
    return {
        reports: _reportsSub.ready() && Reports.find().fetch() || [],
        users: _usersSub.ready() && Meteor.users.find().fetch() || [],
    };
})(ReadReports);
