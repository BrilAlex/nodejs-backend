let { getUsers, addUser } = require("./repository");

const express = require("express");
const router = express.Router();

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("Time:", Date.now());
    next();
});

router.get("/", async (request, response) => {
    let users = await getUsers();

    if(!!request.query.search) {
        users = users.filter(u => u.name.indexOf(request.query.search) > -1);
    }

    response.send(users);
});

router.get("/:id", async (request, response) => {
    const userID = request.params.id;
    let users = await getUsers();
    const user = users.find(u => u.id == userID);
    if (user) {
        response.send(user);
    } else {
        response.sendStatus(404);
    }
});

router.post("/", async (request, response) => {
    let name = request.body.name;
    let result = await addUser(name);
    response.send({ success: true });
});

module.exports = router;
