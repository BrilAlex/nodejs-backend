let http = require("http");
let {usersController} = require("./usersController");

process.on("unhandledRejection", function(reason, p){
    console.log(reason, p);
});

let cors = (request, response) => {
    // Set CORS headers
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Request-Method", "*");
    response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    response.setHeader("Access-Control-Allow-Headers", "*");
    if (request.method === "OPTIONS") {
        response.writeHead(200);
        response.end();
        return true;
    }
    return false;
};

let server = http.createServer((request, response) => {
    if (cors(request, response)) return;

    switch (request.url) {
        case "/users":
            usersController(request, response);
            break;
        case "/lessons":
            response.write("Tasks page");
            response.end();
            break;
        default:
            response.write("Page not found");
            response.end();
    }
});

server.listen(3009);
