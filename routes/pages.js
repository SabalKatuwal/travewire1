const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

router.get('/', (req, res)=>{
    console.log(req.session.username);
    res.render('index');
});


// to be removed by me
router.get('/place_upload', (req, res)=>{
    console.log(req.session.username);
    res.render('place_upload');
});

router.get('/site_detail', (req, res)=>{
    console.log(req.session.username);
    res.render('site_detail');
});

router.get('/contact', (req, res)=>{
    console.log(req.session.username);
    res.render('contact');
});

router.get('/about', (req, res)=>{
    console.log(req.session.username);
    res.render('about');
});

router.get('/search', (req, res)=>{
    console.log(req.session.username);
    res.render('search_result');
});

router.get('/profile', (req, res)=>{
    console.log(req.session.username);
    res.render('user_profile');
});

router.get('/login', (req, res)=>{
    console.log(req.session.username);
    res.render('login');
});

router.get('/search', (req, res)=>{
    const { term } = req.query;
    
});


 





// router.get('/guide_registration/:id',(req, res)=>{
//     res.render('guide_registration', {output:req.params.id}) //now make guide_registration.ejs and output has the recent id entered in form
// });



module.exports = router;