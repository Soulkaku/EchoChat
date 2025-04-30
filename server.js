import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import exphbs  from "express-handlebars";
import dotenv from "dotenv";
import { connectWithDb } from "./SRC/Config/connectionDB.js";


const app = express();
const PORT = 3000;

dotenv.config();

const server = http.createServer(app);
const io = new Server(server);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "hbs");
app.engine('hbs', exphbs.engine({
    layoutsDir: path.join(__dirname, "SRC/Views/Layouts"),
    partialsDir: path.join(__dirname, "SRC/Views/Partials"),
    default: 'main',
    extname: 'hbs'
}));
app.set("views", path.join(`${__dirname}/SRC/Views`));

app.use(express.static(path.join(`${__dirname}/Public`)));
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.render("login", {layout: "main"} );
});
app.get('/conversas', (req, res) => {
    res.render("chat", {layout: "main"} );
});

const dbConnected = await connectWithDb();

    dbConnected.once("open", () => {
        console.log("connection with database is a sucess");
    });
    dbConnected.on("error", (error) => {
        console.error(`ERROR: CONNECTION WITH DATABASE IS A FAILURE: ${error}`);
    });


server.listen(PORT, () => {
    console.log("Running in port " + PORT + `: http://localhost:${PORT}/`);
});


export default  io ;