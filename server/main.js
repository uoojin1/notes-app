import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users'; // this will execute the file - has account.validate
import '../imports/startup/simple-schema-configuration';


Meteor.startup(() => {

});
