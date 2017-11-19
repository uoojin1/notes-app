import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

// to show correct error message. Only comes here if pw > 8 char
Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;
      new SimpleSchema({
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.Email
        }
      }).validate({email});
    
    return true;
});