import jwt from 'jsonwebtoken';

// this mw will take the token & convert it into userId, 
// using i.e userId we can add, remove, get the data from the cart
const authMiddleware = async(req, res, next) => {
    const { token } = req.headers;
    if(!token){
        return res.json({success:false, message:"Not Authorized Login Again"});
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    }catch(err){
        console.log(err);
        res.json({success: false, message: 'Error'});
    }
}



export default authMiddleware;