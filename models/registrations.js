let keystone = require('keystone');
let Types = keystone.Field.Types;

let Registration = new keystone.List('Registration', {
  noedit: true,
});

Registration.add({
  event: {type: Types.Relationship, ref: 'Event', initial: true, index: true},
  user: {type: Types.Relationship, ref: 'User', initial: true, index: true}
});

Registration.defaultColumns = '_id, event, user';

Registration.register();
