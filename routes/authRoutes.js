const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController")
const {check} = require("express-validator");

router.post("/registration",[
    check("username","Имя пользователя не может быть пустым").notEmpty(),
    check("username","Имя пользователя должно содержать от 4 до 20 символов").isLength({min:4,max:20}),
    check("password","Имя пользователя не может быть пустым").notEmpty(),
    check("password","Пароль должен содержать от 4 до 20 символов").isLength({min:4,max:20})
],controller.registration);
router.post("/login",controller.login);

module.exports = router;