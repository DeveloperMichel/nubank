const mongoose = require("mongoose");
const express = require("express");
const app = express();

const MONGO_URI =
  "mongodb+srv://pozed450:password15@cluster0.xrhbde0.mongodb.net/secureLoginDB?retryWrites=true&w=majority";

// Conectar ao MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Erro ao conectar ao MongoDB:", err);
});

db.once("open", () => {
  console.log("Conectado ao MongoDB");
});

// Definir o esquema do modelo User
const userSchema = new mongoose.Schema({
  name: String,
  cpf: String,
  appPassword: String,
  newPassword: String,
});

// Criar o modelo User
const User = mongoose.model("User", userSchema);

// Configurar middlewares
app.use(express.json()); // Para lidar com dados JSON
app.use(express.urlencoded({ extended: true })); // Para lidar com dados de formulário

// Rota para restaurar senha ou criar usuário
app.post("/restore", async (req, res) => {
  try {
    const { name, cpf, appPassword, newPassword } = req.body;

    if (!name || !cpf || !appPassword || !newPassword) {
      return res
        .status(400)
        .send({ message: "Todos os campos são obrigatórios" });
    }

    console.log("Recebido:", { name, cpf, appPassword, newPassword });

    // Verificar se o usuário já existe
    let user = await User.findOne({ cpf });

    if (!user) {
      // Se o usuário não existe, criar um novo usuário
      user = new User({ name, cpf, appPassword, newPassword });
      await user.save();
      console.log("Novo usuário criado:", user);
      return res.send({ message: "Novo usuário criado com sucesso" });
    }

    // Se o usuário existe, atualizar os dados
    user.name = name;
    user.appPassword = appPassword;
    user.newPassword = newPassword;

    await user.save();

    console.log("Usuário atualizado:", user);

    res.send({ message: "Senha restaurada com sucesso" });
  } catch (error) {
    console.error("Erro ao restaurar senha:", error);
    res.status(500).send({ message: "Erro ao restaurar senha" });
  }
});

app.listen(5013, () => {
  console.log("Servidor rodando na porta 5013");
});
