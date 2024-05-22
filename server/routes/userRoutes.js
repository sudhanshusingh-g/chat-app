const router=require("express").Router();
const {registerUser,authUser,allUsers}=require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

router.route("/").post(registerUser).get(protect,allUsers);
router.post("/login",authUser);

module.exports=router