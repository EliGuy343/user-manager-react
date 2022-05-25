import User from "../models/User.js";

export const addUser = async (req, res) => {
    const {fullName, id, phoneNumber, ip} = req.body;

    if(!fullName && !id && !phoneNumber && !ip ) 
        return res.status(400).send("all fields are required");

    try {
        const oldUser = await User.findOne({id:id});

        if(oldUser)
            return res.status(400).send("user with this id already exists");

        const newUser = new User({
            fullName:fullName,
            id:id,
            phoneNumber:phoneNumber,
            ip:ip
        });
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
        console.log(req.query);
        const nameSearch = req.query.name;
        const users = await User.find(
            {"fullName":{$regex: nameSearch || "."}});
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