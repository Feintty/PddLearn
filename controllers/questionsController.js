const fs = require("fs");

class questionsController {
  async getAllQuestions(req, res) {
    try {
      fs.readFile(`./data/questions.json`, "utf8", function (err, data) {
        res.send(data);
        res.end(data);
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getQuestionsBySet(req, res) {
    const { set } = req.params;
    try {
      fs.readFile(`./data/questions.json`, "utf8", function (err, data) {
        res.send(
          JSON.parse(data).filter(
            (question) => question.ticket_number === `Билет ${set}`
          )
        );
        res.end(data);
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getQuestionsByCategory(req, res) {
    const { category } = req.params;
    try {
      fs.readFile(`./data/questions.json`, "utf8", function (err, data) {
        res.send(
          JSON.parse(data).filter((question) => question.topic === category)
        );
        res.end(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAdditionalQuestions(req, res) {
    const { category } = req.params;
    const questionsData = req.body;
    try {
      fs.readFile(`./data/questions.json`, "utf8", function (err, data) {
        const randomizedQuestionsByCategory = JSON.parse(data)
          .filter((question) => question.topic === category)
          .sort(() => Math.random() - 0.5);
        res.send(
          randomizedQuestionsByCategory
            .filter(
              (question) =>
                !JSON.stringify(questionsData).includes(
                  JSON.stringify(question)
                )
            )
            .splice(0, 5)
        );
        res.end(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getQuestionsByNumber(req, res) {
    const { number } = req.params;
    try {
      fs.readFile(`./data/questions.json`, "utf8", function (err, data) {
        res.send(JSON.parse(data)[Number.parseInt(number) - 1]);
        res.end(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getHardestQuestions(req, res) {
    try {
      fs.readFile(`./data/questions.json`, "utf8", function (err, data) {
        res.send(data);
        res.end(data);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new questionsController();
