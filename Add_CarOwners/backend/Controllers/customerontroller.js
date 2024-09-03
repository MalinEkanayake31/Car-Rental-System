import User from '../models/UserModel.js';
import { errorHandler } from '../utills/error.js';
//import bcryptjs from 'bcryptjs'

export const viewProfile = async (req, res, next) => {
    const id = req.params.id;

    try{
        const customer = await User.findById(id);
        if(!customer){
            return next(errorHandler(404,'Customer not found'));
        }

        res.status(200).json(customer);
    } catch(error) {
        next(error);
    }
};

export const updateCustomerProfile = async (req, res, next) => {
    const id = req.params.id;
    const { profilepicture, username, email, mobile, nic} = req.body;
    
    try {
        const updatedCustomer = await User.findByIdAndUpdate(
            id,
            {profilepicture, username,email, mobile, nic},
        );

        if(!updatedCustomer){
            return next(errorHandler(404,'Customer not found'));
        }

        res.status(200).json({ message: 'Customer profile updated successfully', data: updatedCustomer });
    } catch(error){
        next(error);
    }
};

export const deleteCustomer = async (req, res, next) => {
    const id = req.params.id;
    
    try{
        const deletedCustomer = await User.findByIdAndDelete(id);
        if(!deletedCustomer){
            return next(errorHandler(404, 'Customer not found'));
        }

        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        next(error);
    }
};
