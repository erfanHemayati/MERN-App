//Authorization
import jwt from 'jsonwebtoken';
export const verifyToken = async (req, res, next) => { //next will allow the process continues to the next function. where would be a function in controllers
    try {
        let userId;
        let token = req.header("Authorization")

        if (Object.hasOwn(req.params, 'id')) { //getting the User Id
            userId = req.params.id
        }
        else if (Object.hasOwn(req.body, 'userId')) {
            userId = req.body.userId
        }
        //403: The server understands the request but the reuqest is not authorized for lack of the proper securyt tokens
        //token doesn't exists at all:
        if (!token) { res.status(403).json({ message: "Not Authorized. Access Denied" }) }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7); 
        }

        const payload = jwt.verify(token, process.env.JWT_secret_key); //decoding the payload 

        //verifying the user crediantals  
        if (payload.id !== userId) { res.status(401).json({ message: "Not Authenticated. Access Denied" }); }
        else {
           //setting the payload 
            req.user = payload;
            next();
        }
    }
    catch (error) { res.status(500).json({ error: error.message }) }
} 