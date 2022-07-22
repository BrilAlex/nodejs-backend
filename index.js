const express = require("express");
const cors = require("cors");
const users = require("./usersRouter");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/users", users);

app.get("/tasks", async (request, response) => {
    response.send("Tasks page");
});

app.use((request, response) => {
    response.sendStatus(404);
});

app.listen(3009, function() {
    console.log("App is listening on port 3009");
});
