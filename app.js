const { app } = require("./support/setupExpress");
const { query } = require("./support/db");
const { diceRolling, turnCounter } = require("./functions");

////////////////////////////

app.get("/", async (req, res) => {
  await query("DELETE FROM points;");
  await query("DELETE FROM turn_number;");

  res.render("index");
});

////////////////////////////

app.post("/tabledata", async (req, res) => {
  const player1 = req.body.player1;
  const player2 = req.body.player2;

  await query(
    "INSERT INTO points (player, primaryPoints, secondaryPoints, commandPoints) VALUES ($1, 0, 0, 0), ($2, 0, 0, 0)",
    [player1, player2]
  ); // inserts into points table

  await query("insert into turn_number (turnNum) values (0);"); // inserts into turn table

  res.redirect("points");
});

////////////////////////////

// MUST FIGURE OUT WHAT REQ.QUERY IS AND WHY IT COMES UP AS BLAHHH

app.get("/points", async (req, res) => {
  // displays current turn number
  const dbResult = await query("SELECT turnNum from turn_number");
  const dbArray = dbResult.rows;
  const currTurnNum = dbArray[0].turnnum;

  // takes query from page and determines if increase or decrease
  let turnAdjustment = req.query;

  // increases or decreases the turn number
  let newTurnNum = turnCounter(turnAdjustment, currTurnNum);

  console.log("OUTCOMEEEEE: ", turnAdjustment);

  // inserts into turn table
  await query("UPDATE turn_number SET turnNum = $1 WHERE turnNum = $2", [
    newTurnNum,
    currTurnNum,
  ]);

  res.render("points", { currTurnNum });
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
