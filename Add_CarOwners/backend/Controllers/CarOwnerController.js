import Carowner from '../models/Carowner.js';
import { errorHandler } from '../utills/error.js';
import bcryptjs from "bcryptjs";

// Add car owner
export async function AddcarOwner(req, res, next) {
    const { name, nic, age, gender, address,email } = req.body;

    
    const hashedpassword=bcryptjs.hashSync(nic,10)


    const newCarowner = new Carowner({
        name,
        nic,
        age: Number(age),
        gender,
        address,
        email,
        password:hashedpassword,
        role:"CarOwner"
    });

    try {
        await newCarowner.save();
        res.json({
            message:"Car Owner Added",
            data:newCarowner
        });
    } catch (err) {
        next(errorHandler(500, err.message));
    }
}

// Get all car owners
export async function getCarOwner(req, res, next) {
    try {
        const carowners = await Carowner.find();
        const totalowners = await Carowner.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        const lastMonthowners = await Carowner.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });
        res.json({
            carowners,
            totalowners,
            lastMonthowners
        });
    } catch (err) {
        next(errorHandler(500, err.message));
    }
}

// Update car owner
export async function updateCarowner(req, res, next) {
    const userId = req.params.id;
    const {profilepicture, name, nic, age, gender, address,email,password } = req.body;

    const updateCarowner = {profilepicture, name, nic, age: Number(age), gender, address,email,password };

    try {
        await Carowner.findByIdAndUpdate(userId, updateCarowner);
        res.status(200).send({ status: "Owner profile updated successfully" });
    } catch (err) {
        next(errorHandler(500, err.message));
    }


}

// Delete car owner
export async function deleteCarOwner(req, res, next) {
    const userId = req.params.id;

    try {
        await Carowner.findByIdAndDelete(userId);
        res.status(200).send({ status: "Profile deleted successfully" });
    } catch (err) {
        next(errorHandler(500, err.message));
    }
}

// Fetch single car owner
export async function fetchCarOwner(req, res, next) {
    const userId = req.params.id;

    try {
        const carowner = await Carowner.findById(userId);
        res.status(200).send({ status: "user fetched", carowner });
    } catch (err) {
        next(errorHandler(500, err.message));
    }
}









