const fs = require("fs");
const jwt = require("jsonwebtoken");
const {secret} = require("../config");
const dataMain =  require("../data/questions.json");

const getIncorrect = (userData)=>{
  userData = JSON.parse(userData)
 const returnData = [];
 userData.tickets.forEach(element => {
    returnData.push(...element.incorrect)
 });
  return returnData.map(element=>dataMain.find(dataElement=>dataElement.id===element));
}

const updateData = (ticketData,oldData)=>{
  ticketData.forEach(ticketElement=>{
    const dataElement = dataMain.find(dataMainElement=>dataMainElement.id===ticketElement.id)
    const ticketNumber = Number(dataElement.ticket_number.replace(/\D+/g,""));
    let arrCorrect = oldData.tickets.find(oldElement=>oldElement.ticket_number===ticketNumber).correct;
    let arrIncorrect = oldData.tickets.find(oldElement=>oldElement.ticket_number===ticketNumber).incorrect;
    if(ticketElement.isCorrect==='true'){
      if(arrIncorrect.includes(ticketElement.id)){
      arrIncorrect = arrIncorrect.filter(el=>el!==ticketElement.id);
      arrCorrect.push(ticketElement.id)
      }else{
        arrCorrect.push(ticketElement.id)
      }
    }
    else{
      if(arrCorrect.includes(ticketElement.id)){
        arrCorrect = arrCorrect.filter(el=>el!==ticketElement.id);
        arrIncorrect.push(ticketElement.id)
        }else{
          arrIncorrect.push(ticketElement.id)
        }
    }
    oldData.tickets.find(oldElement=>oldElement.ticket_number===ticketNumber).correct = Array.from(new Set(arrCorrect));
    oldData.tickets.find(oldElement=>oldElement.ticket_number===ticketNumber).incorrect = Array.from(new Set(arrIncorrect));
  })
  return oldData;
}

const verifyJWT = (token) =>{
const decoded = jwt.verify(token,secret);
if(decoded){
  return decoded;
}
else return "error"
}

class learnController {
  async getData(req, res) {
    try {
      const { token } = req.params;
      const decodedToken = verifyJWT(token);
      if(decodedToken){
        fs.readFile(`./usersData/${decodedToken.id}.json`, "utf8", function (err, data) {
          res.send(data);
          res.end(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getIncorrect(req, res) {
    try {
      const { token } = req.params;
      const decodedToken = verifyJWT(token);
      if(decodedToken){
        fs.readFile(`./usersData/${decodedToken.id}.json`, "utf8", function (err, data) {
          res.send(getIncorrect(data));
          res.end(getIncorrect(data));
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async postData(req, res) {
    try {
      const {token} = req.params;
      const  data  = req.body;
      const decodedToken = verifyJWT(token);
      if(decodedToken){
        const oldData = fs.readFileSync(`./usersData/${decodedToken.id}.json`, "utf8");
        console.log(data)
        fs.writeFile(
          `./usersData/${decodedToken.id}.json`,JSON.stringify(updateData(data,JSON.parse(oldData))),
          "utf8",
          function (err, data) {
          }
        );
      }
      
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new learnController();
