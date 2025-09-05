import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

var sportsApiKey = '799b803f182d4aea6263113ec7753349199c9307e608accb9303748d1327c5cf';
var sportsApiKey_2 = '4de606d27d5501f4ff85224c59beeb45d96423d51809614697ce59fb3e708119';
var sportsApiKey_3 = 'e2440f74faf67b127c6212a91f8d2c6cfafca9ea7fe82937cfd87e3bcb9808f7';
var leagueId = '152'; //premier league id
var today = new Date();
var start = getDate(today, -10).toISOString().split("T")[0];
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
    res.status(500).json({ error: "Failed to fetch fixtures data" });
  }
});

app.get("/standings", async (req, res) => {
  const url = `https://apiv2.allsportsapi.com/football?met=Standings&APIkey=${sportsApiKey}&leagueId=${leagueId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams data" });
  }
});

app.get("/teams", async (req, res) => {
  const url = `https://apiv2.allsportsapi.com/football/?&met=Teams&leagueId=${leagueId}&APIkey=${sportsApiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams data" });
  } 
});

app.listen(port, "0.0.0.0", () => console.log(`✅ Server running on http://localhost:${port}`));


function getDate(date, days){
    const result = new Date(date);
    result.setDate(result.getDate() + days)
    return result;
}

