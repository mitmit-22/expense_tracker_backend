import db from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt, { compareSync } from "bcrypt";


export const register = (req,res)=>{

    const {email,password} = req.body;

    const hash = bcrypt.hashSync(password,10);

    const sql = "insert into users (email,password) values (?,?)";

    db.query(sql,[email,hash],(err)=>{
        if(err) return res.status(500).json(err); 

        return res.status(201).json("registered succesfully")
    });


}

export const login = (req,res) =>{
    const{email,password} = req.body;

    const sql = "select * from users where email = ?";

    db.query(sql,[email],(err,data)=>{

        if (err) return res.status(500).json(err);

        if(data.length === 0) return res.status(404).json("user not found");

        const ismatch = bcrypt.compareSync(password, data[0].password);

        if(!ismatch) return res.status(401).json("wrong credentials");


        const token = jwt.sign(
        {id:data[0].id},
         process.env.JWT_SECRET
        );

        res.json({token});

    });
};
