const express = require('express');
const mysql = require('mysql');
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { name } = require('ejs');

const {check, validationResult} = require('express-validator');
const req = require('express/lib/request');
const { render } = require('express/lib/response');

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
                    return res.render('login',{message});
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
                db.query('SELECT * FROM user WHERE username = ?',[username], async (error, results)=>{
                    if(error){
                        console.log(error);
                    }
                    console.log('results',results,results.length);

                    if(results.length>0){
                        bcrypt.compare(req.body.password,results[0].passwords,(error,results)=>{
                            if(error){
                                console.log(error)
                            }
                            console.log('results = ',results)
                            if(results){
                                req.session.userinfo = username
                                console.log(req.session.userinfo)
                                return res.redirect('/')
                            }
                            else{
                                return res.redirect('/login')
                            }
                            
                        })
                    }else{
                        return res.redirect('/login')
                  }
                        // if(results.password == hashedPassword){
                        //     //req.session.username = results.username
                        //     return res.render('index',)
                        // } 
                    
                    
                })
            }
            catch(err){
                console.log(err);
            }
        }
    )()

}
  

exports.logout = (req, res)=>{
    if (req.session) {
        req.session.destroy(err => {
          if (err) {
            console.log(err)
          } 
          else {
            console.log('Logout successful')
            return res.redirect('/')
          }
        });
      } else {
        res.end()
      }
}



/*
for guide
*/

exports.guide_register = (req,res)=> {

    const {username, firstname, lastname, email, password, passwordConfirm } = req.body;
    const errors = validationResult(req)

        
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('tourist_register', {alert})
    }
    else{
        let hashedPassword = bcrypt.hash(password, 8);  //await hashit(password); //8 round to incript pw

        db.query('INSERT INTO guide SET ?',{username: username,firstname: firstname, lastname: lastname, email: email, passwords: hashedPassword }, (error, results)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log('guide registered in database')
                return res.render('guide_login');
            }
        })
    }        
}

exports.guide_login = (req, res)=>{
    const {username, password } = req.body;  
    //const hashedPassword = await hashit(password);
    db.query('SELECT * FROM guide WHERE username = ?',[username], async (error, results)=>{
        if(error){
            console.log(error);
        }

        if(results.length>0){
            bcrypt.compare(req.body.password,results[0].passwords,(error,results)=>{
                if(error){
                    console.log(error)
                }
                if(results){
                    req.session.userinfo = username
                    console.log(req.session.userinfo)
                    return res.redirect('/')
                }
                else{
                    return res.redirect('/guide_login')
                }
                
            })
        }else{
            return res.redirect('/guide_login')
    }
    })
}
            


