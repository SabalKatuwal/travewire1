const express = require('express');
const mysql = require('mysql2/promise');

const {check, validationResult} = require('express-validator');
const e = require('express');
let db;
async function connectMysql(){
    try{
       db = await mysql.createConnection({
           host: 'localhost',
           user: 'root',
           password: process.env.DATABASE,
           database: 'Travewire'
       });
       console.log('connected')
    }catch(err){
        console.log(err);
    }
}

connectMysql()

exports.place_upload = (req,res)=> {
    console.log(req.files,req.body);
    var message = []
    const {site_name, description, picture, district } = req.body;
    //const errors = validationResult(req)
    
    
    // db.query('INSERT INTO site SET ?',{name: site_name,description: description, district:district}, (error, results)=>{
    //     console.log(results)
    //     if(error){
    //         console.log(error);
    //     }
    //     else
    //     {

    //         db.query("select * from site where site_id = ?", [results.insertId],(error, site)=>{
    //             req.files.forEach(file=>{
    //                 db.query('INSERT INTO site_images SET ?',{siteID:site[0].site_id, path:file.path}, (error, results)=>{
    //                     if(error){
    //                         console.log(error);
    //                     }
    //                     else{
    //                         console.log('image stavbesdd')
    //                         // return res.redirect('/');
    //                     }
    //                 })
    //             })
    //             console.log('registered travel site')
    //             return res.json({success : 1});
    //             // return res.redirect('/')
    //         })

            
    //     }
    
    // })
                  
};

exports.index = (req,res)=> {
    (
        async function(){
            try{
                const [rows, fields] = await db.execute('SELECT * FROM site');
                // console.log('rows = ',rows)
                const data = [];
                rows.forEach(site => {
                    (
                        async function(){
                            let siteData = {};
                            siteData.site = site;
                            const [rows, fields] = await db.execute('SELECT * FROM site_images where siteID = ?',[site.site_id]);
                            const images = rows;
                            console.log('images = ',images)
                            console.log('setting images')
                            siteData.images = images;
                            data.push(siteData);
                            console.log('data = ',data)
                            return res.render('index',{data:data, user:req.session.userinfo})  
                        }
                        )()
                })
            }catch(err){
                console.log('error',err)
            }
        }
    )()

};


exports.detail_view = (req,res)=> {
    const id = req.params.site_id
    console.log(req.params)
    db.query("select * from site where site_id = ?", [id],(error, site)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log('site',site)
            // db.query('select * from accomodations where district = ?',[site.district],(err,accomodations) => {
            //     console.log(accomodations);
            // })
            console.log(site)
            // return res.render('site_detail', {site:site[0]})
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