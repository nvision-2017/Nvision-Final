let keystone = require('keystone');
let Types = keystone.Field.Types;

let Accommodation = new keystone.List('Accommodation', {
    nodelete: true,
    nocreate: true
});

var User = keystone.list('User');

Accommodation.add({
    user: { type: Types.Relationship, initial:true, required: true, ref: 'User', noedit: true, index:true},
    // gender: {type: Types.Select, options: 'Male, Female', initial: true, required: true, noedit: true},
    on19: {type: Types.Boolean, default: false},
    on20: {type: Types.Boolean, default: false},
    on21: {type: Types.Boolean, default: false},
    on22: {type: Types.Boolean, default: false},
    confirmed: {type: Types.Boolean, default: false},
    noOfMale: {type: Types.Number, default: 0, required: true, noedit: true},
    noOfFemale: {type: Types.Number, default: 0, required: true, noedit: true},
    mailStatus: {type: Types.Boolean, noedit: true, default: false},
    email: {type: Types.Text, noedit: true},
    phone : {type: Types.Text, noedit: true},
    notes: {type: Types.Textarea}
});

Accommodation.schema.pre('save', function(next){
    User.model.findById(this.user).then((user)=>{
        this.email = user.email;
        this.phone = user.phone;
        if (!this.mailStatus && this.confirmed) {
            User.model.findById(this.user).then((user)=>{
                this.mailStatus = true;
                require('../routes/mail.js').sendAAMail(user.email, user.name.first+' '+user.name.last);
                next();
            }, (err)=>{
                console.log(err);
                next();
            });
        }
        else if (!this.confirmed) {
            this.mailStatus = false;
            next();
        }
        else {
            next();
        }
    })
});

Accommodation.defaultColumns = 'id|1%, user|15%, email|20%%, phone|15%, noOfMale|5%, noOfFemale|5%, on19|5%, on20|5%, on21|5%, on22|5%, confirmed, notes';
Accommodation.register();
