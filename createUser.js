const mongoose = require("mongoose");

// Atualize a string de conexão com a nova senha
const MONGO_URI =
  "mongodb+srv://pozed450:password15@cluster0.xrhbde0.mongodb.net/secureLoginDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  cpf: String,
  appPassword: String,
  newPassword: String,
});

const User = mongoose.model("User", userSchema);

async function createUser() {
  const newUser = new User({
    name: "Michel Henrique Câmara da Silva",
    cpf: "53977762893",
    appPassword: "142536",
    newPassword: "142536473",
  });

  try {
    await newUser.save();
    console.log("Usuário salvo com sucesso");
  } catch (err) {
    console.error("Erro ao salvar o usuário:", err);
  } finally {
    mongoose.connection.close();
  }
}

createUser();
