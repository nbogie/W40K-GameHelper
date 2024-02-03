const express = require("express");
const { diceRolling } = require("./functions");

const app = express();

app.listen(3000);

//searches for files with ejs in it in 'views' folder
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/diceroll", (req, res) => {
  let inputDice = req.query.diceNumber;

  res.render("diceroll", { resultObj: diceRolling(inputDice) });
});
