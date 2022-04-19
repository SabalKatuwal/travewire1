const express = require('express');
const app = express();
const path =require('path');

//For protecting sensitive information
const dotenv = require('dotenv');
dotenv.config({path: './.env'}); 

//Connecting to mysql (make a database named Travewire)
const mysql = require('mysql');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DATABASE,
    database: 'Travewire'
});
// db.connect((error)=>{
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log('Connected to mysql...');
//     }
// });

//for keeping the files of css 

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));  //get data from forms and make it available in post method ko request ma
app.use(express.json())   //form bata ako data lai json ma parse garxa

//define all routes
app.use('/', require('./routes/pages'))     
app.use('/auth', require('./routes/auth'))  //'/auth' paxi aako url yeta janxa .routes/auth

// app.get('/login', function(req, res) {
//     req.render('login')
// });




const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`listening on port ${port}`)});


/*
home
about
detail id:
user profile
login
register
apply as guide
search
accomodationDetail
*/

/*
NAVBAR
home
about
sites
contact us 
*/