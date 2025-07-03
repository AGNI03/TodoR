const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){ return res.status(400).json({error: "Please fill all the fields!"}); }
        if(username.length < 3){ return res.status(400).json({error: "Username must be at least 3 characters!"}); }
        if(password.length < 6){ return res.status(400).json({error: "Password must be at least 6 characters!"}); }
        if(!email.includes("@")){ return res.status(400).json({error: "Please enter a valid email!"}); }

        const userExist = await User.findOne({email});
        if(userExist){ return res.status(400).json({error: "User already exists"}); }
        else{
            const hashPass = await bcrypt.hash(password, 10);
            const newUser = new User({username, email, password: hashPass});
            await newUser.save();
            return res.status(200).json({success: "Registeration Successfull"});
        }
    }catch (error) {
        return res.status(400).json({error: "Internal Server Error!"});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){ return res.status(400).json({error: "Please fill all the fields!"}); }
        if(password.length < 6){ return res.status(400).json({error: "Password must be at least 6 characters!"}); }
        if(!email.includes("@")){ return res.status(400).json({error: "Please enter a valid email!"}); }
 
        const userExist = await User.findOne({email});
        if(userExist){
            bcrypt.compare(password, userExist.password, (err, data) => {
                if(data){
                    const token = jwt.sign({id: userExist._id, email: userExist.email}, process.env.JWT_SECRET, {expiresIn: "15d"});
                    res.cookie("Usertoken", token, {httpOnly: true, maxAge: 15*24*60*60*1000, secure: process.env.NODE_ENV=="production", sameSite: "None"});
                    return res.status(200).json({success: "Login Successfull"});
                }
                else{
                    return res.status(400).json({error: "Invalid credentials!"});
                }
            })
        }
        else{
            return res.status(400).json({error: "User not found!"});
        }
    }catch (error) {
        return res.status(400).json({error: "Internal Server Error!"});
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("Usertoken", {httpOnly: true});
        return res.status(200).json({message: "Logged out!"});
    } catch (error) {
        return res.status(404).json({error: "Internal Server Error!"});
    }
};

const userDetails = async (req, res) => {
    try {
        const {user} = req;
        const getDetails = await User.findById(user.id).populate("tasks").select("-password");
        if(getDetails){
            const allTasks = getDetails.tasks;
            let yetToStart = [];
            let inProgress = [];
            let completed = [];
            allTasks.map((task) => {
                if(task.status === "yetToStart") yetToStart.push(task);
                else if(task.status === "inProgress") inProgress.push(task);
                else completed.push(task);
            })
            return res.status(200).json({success:"success", tasks:[{yetToStart}, {inProgress}, {completed}]});
        }

    } catch (error) {
        return res.status(404).json({error: "Internal Server Error!"});
    }
}

module.exports = { register, login, logout, userDetails };  