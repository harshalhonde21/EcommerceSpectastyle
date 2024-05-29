import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const getMyUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch {
    return res.status(404).json({ message: "User not found add user" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashPassword });
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.status(201).json({ token, user });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ message: "Email already exists." });
    }
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exists",
      });
    }

    const checkMatchPass = await bcrypt.compare(password, user.password);

    if (!checkMatchPass) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//making a method for sending the OTP to the email address
export const sendOpt = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exists",
      });
    }

    //sending the opt to the email
    const number = Math.floor(Math.random() * 900000) + 100000;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.mail_id,
        pass: process.env.pass_id,
      },
    });
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "SPECTASTYLE",
        link: "https://mailgen.js",
      },
    });
    let response = {
      body: {
        name: "",
        intro:
          "Welcome to SPECTASTYLE! We're very excited to have you on board.",
        action: {
          instructions: "Your OTP for SPECTASTYLE is",
          button: {
            color: "#22BC66",
            text: number,
            link: "",
          },
        },
        outro: "Thankyou for a part of SPECTASTYLE",
      },
    };
    let mail = MailGenerator.generate(response);
    let message = {
      to: email,
      subject: "SpectaStyle Support team",
      html: mail,
    };
    transporter
      .sendMail(message)
      .then(() => {
        res.status(200).json({ otp: number });
      })
      .catch((error) => {
        console.log("Email is not send", error);
        res.status(500).json({ message: "Email is not send" });
        console.log("email is send successfully");
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

//updating the user PASSWORD
export const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findByIdAndUpdate(existingUser._id, {
      password: hashPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.status(201).json({ token, user });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
