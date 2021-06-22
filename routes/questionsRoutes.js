const Router = require("express");
const router = new Router();
const controller = require("../controllers/questionsController")

router.get("/allQuestions",controller.getAllQuestions);
router.get("/questionsBySet/:set",controller.getQuestionsBySet);
router.get("/questionsByCategory/:category",controller.getQuestionsByCategory);
router.get("/questionsByNumber/:number",controller.getQuestionsByNumber);
router.post("/questionsAdditional/:category",controller.getAdditionalQuestions);
router.get("/questionsHard",controller.getHardestQuestions);

module.exports = router;