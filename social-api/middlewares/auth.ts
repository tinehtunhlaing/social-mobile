import express from "express";
import jwt from "jsonwebtoken";

//decode
export async function auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    const authorization = req.headers?.authorization;
    const token = authorization?.split(" ")[1];

    if(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_TOKEN as string);
        if(user) {
            res.locals.user = user;//user.id
            return next();
        }

            return res.status(401).json({ msg: "invalid ttttt" });//if can't get user 
        } catch(e) {
            return res.status(401).json({ msg: "invalid token" });//if verify fail
        }
    }
    
    res.status(401).json({ msg: "token required" });
}