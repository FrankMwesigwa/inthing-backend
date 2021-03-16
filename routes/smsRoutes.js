import express, { raw } from 'express'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
// import SendSMS from '../config/sendSMS'
import User from '../models/userModel'

const router = express.Router()
const key = 'SEDRTGYH1234'

const credentials = {
    apiKey: '8bc7067b2fab37b17717b2a4dd6e27e805159cc3b0ecfdd6cdc4c727c5ec4fca', 
    username: 'mobileshopug'
};

const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

router.post("/sendOTP", (req, res) => {

    // try {
    //     const phonenumber = req.body.phonenumber
    //     const otp = Math.floor(100000 + Math.random()*900000)
    //     const ttl = 24*60*60*1000 // 24 hours in millseconds
    //     const expires = Date.now() + ttl
    //     const data = `${phonenumber}.${otp}.${expires}`
    //     const hash = crypto.createHmac('sha256', key).update(data).digest('hex')
    //     const fullhash = `${hash}.${expires}`

    //     SendSMS(phonenumber, `Your OTP Code For MobileShopUg is ${otp}`).then(())
    //         res.status(200).send({phonenumber, hash: fullhash, otp})
        
    // } catch(error) {
    //     console.log(error);
    //     res.json(error.toString());
    // }

    const phonenumber = req.body.phonenumber
    const otp = Math.floor(100000 + Math.random()*900000)
    const ttl = 24*60*60*1000 // 24 hours in millseconds
    const expires = Date.now() + ttl
    const data = `${phonenumber}.${otp}.${expires}`
    const hash = crypto.createHmac('sha256', key).update(data).digest('hex')
    const fullhash = `${hash}.${expires}`

    const options = {
        to: phonenumber,
        message: `Your OTP Code For MobileShopUg is ${otp}`,
        statusCallback: 'https://mobileshop.ug/api/otp/delivery-reports',
      }

    sms.send(options).then(info => {
        // return information from Africa's Talking
        console.log("Response ====>", info)
        res.json({info, phonenumber, hash: fullhash, otp});
      }).catch(err => {
        console.log(err);
      });
})

router.post('/delivery-reports', (req, res) => {
    const data = req.body;
    console.log(`Received report: \n ${data}`);
    res.sendStatus(200);
  });

router.post("/verifyOTP", async (req, res) => {

    const { phonenumber, otp, hash } = req.body

    let[hashvalue, expires] = hash.split('.')
    let now = Date.now()

    if(now > parseInt(expires)){
        return res.status(504).json({"message": 'TimeOut Please Try Again'})
    }

    const data = `${phonenumber}.${otp}.${expires}`
    const newhash = crypto.createHmac('sha256', key).update(data).digest('hex')

    const user = await User.findOne({ phonenumber });

    if(newhash === hashvalue){
        if (user) {
            const profile = await User.findOneAndUpdate({phonenumber},{ new: true });
            const accessToken = jwt.sign({profile} , process.env.JWT_SECRET, {expiresIn: '30d'})
        res.status(200).send({message: "OTP Verified Successfully!", token: accessToken, profile})
            console.log("updated User ----", profile)
          } else {
             const profile = await new User({phonenumber}).save();
             const accessToken = jwt.sign({profile} , process.env.JWT_SECRET, {expiresIn: '30d'})
        res.status(200).send({message: "OTP Verified Successfully!", token: accessToken, profile})
            console.log("New User ----", profile)
          }
        
    }else {
        return res.status(400).send({verification: false, message: 'Incorrect OTP Entered!'})
    }

})

export default router;