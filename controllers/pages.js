const express = require('express');
const mysql = require('mysql');
const {check, validationResult} = require('express-validator');
const e = require('express');


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
            if(req.session.userinfo.isguide){
                return res.render('place_upload',{message});
            }
        }
        else{
            db.query('INSERT INTO site SET ?',{name: site_name,description: description, picture: picture}, (error, results)=>{
                if(error){
                    console.log(error);
                }
                else{
                    console.log('registered travel site')
                    return res.json({success : 1});
                    // return res.redirect('/');
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

            console.log(req.session.userinfo);
            return res.render('index', {siteinfo, user:req.session.userinfo})
        }
                 
    })
};


exports.detail_view = (req,res)=> {
    const id = req.params.site_id
    console.log(req.params)
    db.query("select * from site where site_id = ?", [id],(error, site)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(site)
            return res.render('site_detail', {site:site[0]})
        }
    })
};


exports.return_places = (req,res)=> {
    db.query("select name from site",(error, results)=>{
        if(error){
            console.log(error)
        }
        else{
            
            return res.json(results)
            

        }
    })
};


exports.contact_us = (req,res)=> {
    const {name, email, message} = req.body
    db.query('INSERT INTO contact_us SET ?',{name: name, email:email, message:message}, (error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log('your response is registered')
            return res.redirect('/');
        }
    })
};