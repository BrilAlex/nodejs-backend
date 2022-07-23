const {getUser, getUsers, addUser, updateUser, deleteUser} = require("./repository");

const express = require("express");
const router = express.Router();

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time:", Date.now());
  next();
});

router.get("/", async (request, response) => {
  let users = await getUsers(request.query.search);
  response.send(users);
});

router.get("/:id", async (request, response) => {
  const userID = request.params.id;
  let user = await getUser(userID);
  if (user) {
    response.send(user);
  } else {
    response.sendStatus(404);
  }
});

router.delete("/:id", async (request, response) => {
  const userID = request.params.id;
  const user = await deleteUser(userID);
  response.send(204);
});

router.post("/", async (request, response) => {
  let name = request.body.name;
  await addUser(name);
  response.send({success: true});
});

router.put("/", async (request, response) => {
  const userID = request.body.id;
  const newName = request.body.name;
  await updateUser(userID, newName);
  response.send({success: true});
});

module.exports = router;
