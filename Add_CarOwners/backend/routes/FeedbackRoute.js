import express from "express";

import {
  addCommentcontroller,
  displayCommentcontroller,
  updateCommentcontroller,
  deleteCommentcontroller,
} from "../Controllers/FeedbackController.js";

import {
  rentcarController,
  carDetailscontroller,
  updaterentcar,
  deleterentcontroller,
} from "../Controllers/RentcarController.js";

import {
  AddcarOwner,
  getCarOwner,
  updateCarowner,
  deleteCarOwner,
  fetchCarOwner,
} from "../Controllers/CarOwnerController.js";

import { signup, signin } from "../Controllers/authController.js";

import {
  Addcars,
  getcars,
  updatecar,
  deletecar,
  fetchcar,
} from "../Controllers/AddcarController.js";

import { searchcarController } from "../Controllers/SearchCarController.js";

const router = express.Router();

// Feedback routes
router.post("/addfeedback", addCommentcontroller);
router.post("/displayfeedback", displayCommentcontroller);
router.put("/updatefeedback", updateCommentcontroller);
router.delete("/deletefeedback", deleteCommentcontroller);

// RentCar routes
router.post("/rentcar", rentcarController);
router.post("/displayrent", carDetailscontroller);
router.post("/updaterent", updaterentcar);
router.post("/deleterent", deleterentcontroller);

// Car owner routes
router.post("/addowner", AddcarOwner);
router.get("/getcar", getCarOwner);
router.put("/update/:id", updateCarowner);
router.delete("/delete/:id", deleteCarOwner);
router.get("/get/:id", fetchCarOwner);

// AddCustomer routes
router.post("/signup", signup);
router.post("/signin", signin);

// Car routes
router.post("/createcar", Addcars);
router.get("/getcars", getcars);
router.put("/updatecar/:id", updatecar);
router.delete("/deletecar/:id", deletecar);
router.get("/fetchcar/:id", fetchcar);

// Search route
router.post("/search", searchcarController);

export default router;
