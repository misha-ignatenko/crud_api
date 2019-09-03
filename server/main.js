import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Reports from '/imports/api/reports';

Meteor.startup(() => {

});


Meteor.methods({
    "createReport": function (title, description) {
        check(title, String);
        check(description, String);

        if (!this.userId) {
            throw new Meteor.Error("You need to be logged in.");
        }

        if (title === "") {
            throw new Meteor.Error("Title cannot be empty.");
        }

        return Reports.insert({title: title, description: description, createdBy: this.userId, createdAt: new Date()});
    },
    // "readReport": function (reportId) {
    //
    // },
    "editReport": function (reportId, title, description) {
        check(reportId, String);
        check(title, String);
        check(description, String);

        return Reports.update(reportId, {$set: {title: title, description: description}});
    },
    "deleteReport": function (reportId) {
        check(reportId, String);

        return Reports.remove(reportId);
    }
});

Meteor.publish('users', function usersPublication() {
    return Meteor.users.find({}, {fields: {username: 1}});
});