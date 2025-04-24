import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import exphbs  from "express-handlebars";


const app = express();
const PORT = 3000;

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

server.listen(PORT, () => {
    console.log("Running in port " + PORT + `: http://localhost:${PORT}/`);
});

export default  io ;



// const PORT = 3000;
// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// app.engine('handlebars', exphb({
//     defaultLayout : 'default',
//     partialsDir: path.join(__dirname, 'views/partials'),
//     extname: '.hbs'
// }));
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));


// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.render('default', {layout: 'HomePage'});
// });

// app.listen(PORT, () => {
//     console.log("Running in port " + PORT + `: http://localhost:${PORT}/`);
// });

