# SEL0373 - Prova de Conceito - Sistema IoT com Node.js

Este projeto é uma prova de conceito desenvolvida para a disciplina SEL0373 - Projetos em Sistemas de IoT. O objetivo é demonstrar como utilizar o Node.js para criar um sistema simples de autenticação de usuários, envio de arquivos via MQTT e visualização de arquivos, em um ambiente de Internet das Coisas (IoT).

O sistema utiliza bcrypt para o hash das senhas dos usuários, garantindo segurança na autenticação, e Express.js como framework para construir a API que gerencia as operações de envio e visualização de arquivos.

⸻

## 🚀 Objetivo do Projeto

O objetivo deste projeto é apresentar um sistema funcional de IoT com as seguintes funcionalidades:
	•	Autenticação de usuários usando bcrypt para garantir segurança.
	•	Envio de arquivos via MQTT, que é um protocolo leve e ideal para comunicação em sistemas IoT.
	•	Visualização de arquivos enviados, com uma interface simples para gestão dos dados.

A proposta é mostrar como Node.js e Express.js podem ser usados para integrar facilmente funcionalidades de autenticação, comunicação MQTT e manipulação de arquivos em sistemas IoT, proporcionando uma solução escalável e eficiente.

⸻

## 📦 Instalação

Para rodar o projeto localmente, siga os passos abaixo.

1. Clone o repositório

Primeiro, clone o repositório para o seu computador:

```bash
git clone https://github.com/seu-usuario/projeto-nodejs-iot.git
```

2. Instale as dependências

Dentro do diretório do projeto, execute o seguinte comando para instalar as dependências:

```bash
cd projeto-nodejs-iot
npm install
```

3. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias:

```env
PORT=3000
SECRET_KEY=your-secret-key  # Chave secreta para o hash das senhas
MQTT_BROKER_URL=mqtt://localhost  # URL do broker MQTT
```

4. Inicie o servidor

Após configurar as variáveis de ambiente, execute o servidor com o comando:

```bash
npm start
```

O servidor estará rodando em http://localhost:3000.

⸻

🔐 Funcionalidades

1. Autenticação de Usuários

Este sistema permite que os usuários façam login e se registrem com segurança. A autenticação é feita utilizando bcrypt para hash das senhas, garantindo que a senha dos usuários seja armazenada de forma segura.
	•	POST /api/users/register - Cadastro de novos usuários.
	•	POST /api/users/login - Login do usuário e validação da senha (hash).

2. Envio de Arquivos via MQTT

Ao invés de usar métodos tradicionais de upload via HTTP, o sistema envia os arquivos utilizando MQTT. O MQTT é um protocolo de mensagens leve, ideal para comunicação em sistemas IoT, e aqui ele é utilizado para enviar arquivos entre o cliente e o servidor.
	•	POST /api/files/upload - Endpoint que recebe o arquivo via MQTT.
	•	O servidor se conecta a um broker MQTT e envia os arquivos para serem armazenados.

3. Visualização de Arquivos

Os arquivos enviados podem ser visualizados a qualquer momento:
	•	GET /api/files - Lista os arquivos enviados.
	•	GET /api/files/:filename - Visualiza um arquivo específico enviado anteriormente.

⸻

## ⚙️ Express.js: O Framework para APIs

### Por que usamos o Express.js?

O Express.js é um framework minimalista e flexível para o Node.js, que facilita a criação de APIs RESTful, a definição de rotas e o gerenciamento de requisições. Com o Express, podemos:
	•	Criar rotas para registrar e autenticar usuários.
	•	Definir endpoints para envio e visualização de arquivos.
	•	Gerenciar o middleware para validar as requisições, tratar erros e autenticar os usuários.

Em resumo, o Express torna o desenvolvimento da API mais rápido e organizado, além de ser altamente escalável.

⸻

## 📡 Uso do MQTT

O MQTT é um protocolo de mensagens de publicação/assinatura amplamente utilizado em IoT, pois é leve e eficiente para comunicação entre dispositivos.

Neste projeto, utilizamos o MQTT para enviar os arquivos do cliente para o servidor. A comunicação é feita da seguinte forma:
	1.	O cliente MQTT envia os arquivos para o broker MQTT.
	2.	O servidor (Node.js) se inscreve no tópico do broker e recebe os arquivos assim que são publicados.

Aqui está um exemplo básico de como o Node.js se conecta ao broker MQTT e envia/recebe mensagens:

```javascript
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  
  // Enviar uma mensagem (por exemplo, um arquivo ou dados)
  client.publish('topic/upload', 'Arquivo enviado!');
});

client.on('message', (topic, message) => {
  console.log(`Mensagem recebida no tópico ${topic}: ${message}`);
});
```


⸻

🧑‍💻 Tecnologias Utilizadas
	•	Node.js: Ambiente JavaScript no servidor para criação de sistemas escaláveis.
	•	Express.js: Framework minimalista para criação de APIs RESTful.
	•	bcrypt: Biblioteca para hash de senhas e validação segura de autenticação.
	•	MQTT: Protocolo leve e eficiente para comunicação em IoT.
	•	Multer: Middleware para upload de arquivos.
	•	dotenv: Biblioteca para gerenciamento de variáveis de ambiente.

⸻

🌐 Como Testar o Sistema

Aqui está um exemplo simples de como testar a API usando Postman ou Insomnia:

1. Cadastro de Usuário:
	•	POST http://localhost:3000/api/users/register
	•	Corpo da requisição (JSON):

```json
{
  "username": "usuario_teste",
  "password": "senha_segura"
}
```

2. Login de Usuário:
	•	POST http://localhost:3000/api/users/login
	•	Corpo da requisição (JSON):

```json
{
  "username": "usuario_teste",
  "password": "senha_segura"
}
```

3. Envio de Arquivo via MQTT:
	•	POST http://localhost:3000/api/files/upload
	•	O envio do arquivo é feito via MQTT para o broker especificado na configuração.

4. Visualização de Arquivos:
	•	GET http://localhost:3000/api/files
	•	Ou, para ver um arquivo específico:

```
GET http://localhost:3000/api/files/nomedoarquivo.ext
```
