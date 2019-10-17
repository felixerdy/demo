var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const User = mongoose.model('User', { name: String, password: String });

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/users', function (req, res) {
    User.find(function (err, users) {
        if (err) return console.error(err);
        res.send(users)
    })
});

app.post('/user', function (req, res) {
    const user = new User(req.body)
    user.save().then(function (result) {
        res.send(result)
    }).catch(function (err) {
        response.status(500).send(error);
    })

})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
