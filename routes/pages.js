const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/login', (req, res)=>{
    res.render('login.ejs');
});

router.get('/guide_register', (req, res)=>{
    res.render('guide_register.ejs');
});

router.get('/tourist_register', (req, res)=>{
    res.render('tourist_register');
});
 




// router.get('/guide_registration/:id',(req, res)=>{
//     res.render('guide_registration', {output:req.params.id}) //now make guide_registration.ejs and output has the recent id entered in form
// });



module.exports = router;