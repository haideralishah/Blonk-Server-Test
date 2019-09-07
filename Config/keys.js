//install dependency and require mongoose
var mongoose = require('mongoose');

//connect mongoDb collection
//put your mongoDb URL in first parameter of connect
mongoose.connect('mongodb+srv://jobcreation:jobcreation@cluster0-aocxz.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

//export mongoose 
module.exports = mongoose;