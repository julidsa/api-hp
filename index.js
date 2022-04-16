const express = require("express");
const app = express();

app.use(express.json())

const characters = [
    {
        id: 1,
        name:"Harry Potter",
        species: "human",
        house: "Gryffindor",
        actor: "Ganiel Radcliffe"
    },
    {
        id: 2,
        name:"Hermione Granger",
        species: "human",
        house: "Gryffindor",
        actor: "Emma Watson"
    },
]

//GET -- READ
app.get("/", /*function*/ (req, res) => {
    res.send(characters.filter(Boolean)); //when i send, the const that has in the (), will be shown to my client (ThunderClient)
});

//POST -- CREATE
app.post("/character", (req, res) => {
    const character = req.body //get what was in the request body

    character.id = characters.length + 1 //create automatic ids 
    characters.push(character) //put the infos at the end

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
