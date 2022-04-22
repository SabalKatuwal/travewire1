const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    console.log(req.session.username);
    res.render('index');
});


 





// router.get('/guide_registration/:id',(req, res)=>{
//     res.render('guide_registration', {output:req.params.id}) //now make guide_registration.ejs and output has the recent id entered in form
// });



module.exports = router;