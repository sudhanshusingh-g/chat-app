const protect = require("../middlewares/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addGroupMember,
  removeGroupMember,
} = require("../controllers/chatController");
const router=require("express").Router();

router.route("/").post(protect,accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/removeGroupMember").put(protect, removeGroupMember);
router.route("/addGroupMember").put(protect, addGroupMember);


module.exports=router;