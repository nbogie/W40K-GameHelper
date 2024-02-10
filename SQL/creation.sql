DROP TABLE IF EXISTS points;
DROP TABLE IF EXISTS turn_number;

-- use the html form to store the names in the table to use!
-- use an insert query
CREATE TABLE points (
    player VARCHAR(255) PRIMARY KEY,
    primaryPoints integer not null,
    secondaryPoints integer not null,
    commandPoints integer not null
);

-- stores the turn number so it can remain if they change the page for rolling dice
CREATE TABLE turn_number (
    turnNum integer PRIMARY KEY
);

