const Router = require("express");
const router = new Router();
const controller = require("../controllers/dataController");

router.get("/getdata/:token", controller.getData);
router.get("/getincorrect/:token", controller.getIncorrect);
router.post("/postData/:token", controller.postData);

module.exports = router;
