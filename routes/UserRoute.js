const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../model/UserModel');

// Get single user via email
const getUser = async (req, res) => {
    try {
        const email = req.body.email;
        const response = await User.find({ email: email });

        if (!response)
            res.json({ status: false, msg: "No user found..." });
        res.json({ status: true, data: response.data });
    } catch (err) {
        throw err;
    }
}

// Create User
const createUser = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const response = await User.findOne({ email });

        if (response) 
            res.json({ status: false, msg: "User with this email already exist" })
        else {
            const saltRounds = 16;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User({ name, email, password: hash });
            const st = await newUser.save();

            if (!st)
                res.json({ status: false, msg: "Error in creating user. Please try again." });
            res.json({ status: true, data: st.data, msg: "User created successfully. Please sign in to proceed." });
        }

    } catch (err) {
        console.error(err);
        res.json({
            status: false,
            msg: "Server error"
        })
    }
}

// Update User Info
const updateUser = async (req, res) => {
    try {
        const id = req.body.id;
        const response = await User.find({ _id: id });

        if (!response)
            res.json({ status: false, msg: "No user found..." });

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const saltRounds = 16;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const update = await ProjectModel.updateOne({ _id: id }, { $set: { name, email, password: hash } })

        if (!update)
            res.json({ status: false, msg: "Error in updating user..." });
        res.json({ status: true, data: st.data, msg: "User updated successfully..." });
    } catch (err) {
        throw err
    }
}
// Delete A User
// router.post('/delete', async (req, res) => {
//     try {
//         const id = req.body.id;
//         const response = await User.find({ _id: id });
//         if (!response) res.json({ status: false, msg: "User Not Found..." });

//         const st = await User.findByIdAndDelete({ _id: id });
//         if (!st)
//             res.json({ status: false, msg: "Error in deleting user..." });
//         res.json({ status: true, msg: "User Deleted Successfully..." });
//     } catch (err) {
//         throw err;
//     }
// })

// Handle Login
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.json({ status: false, user: {}, msg: info.msg })
        else {
            req.login(user, (err) => {
                if (err) return next(err)
            })
            const sendUser = {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                date: req.user.date
            }
            res.json({status: true, user: sendUser, msg: "Login successful"})
        }
    })(req, res, next)
}

// Handle Log Out
const logout = (req, res) => {
    req.logout(req.user, err => {
        if (err) {
            res.json({ status: false })
        }
        res.json({ status: true })
    });
}

module.exports = {getUser, createUser, updateUser, login, logout};