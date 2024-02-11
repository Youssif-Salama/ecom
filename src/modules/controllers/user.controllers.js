import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { AppError, catchASyncError } from "../../utils/error.handler.js";
import { userModel } from "../models/user.model.js";
import { sendMail } from "../../services/nodemailer/nodemailer.js";
import { successConfirmation } from "../../services/nodemailer/email.template.js";
env.config();


/*
what u need in signup process 
if(user already exist) error("user already exist")
else
1- hashing password 
2-create user  document 
3-send him email to confirm
*/

export const signup = catchASyncError(async (req, res) => {
    const { password, email } = req.body;

    const checkIfUserExist = await userModel.findOne({ email });
    if (checkIfUserExist) throw new AppError("user already exist", 400);

    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT)
    const result = await userModel.create({ ...req.body, password: hashedPassword });
    if (!result) throw new AppError("failed to signup", 400);
    sendMail(email)
    res.json(201, { message: "signed up successfully, check your mail" })
})

/*
    1-check if user exist if yes continue if no error
    2- if yes make token
*/
export const login = catchASyncError(async (req, res) => {
    const { email, phone } = req.body;
    const result = await userModel.findOne({ $or: [{ email }, { phone }] })
    if (!result) throw new AppError("user not exist ,please login", 400)
    const { email: userEmail, phone: phoneNum, _id, fullName, role } = result;
    const userToken = jwt.sign({ userEmail, phoneNum, _id, fullName, role }, process.env.TOKEN_KEY, { expiresIn: "2hr" });
    res.json(200, { message: "success", token: userToken });
})

export const getDocumentData = catchASyncError(async (req, res) => {
    const { _id } = req.decodedToken;
    const result = await userModel.findById(_id);
    if (!result) throw new AppError("cannot find user ", 400);
    res.json(200, { message: "success", result })
})

export const updateDocumentData = catchASyncError(async (req, res) => {
    const { email, phone, firstName, lastName, DateOB, role, skills, address } = req.body;

    const { _id } = req.decodedToken;
    const existingUser = await userModel.findOne({ $or: [{ email }, { phone }], _id: { $ne: _id } });
    if (existingUser) throw new AppError("Email or phone number is already in use by another user", 400);

    const result = await userModel.findByIdAndUpdate(_id, { address, skills, email, phone, firstName, lastName, DateOB, role }, { new: true })
    if (!result) throw new AppError("failed to update user");

    if (email) {
        result.confirmed = false;
        await result.save();
        sendMail(email)
    }

    res.json(200, { message: "success", result })
})

export const deleteDocumentData = catchASyncError(async (req, res) => {
    const { _id } = req.decodedToken;
    const result = await userModel.deleteOne({ _id });
    if (!result) throw new AppError("failed to delete your account", 400);
    res.json(200, { message: success });
})

// -----------------after email confirmation send--------------
export const verifyAccount = catchASyncError(async (req, res) => {
    const { emailToken } = req.params;
    jwt.verify(emailToken, process.env.EMAIL_TOKEN_KEY, async (error, decodedToken) => {
        if (error) throw new AppError("invalid token", 498);
        const { email } = decodedToken;
        const result = await userModel.findOneAndUpdate({ email }, { confirmed: true })
        if (!result) throw new AppError("failed to confirm your account", 400);
        res.status(200).send(successConfirmation)
    })
})