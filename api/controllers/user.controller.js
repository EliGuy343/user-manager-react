import User from "../models/User.js";

export const addUser = async (req, res) => {

    if(!req.body.fullName)
        return res.status(400).send("full name is missing/invalid");
    if(!req.body.phoneNumber) 
        return res.status(400).send("phoneNumber is missing/invalid");
    if(!req.body.ip)
        return res.status(400).send("ip is missing/invalid");
    if(!req.body.id || req.body.id?.length < 9)
        return res.status(400).send("id is missing/invalid");
    
    try {
        const oldUser = await User.findOne({id:req.body.id});

        if(oldUser)
            return res.status(400).send("user with this id already exists");

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({id:id});

        if(!user)
            return res.status(400).send("user with this id was not found");
        
        return res.status(200).json(user);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('internal server error'); 
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const nameSearch = req.query.name;
        const users = await User.find(
            {"fullName":{$regex: nameSearch || '.', $options:'i'}});
        res.status(200).json(users);
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
}

export const deleteUser = async (req, res) => {
    try {
        await  User.findOneAndDelete({id:req.params.id});
        res.status(200).send("user sucessfully deleted");
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
}