const express = require("express");
const app = express();

app.use(express.json());

// starting test
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
