import jwt from "jsonwebtoken";
const SECRET = "@rushendra17";
export default verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    try{
        const decoded = jwt.verify(token,SECRET);
        req.user = decoded;
    next();
    }
    catch(e){
        console.log(e);
        res.status(403).send("Invalid token");
    }
}