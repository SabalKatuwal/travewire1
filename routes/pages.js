const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pages'); 


router.get('/', pageController.index//(req, res)=>{
    //console.log(req.session.username);
    //res.render('index');
//}
);

router.get('/place_upload', (req, res)=>{
    res.render('place_upload');
});



router.post('/place_upload',pageController.place_upload) 

 





// router.get('/guide_registration/:id',(req, res)=>{
//     res.render('guide_registration', {output:req.params.id}) //now make guide_registration.ejs and output has the recent id entered in form
// });



module.exports = router;