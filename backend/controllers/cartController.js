import userModel from "../models/userModel.js";


// Add items to User Cart
const addToCart = async(req, res) => {
    try{ 
        // provided condition userid should same as req.body.userid that will be get using the middleware
        // let userData = await userModel.findOne({_id : req.body.userId});
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Added to Cart", cartData});
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}


// Remove items from User Cart
const removerFromCart = async(req, res) => {
    try{           
    // will get this userId by the middleware fun
        let {userId, itemId} = req.body;
        
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if(cartData[itemId] > 0){
            cartData[itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message: "Removed From Cart"});
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}


// fetch User Cart data
const getCart = async(req, res) => {
    try{
        let { userId } = req.body;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({success: true, cartData})

    }
    catch(error){
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

export { addToCart, removerFromCart, getCart }