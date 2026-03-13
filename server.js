const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let storedName = "";

app.post("/submit", (req, res) => {
  const username = req.body.username ? req.body.username.trim() : "";

  if (username === "") {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Error</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="page">
          <div class="card">
            <h1>Please enter your name.</h1>
            <a class="back-link small-space" href="/">Go Back</a>
          </div>
        </div>
      </body>
      </html>
    `);
  }

  storedName = username;
  res.redirect("/greeting");
});

app.get("/greeting", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Greeting</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="page">
        <div class="card">
          <h1 class="result-title">Hello, ${storedName}!</h1>
          <a class="back-link" href="/">Go Back</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});