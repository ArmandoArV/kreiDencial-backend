const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const login = require("./routes/login");
const user = require("./routes/user");
const events = require("./routes/evento");
const userEvent = require("./routes/userEvent");
const leaderboard = require("./routes/leaderboard");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/", login);
app.use("/", user);
app.use("/", events);
app.use("/", userEvent);
app.use("/", leaderboard);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
