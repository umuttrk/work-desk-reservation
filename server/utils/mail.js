const nodemailer = require('nodemailer');
require('dotenv').config();



exports.sendMail = (email,start_date,end_date,desk_id) => {

    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASS
        }
    });
    
    let sender = "cyclone";

    var mailOptions = {
        from: sender,
        to: email,
        subject: "A new reservation",
        html: `<div><h1>New reservation for desk${desk_id} </h1> <br/> <h2>start date: ${start_date}</h2><br/><h2>end date: ${end_date}</h2></div>`
    };
    Transport.sendMail(mailOptions,function(err,res){
        if (err) {
            console.log(err);
            console.log("Mail couldn't send cause error");
            
        }else{
            console.log(res)
            console.log("verification mail sent.");
        }
    })
}