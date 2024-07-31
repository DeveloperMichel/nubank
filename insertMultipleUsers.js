const mongoose = require("mongoose");

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

  // Definir o esquema do modelo User
  const userSchema = new mongoose.Schema({
    name: String,
    cpf: String,
    appPassword: String,
    newPassword: String,
  });

  // Criar o modelo User
  const User = mongoose.model("User", userSchema);

  // Dados dos usuários a serem inseridos
  const users = [
    {
      name: "Suzana Rosa de Paula Silva",
      cpf: "00014799111",
      appPassword: "senha1",
      newPassword: "novasenha1",
    },
    {
      name: "Usuário 2",
      cpf: "23456789012",
      appPassword: "senha2",
      newPassword: "novasenha2",
    },
    {
      name: "Usuário 3",
      cpf: "34567890123",
      appPassword: "senha3",
      newPassword: "novasenha3",
    },
    // Adicione mais usuários conforme necessário
  ];

  // Inserir os usuários no banco de dados
  User.insertMany(users)
    .then(() => {
      console.log("Usuários inseridos com sucesso");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("Erro ao inserir usuários:", err);
      mongoose.connection.close();
    });
});
