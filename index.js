// Importa o módulo Express e cria uma instância da aplicação
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http); // Inicializa o socket.io

const session = require("express-session");

app.use(session({
  secret: "segredo", // use um segredo seguro em produção
  resave: false,
  saveUninitialized: true
}));


// Importa o módulo path para manipulação de caminhos de diretórios
const path = require("path");

// Importa o body-parser para processar dados de formulários
const bodyParser = require("body-parser");

// Configura o body-parser para interpretar dados URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Configura o middleware para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Configura o diretório de views e define o motor de templates para Pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Rota para a página inicial (index.pug) passando o título "Home"
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Middleware para processar dados enviados via URL-encoded e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importa e utiliza o roteador de usuários
const userRouter = require("./routes/users");
app.use("/users", userRouter);

// Importa e utiliza o roteador de envio de arquivos
const sendFiles = require("./routes/send-files");
app.use("/send-files", sendFiles);

// Importa e utiliza o roteador de envio de arquivos
const chatRouter = require("./routes/chat");
app.use("/chat", chatRouter);

// Inicia o servidor na porta 3000
http.listen(3000, () => {
  console.log("Server on port 3000");
});


io.on("connection", (socket) => {
  console.log("Usuário conectado");

  socket.on("chat message", (msg) => {
    // msg = { user: "nome", text: "mensagem" }
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});