
import userModel from "../models/userModel.js";
import { comparepassword, hashpassword } from "../helpers/authhelper.js";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import orderModel from '../models/orderModel.js'
 export const registerController= async(req,res)=>{

        try{
            const{name,email,password,phone,address,answer}=req.body
            if(!name){
                return res.send({message:"Name is Required"})
            }
    
            if(!email){
                return res.send({message:"Email is Required"})
            }
    
            if(!password){
                return res.send({message:"Password is Required"})
            }
    
            if(!phone){
                return res.send({message:"Phone is Required"})
            }
    
            if(!address){
                return res.send({message:"Address is Required"})
            }

            if(!answer){
                return res.send({message:"Answer is Required"})
            }
    
            //check user
            const existingUser=await userModel.findOne({email})
            //existing user
            if(existingUser){
                return res.status(200).send({
                    success:false,
                    message:'Already Register please Login',
                })
            }
    

            const hashedpassword=await hashpassword(password);
            //save
            const  user= await new userModel({
                name,
                email,
                password:hashedpassword,
                phone,
                address,
                answer
            }).save();
          
            res.status(200).send({
                success:true,
                message:"User Register Successfully",
                user,
            })

        }
    
    catch(error){
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        });
    }

};


//login||post

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }

        // Compare password
        const match = await comparepassword(password, user.password);

        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Invalid Password"
            });
        }

        // Generate Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "10d" });

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
}

//forgotpassword
export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "Answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashpassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  
  //test controller
  export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };

 //update profile
  export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashpassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

  //orders
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
          .find({})
          .populate("products", "-photo")
          .populate("buyer", "name")
          .sort({ createdAt: 'desc' }); 
        res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};





