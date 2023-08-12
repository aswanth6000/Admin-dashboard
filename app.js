const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const nocache = require('nocache')


app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(session({
    secret : 'secret-key',
    resave : false,
    saveUninitialized : true
}))
app.use(nocache());

app.use(require('./routes/login'));
app.use(require('./routes/signup'));
app.use(require('./routes/userDashboard'))
app.use(require('./routes/userLogout'))

app.get('/', (req, res)=>{
    res.render("login",{errorMessage : ''});
})

app.get('/signup',(req, res)=>{
    res.render("signup");
})


const PORT  = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

mongoose.connect('mongodb://localhost:27017/employee_details',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', ()=>{
    console.log("Database connected : ");
})
