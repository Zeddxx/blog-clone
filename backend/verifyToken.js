const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    console.log("received token", token);
    if(!token){
        console.log("token not found");
        return res.status(401).json("You are not authorized!")
    }
    jwt.verify(token, process.env.SECRET, async (err, data) => {
        if(err){
            console.error('token verification error:', err);
            return res.status(403).json("Token is not valid!")
        }
        req.userId = data._id
        console.log("Token verified, user ID:", data._id);
        next();
    })
}

module.exports = verifyToken