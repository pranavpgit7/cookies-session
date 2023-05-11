const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const {v4:uuidv4} = require('uuid');
const nocache = require('nocache');

const router = require('./router');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(nocache());

app.set('view engine', 'ejs');
//static
//assets
app.use(session({
    secret: uuidv4(),
    resave: true,
    saveUninitialized: false
}));

app.use('/route',router);

//home route
app.get('/', (req,res)=>{
    if(req.session.user == null)
    {
        res.render('base',{title:"Login System"});
    }else{
        res.render('dashboard');
    }
});

app.listen(port, ()=>{
    console.log("Listening at localhost port 3000");
})