/**
 * Created by mykhayloignatenko on 9/3/19.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export default Reports = new Mongo.Collection('reports');


if (Meteor.isServer) {
    Meteor.publish('reports', function reportsPublication() {
        return Reports.find({});
    });
}