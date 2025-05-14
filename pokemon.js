//

const express = require("express");
const axios = require("axios");

const app = express();
app.get("/pokemonApi", async function(req, res){
    // res.send("API is running");
    const {type, count} = req.query;

    if(!type){
        return res.status(400).json({
            error: "Type parameter is required"
        })
    }
    const countNum = parseInt(count) || 5; // Default to 5 if count is not provided

    try{
        const typeUrl = `https://pokeapi.co/api/v2/type/${type}`;
        const typeResponse = await axios.get(typeUrl);
        const pokemonList = typeResponse.data.pokemon;

        const selectedPokemon = pokemonList.slice(0, countNum);

        const pokemonData = await Promise.all(
            selectedPokemon.map(
                async function(pokemon){
                const pokemonResponse = await axios.get(pokemon.pokemon.url);
                const {name, sprites} = pokemonResponse.data;
                return{
                    name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter of name
                    image: sprites.front_default // Pokémon image URL
                };
            })
        )
        res.json(pokemonData);
    }
    catch(error){
                    res.status(500).json({ error: 'An error occurred while fetching data.' });
                }
});

app.listen(3000);
