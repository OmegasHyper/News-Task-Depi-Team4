import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

var sportsApiKey = '799b803f182d4aea6263113ec7753349199c9307e608accb9303748d1327c5cf';
var leagueId = '152' //premier league id
var today = new Date();
var start = getDate(today, -4).toISOString().split("T")[0];
var end = getDate(today, 10).toISOString().split("T")[0];

console.log(start);
console.log(end);


app.get("/fixtures", async (req, res) => {
  const url = `https://apiv2.allsportsapi.com/football?met=Fixtures&APIkey=${sportsApiKey}&from=${start}&to=${end}&leagueId=${leagueId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => console.log("✅ Server running on http://localhost:5000"));


function getDate(date, days){
    const result = new Date(date);
    result.setDate(result.getDate() + days)
    return result;
}