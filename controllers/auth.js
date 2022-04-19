const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { name } = require('ejs');

const {check, validationResult} = require('express-validator')

const hashit= (passsword)=>bcrypt.hash(passsword,8);


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE,
    database: 'Travewire'
});

// exports.tourist_register = (req,res)=> {
//     console.log(req.body);

//     const {username, firstname, lastname, email, password, passwordConfirm } = req.body;

//     //one person with one email can register one time & if passsword and passwordConfirm matches
//     db.query('SELECT email FROM user WHERE email = ?',[email], async (error, results)=>{
//         if(error){
//             console.log(error);
//         }
        
//         if (results.length > 0 ){
//             return res.render('tourist_register',{
//                 message:'Email already used'
//             });
//         } 
//         else if(password !== passwordConfirm) {
//             return res.render('tourist_register',{
//                 message:'Password do not match'
//             });
//         };

//         let hashedPassword = await bcrypt.hash(password, 8); //8 round to incript pw
        

//         db.query('INSERT INTO user SET ?',{username: username,firstname: firstname, lastname: lastname, email: email, passwords: hashedPassword }, (error, results)=>{
//             if(error){
//                 console.log(error);
//             }
//             else{
//                 return res.render('index',{
//                     message: 'User Registered'
//                 });
//             }
//         })

//     });

//     // res.redirect('/');
// }



exports.tourist_register = (req,res)=> {
    console.log(req.body);

    const {username, firstname, lastname, email, password, passwordConfirm } = req.body;
    var message = [];
    const errors = validationResult(req)
    //one person with one email can register one time & if passsword and passwordConfirm matches
    db.query('SELECT email FROM user WHERE email = ?',[email], async (error, results)=>{
        if(error){
            console.log(error);
        }
        
        if (results.length > 0 ){
            message.push('Email already used')
            return res.render('tourist_register',{message});
        } 
        else if(password !== passwordConfirm) {
            message.push('password donot match')
            return res.render('tourist_register',{message});
        };

        
        if(!errors.isEmpty()) {
            // return res.status(422).jsonp(errors.array())
            const alert = errors.array()
            res.render('tourist_register', {alert})
        }
        else{
            let hashedPassword = await hashit(password);//bcrypt.hash(password, 8); //8 round to incript pw

            db.query('INSERT INTO user SET ?',{username: username,firstname: firstname, lastname: lastname, email: email, passwords: hashedPassword }, (error, results)=>{
                if(error){
                    console.log(error);
                }
                else{
                    message.push('User Registered')
                    return res.render('index',{message});
                }
            })
        }        
        
    });
    

    // res.redirect('/');
}

// <% if(message) { %>
//     <div class="alert alert-danger" role="alert"><%= message %></div>
//     <% } %>


exports.login = (req, res)=>{
    const {username, password } = req.body;

    (
        async function(){
            try{
                const hashedPassword = await hashit(password);
                console.log(hashedPassword);
                console.log(req.body)
                db.query('SELECT * FROM user WHERE username = ?',[username], async (error, results)=>{
                    if(error){
                        console.log(error);
                    }
                    console.log(results);
                    if(results){
                        if(results.password = hashedPassword){
                            return res.render('index')
                        }  
                    }
                    else{
                        return res.render('login');
                    }
                })
            }
            catch(err){
                console.log(err);
            }
        }
    )()

}

