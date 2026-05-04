import jwt from "jsonwebtoken";

export const verify_token =  (req,res,next)=>{

    const header = req.headers.authorization;

    if(!header) return res.status(401).json("no authorization");

    const token = header.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json("Invalid token");

        req.userid = user.id;
        next();
    });
};