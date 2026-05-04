import express from "express"
import {verify_token} from "../middle_ware/middle_ware.js";
import { get_expense,delete_expense,update_expense,add_expense } from "../usercontroller/usercontroller.js";
import {login,register} from "../usercontroller/auth_controller.js";

const router = express.Router();
router.post("/register",register)
router.post("/login",login);
router.get("/get_expense",verify_token,get_expense);
router.post("/add_expense",verify_token,add_expense);
router.put("/update_expense:id",verify_token,update_expense);
router.delete("/delete_expense/:id",verify_token,delete_expense);


export default router;










