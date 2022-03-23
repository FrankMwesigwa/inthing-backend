import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/customerModel";

const router = express.Router();
const key = "SEDRTGYH1234";

const credentials = {
  apiKey: "289de7f70ef417944098c4f80a96b3d24e5c1696b5a3c829411eb23da0deaa4d",
  username: "inthing",
};

const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

router.post("/sendOTP", (req, res) => {
  console.log("Entered Number ====>", req);

  const phonenumber = req.body.phonenumber;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const ttl = 24 * 60 * 60 * 1000; // 24 hours in millseconds
  const expires = Date.now() + ttl;
  const data = `${phonenumber}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
  const fullhash = `${hash}.${expires}`;

  const options = {
    to: phonenumber,
    message: `Your OTP Code For inthing is ${otp}`,
  };

  sms
    .send(options)
    .then((info) => {
      console.log("Response ====>", info);
      res.json({ info, phonenumber, hash: fullhash, otp });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/verifyOTP", async (req, res) => {
  const { phonenumber, otp, hash } = req.body;

  let [hashvalue, expires] = hash.split(".");
  let now = Date.now();

  if (now > parseInt(expires)) {
    return res.status(504).json({ message: "TimeOut Please Try Again" });
  }

  const data = `${phonenumber}.${otp}.${expires}`;
  const newhash = crypto.createHmac("sha256", key).update(data).digest("hex");

  const customer = await User.findOne({ phonenumber });

  if (newhash === hashvalue) {
    if (customer) {
      const profile = await User.findOneAndUpdate(
        { phonenumber },
        { new: true }
      );
      const accessToken = jwt.sign({ profile }, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });
      res
        .status(200)
        .send({
          message: "OTP Verified Successfully!",
          token: accessToken,
          profile,
        });
      console.log("updated User ----", profile);
    } else {
      // const profile = await new User({ phonenumber }).save();
      // const accessToken = jwt.sign({ profile }, process.env.JWT_SECRET, {
      //   expiresIn: "30d",
      // });
      res
        .status(400)
        .send({
          message: "No User Found with this Phone Number",
        });
      console.log("No User Found ----", profile);
    }
  } else {
    return res
      .status(400)
      .send({ verification: false, message: "Incorrect OTP Entered!" });
  }
});

router.get("/customer", async (req, res) => {
  try {
    let customers = await User.find();
    if (!customers) {
      res.json({
        message: "There are no customers in the database at this time",
      });
    }
    res.status(200).json(customers);
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
