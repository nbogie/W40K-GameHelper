const express = require("express");
const { diceRolling, turnCounter } = require("./functions");

const app = express();

app.listen(3000);

//searches for files with ejs in it in 'views' folder
app.set("view engine", "ejs");

////////////////////////////

//elephant sql db
const dotenv = require("dotenv");
dotenv.config(); // looks for env file with url
const pool = new Pool({ connectionString: process.env.DATABASE_URL }); // keeps your password and url a secret!

async function dbDisplay() {
  const dbResult = await pool.query("select * from queen_songs limit 10");
  const songArray = dbResult.rows;
  return songArray;
}

////////////////////////////

app.get("/", async (req, res) => {
  const player1 = req.query.player1;
  const player2 = req.query.player2;

  const value1 = [`%${player1}%`];
  const value2 = [`%${player2}%`];

  const insertPlayers = await pool.query(
    "insert into points ( player, primaryPoints,secondaryPoints, commandPoints) values (($1)",
    value1,
    "0, 0, 0), (($1)",
    value2,
    "0, 0, 0); "
  );

  const startTurnCounter = await pool.query(
    "insert into turn_number (turnNum) values (0);"
  );

  res.render(
    "index",
    { players: insertPlayers },
    { turnCounter: startTurnCounter }
  );
});

/**
insert into points (
    player,
    primaryPoints,
    secondaryPoints,
    commandPoints,
    )
values 
    ('neill', 150, now()),
    ('kenny', 650, now()),
    ('lauren', 700, now());
 */

app.get("/points", (req, res) => {
  turnCounter(nextTurn, prevTurn, currTurnNum);

  res.render("points");
});

app.get("/diceroll", (req, res) => {
  let inputDice = req.query.diceNumber;

  res.render("diceroll", { resultObj: diceRolling(inputDice) });
});
