const express = require("express");
const { summaryController, paragraphController, chatbotController, scifiImageController } = require("../controllers/openaiController");
//router object
const router = express.Router();

//routes
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/scifi-img", scifiImageController);

module.exports = router;