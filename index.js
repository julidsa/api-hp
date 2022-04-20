const express = require("express");
const { send } = require("express/lib/response");
const mongoose = require("mongoose");
const Character = require("./models/Character")
const app = express();

try {
 mongoose.connect(
    "mongodb+srv://juli:froggy101@cluster0.ah6rv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
 );
 console.log("Banco de dados conectado!")
} catch (err) {
    console.log(`Erro ao conectar no banco de dados ${err}`)
};


app.use(express.json())

//GETALL -- READ
app.get("/characters", /*function*/ async (req, res) => {
    const characters = await Character.find()

    if(characters.length === 0){
        return res.status(404).send({message: "Não existem personagens cadastrados!"})
    }

    res.send(characters.filter(Boolean)); //when i send, the const that has in the (), will be shown to my client (ThunderClient)
});

//getbyId
app.get("/character/:id", async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send({message: "Id inválido!"});
        return;
    }
    const character = await Character.findById(id);

    if(!character){
        return res.status(404).send({message: "Personagem não encontrado"})
    }

    res.send(character);
});

//POST -- CREATE
app.post("/character", async (req, res) => {
    const {name, species, house, actor} = req.body //get what was in the request body

    if(!name || !species || !house || !actor) {
        res.status(400).send({message:"Você não enviou todos os dados necessários para cadastro"})
        return;
    }

    const character = await new Character({
        name,
        species,
        house,
        actor
    })

    await character.save()

    res.send({message: "Character created successfully!"})
});

//PUT -- UPDATE
app.put("/character/:id", async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send({message: "Id inválido!"});
        return;
    }

    const character = await Character.findById(id);

    if(!character){
        return res.status(404).send({message: "Personagem não encontrado"});
    }

    const {name, species, house, actor} = req.body;

    if(!name || !species || !house || !actor) { //all those categories is going to be required to update
        res.status(400).send({message:"Você não enviou todos os dados necessários para a atualização"});
        return;
    }

    character.name = name;
    character.species = species;
    character.house = house;
    character.actor = actor

    await character.save() //WILL WAIT TIL DATABASE EXECUTION IS COMPLETED

    res.send({message: `Character created successfully! ${character}` })
});

//DELETE -- DELETE
app.delete("/character/:id", async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send({message: "Id inválido!"});
        return;
    }

    const character = await Character.findById(id)

    if (!character){
        return res.status(404).send({message: "esse personagem não existe"})
    }
    await character.remove()

    res.send({message: "Character deleted succesfully!"})


});


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
});
