//----------- Import the packages from packages, use to make strong apis -------X
const bcrypt = require('bcryptjs'); //Convert password into hash
const jwt = require('jsonwebtoken')

//-------------- Model Specific Stuff
const {UserModel} = require('../models'); //User modal

exports.Register = async(req, res)=> { //Register the users

    try {
        //--------- Req.body content
        const { name, email, password, cpassword } = req.body;

        //Requring all the specific fields
        if (!name || !email || !password || !cpassword) { return res.status(404).json({ success: false, msg: "All fields are required" }) };

        if (password.length < 8 || cpassword.length < 8)
            return res.status(404).json({ success: false, msg: "Password & Confirm password must be 8 char long" })

        //check password and confirm password match
        if (password !== cpassword) { return res.status(404).json({ success: false, msg: "Password and ConfrimPassword did not match" }) };

        // Check the user is already register
        let user = await UserModel.findOne({ email })
        if (user) { return res.status(401).json({ success: false, msg: "this crenditentals's user is already exist" }) };

          //Converting the password into hash
        let hashPassword = await bcrypt.hash(password, 10);

        //Register the users
        user = await UserModel({
            name,
            email,
            password: hashPassword,
           
        })
        await user.save();

        return res.status(200).json({ success: true, msg: 'You are successfully register', user });

    } catch (error) { return res.status(500).json({ success: false, msg: error }); }
}
// Login the users, using POST '/api/user/login'
exports.Login = async (req, res) => {
    try {
        //--------- Req.body content
        const { email, password } = req.body;

        //Requring all the specific fields
        if (!email || !password) { return res.status(404).json({ success: false, msg: "All fields are required" }) };

        // Check the user is not already register
        let user = await UserModel.findOne({ email })
        if (!UserModel) { return res.status(401).json({ success: false, msg: "Your crenditentals is not correct" }) };

        //Comparing the password of register and login user
        let hashPassword = await bcrypt.compare(password, user.password)
        if (!hashPassword) { return res.status(404).json({ success: false, msg: "Your credentials not correct" }) }

        // Now create the token to authorizing the users
        const payloads = {
            user: { id: user._id }
        }
        const Secret_Key = process.env.JWT_SECRET_KEY;

        const token = await jwt.sign(payloads, Secret_Key, { expiresIn: '10d' })

        return res.status(200).json({ success: true, msg: 'You are successfully login', token });

    } catch (error) { return res.status(500).json({ success: false, msg: error }); }
}

