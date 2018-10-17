var mongoose = require('mongoose');
var schema = mongoose.Schema;
module.exports = mongoose.model('Tracker',{
    charityId: String,
    amount: String,
    note: String,
    userId: { type: schema.Types.ObjectId, ref: 'User'}
});