const app = require("./index");
const port = 3000;
let Admin = require("./models/AdminModels");
let Roles = require("./models/RoleModel");
let bcrypt = require("bcrypt");
let Config = require("./utils/Configuration");
let PORt = Config.port;
app.listen(PORt, async () => {


  let findAdmin = await Admin.findOne();
  let findRole = await Roles.findOne({ nom: "admin" });
  if(!findRole){
    await Roles.create({nom:"admin"})
  }
  if (!findAdmin) {
    let passe = "123456";
    let passwordHash = await bcrypt.hash(passe, 10);
    await Admin.create({
      nom: "admin",
      prenom: "admin",
      login: "admin",

      password: passwordHash,
      role: findRole._id,
    });
  }


  console.log(`Server  http://localhost:${PORt}`);
});
