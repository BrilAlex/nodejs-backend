let {getUsers, addUser} = require("./repository");

exports.usersController = async (request, response) => {
    if (request.method === "POST") {
        let result = await addUser("Alex");
        response.write(JSON.stringify({ success: true }));
        response.end();
    } else {
        let users = await getUsers();
        response.write(JSON.stringify(users));
        response.end();
    }
};
