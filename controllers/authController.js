const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {secret} = require("../config");
const fs = require("fs");
const template = require("../data/userTemplate.json");

const saltRounds = 6;

const generateJWT = (id) =>{
const payload = {id};
return jwt.sign(payload,secret,{expiresIn:"1y"});
}

const createJSONById = (id) => {
  fs.writeFile(`./usersData/${id}.json`, JSON.stringify(template), (error) => {
    console.log(error);
  });
};

class authController {
  async registration(req, res) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка регистрации", validationErrors });
      }
      const { username, password } = req.body;
      const isUserHas = await User.findOne({ username });
      if (isUserHas) {
        return res.status(400).json({ message: "Пользователь уже существует!" });
      } else {
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const user = new User({ username, password: hashedPassword });
        await user.save(() => createJSONById(user._id));
        // .then();
        return res.json({ message: "Успешная регистрация" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Ошибка регистрации" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        res.status(400).json({ message: "Пользователь не найден" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        res.status(400).json({ message: "Неверный пароль" });
      }
      const token = generateJWT(user._id);
      return res.json({token});
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Ошибка авторизации" });
    }
  }
}

module.exports = new authController();
