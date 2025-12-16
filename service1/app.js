const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const serviceName = process.env.SERVICE_NAME || "service1";

app.get("/", (req, res) => {
  res.send(`${serviceName}: root — Hello from ${serviceName}`);
});

app.get("/info", (req, res) => {
  res.json({ service: serviceName, time: new Date().toISOString() });
});

app.get("/hello/:name?", (req, res) => {
  res.send(`Hello ${req.params.name || "Guest"} from ${serviceName}`);
});

app.listen(port, () => {
  console.log(`${serviceName} listening on ${port}`);
});
