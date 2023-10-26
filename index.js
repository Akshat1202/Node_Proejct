
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));
function check(req, res, next) {
    if (req.body["password"] == "AKSHATYADAV") {
        userAuthorised = true;
    }
    console.log("**MIDDLEWARE PROCESSING**");
    next();
}
app.use(check);
app.get("/", (req, res) => {
    console.log("**GET REQUEST PROCESSING**");
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/tips", (req, res) => {
    console.log("**POST REQUEST PROCESSING**");
    if (userAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
        userAuthorised = false;
    }
    else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});