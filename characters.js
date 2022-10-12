const express = require("express");
const router = express.Router();
const axios = require("axios");
let characters = require("./db.js");

router.get("/", async (req, res) => {
  try {
    if (characters.length === 0) {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      characters = response.data.results.map((element) => ({
        id: element.id,
        name: element.name,
        image: element.image,
        species: element.species,
      }));
    } else {
      res.json(characters);
    }
  } catch (err) {
    res.status(404).send("Server error >:C");
  }
});

router.get("/quantity", (req, res) => {
  res.send({ length: characters.length });
});

router.post("/", (req, res) => {
  let { name, image, species } = req.body;

  if (!name || !image || !species) {
    return res.status(406).send("Info missing");
  }

  let newChar = {
    name: name,
    image: image,
    species: species,
    id: `e${characters.length + 1}`,
  };

  characters.push(newChar);
  res.json(newChar);
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;

  if (!id) {
    return res.status(406).send("id missing");
  }

  let found = characters.find((element) => element.id.toString() === id);

  if (found) {
    characters = characters.filter((element) => element.id.toString() !== id);
    return res.send(characters);
  }

  return res.status(406).send("the id does not correspond with a character");
});

router.get("/extra", (req, res) => {
    let {species} = req.query;

    if(species) {
        let filtered = characters.filter(char => char.species.toLowerCase() === species.toLowerCase());
        return res.json(filtered)
    }

    return res.status(406).send("the species is required")
})

router.get("*", (req, res) => {
    res.send("What are you looking for?")
})

module.exports = router;
