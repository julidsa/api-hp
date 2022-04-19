const express = require("express");
const { send } = require("express/lib/response");
const mongoose = require("mongoose");
const Character = require("./models/Character")
const app = express();

try{
 mongoose.connect(
    "mongodb+srv://juli:froggy101@cluster0.ah6rv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
 );
 console.log("Banco de dados conectado!")
} catch (err) {
    console.log(`Erro ao conectar no banco de dados ${err}`)
}


app.use(express.json())

//GET -- READ
app.get("/", /*function*/ (req, res) => {
    res.send(characters.filter(Boolean)); //when i send, the const that has in the (), will be shown to my client (ThunderClient)
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

//getbyId
app.get("/character/:id", (req, res) => {
    const id = +req.params.id
    const character = characters.find(c => c.id === id)

    if(!character) {
        res.status(404).send({message: "Character does not exist. Try another id."})
        return;
    }

    res.send(character)
});

//PUT -- UPDATE
app.put("/character/:id", (req, res) => {
    const id = +req.params.id;
    const character = characters.find((c) => c.id === id);

    if(!character) {
        res.status(404).send({message: "Character does not exist. Try another id."});
        return;
    }

    const {name, species, house, actor} = req.body

    character.name = name
    character.species = species
    character.house = house
    character.actor = actor

    res.send(character)

});

//DELETE -- DELETE
app.delete("/character/:id", (req, res) => {
    const id = +req.params.id
    const character = characters.find(c => c.id === id)

    if(!character) {
        res.status(404).send({message: "Character does not exist. Try another id."})
        return;
    }

    const indexCharacter = characters.indexOf(character);
    delete characters[indexCharacter];

    res.send({message: "Character deleted succesfully!"})


});


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
});
