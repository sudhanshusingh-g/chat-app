const protect = require("../middlewares/authMiddleware");
const {sendMessage,allMessages}=require("../middlewares/messageController")

const router= require("express").Router();

router.route("/").post(protect,sendMessage)
router.route("/:chatId").get(protect,allMessages);

module.exports=router
