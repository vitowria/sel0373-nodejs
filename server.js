const express = require("express")
const app = express()
const path = require("path");
//var mongo = require('mongodb');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "pug");


app.get('/', (req, res) => {
    res.render('index', { title: "Home" })
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())



const userRouter = require("./routes/users")
app.use("/users", userRouter)

const sendFiles = require("./routes/send-files")
app.use("/send-files", sendFiles)

app.listen(3000)