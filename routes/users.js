const express = require("express")
const router = express.Router()
//const User = require("../models/User");

//router.get("/", (req, res) => {
  //console.log(req.query.name)
  //res.send("User List")
//})
let users = [];

router.get("/register", (req, res) => {
  res.render("register")
})

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return res.redirect("/send-files");
  }
  
  res.send("Usuário ou senha incorretos!");
  return res.redirect("/login");
  
  
});
/*
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("Usuário não encontrado!");
    }

   
    if (user.password !== password) {
      return res.status(401).send("Senha incorreta!");
    }

    // Redirecionar para a rota send-files
    res.redirect("/send-files");
  } catch (error) {
    res.status(500).send("Erro no login!");
  }
});
*/

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Verificar se o usuário já existe
  const userExists = users.some(user => user.username === username);
  
  if (userExists) {
    return res.send('<h3>Usuário já existe! Tente outro.</h3>');
  }

  // Adicionar o novo usuário ao vetor
  users.push({ username, password });

  res.send('<h3>Usuário registrado com sucesso!</h3><a href="/register">Cadastrar outro</a>');
});

module.exports = router