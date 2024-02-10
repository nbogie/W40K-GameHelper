const express = require("express");
const { query } = require("./support/db");
const { diceRolling, turnCounter } = require("./functions");

const app = express();

app.listen(3000);

//searches for files with ejs in it in 'views' folder
app.set("view engine", "ejs");

////////////////////////////

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/points", async (req, res) => {
  const player1 = req.body.player1;
  const player2 = req.body.player2;

  const value1 = [`%${player1}%`];
  const value2 = [`%${player2}%`];

  await query(
    "insert into points ( player, primaryPoints,secondaryPoints, commandPoints) values (($1)",
    value1,
    "0, 0, 0), (($1)",
    value2,
    "0, 0, 0); "
  ); // inserts into points table

  await query("insert into turn_number (turnNum) values (0);"); // inserts into turn table

  res.render("points");
});

////////////////////////////

app.get("/points", (req, res) => {
  turnCounter(nextTurn, prevTurn, currTurnNum); //STILL NEED TO CREATE THIS

  res.render("points");
});

////////////////////////////

app.get("/diceroll", (req, res) => {
  let inputDice = req.query.diceNumber;

  res.render("diceroll", { resultObj: diceRolling(inputDice) });
});

////////////////////////////

// use the environment variable PORT, or 3000 as a fallback if it is undefined
const PORT_NUMBER = process.env.PORT ?? 3000;

//start the server listening indefinitely
app.listen(PORT_NUMBER, () => {
  console.log(
    `Your express app started listening on ${PORT_NUMBER} at ${new Date()}`
  );
});
