const protect = require("../middlewares/authMiddleware");
const {accessChat}=require("../controllers/chatController");
const router=require("express").Router();

router.route("/").post(protect,accessChat);
// router.route("/").post(protect, fetchChat);
// router.route("/group").post(protect,createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/removeGroupMember").post(protect, removeGroupMember);
// router.route("/addGroupMember").post(protect, addGroupMember);


module.exports=router;