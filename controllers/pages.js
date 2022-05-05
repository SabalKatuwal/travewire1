const express = require('express');
const mysql = require('mysql');
const {check, validationResult} = require('express-validator');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE,
    database: 'Travewire'
});

exports.place_upload = (req,res)=> {
    console.log(req.body);
    var message = []
    const {site_name, description, picture } = req.body;
    //const errors = validationResult(req)
    db.query('SELECT name FROM site WHERE name = ?',[site_name], async (error, results)=>{
        if(error){
            console.log(error);
        }

        if (results.length > 0 ){
            message.push('The site is already registered')
            return res.render('place_upload',{message});
        }
        else{
            db.query('INSERT INTO site SET ?',{name: site_name,description: description, picture: picture}, (error, results)=>{
                if(error){
                    console.log(error);
                }
                else{
                    console.log('registered travel site')
                    return res.redirect('/');
                }
            })
        }          
    })
};


exports.index = (req,res)=> {

    db.query('SELECT * FROM site', (error, siteinfo)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(req.session.username);
            res.render('index', {siteinfo})
        }
                 
    })
};


exports.detail_view = (req,res)=> {
    const id = req.params.id
    db.query("select * from site where site_id = ?", [id],(error, site)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('site_detail.ejs', {site})
        }
    })
};