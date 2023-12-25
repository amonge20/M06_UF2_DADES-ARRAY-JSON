//VARIABLES JSON
let pokemons, municipis, meteorits, movies;
//PART 0
// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	pokemons = data.pokemon;
	let pokemonArray = pokemons.map((pokemon) => pokemon.name);
	console.log(pokemonArray);
});

// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	municipis = data.elements;
	let municipisArray = municipis.map((municipi) => municipi.municipi_nom);
	console.log(municipisArray);
});

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	meteorits = data;
	let meteoritsArray = meteorits.map((meteorits) => meteorits.name);
	console.log(meteoritsArray);
});

// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	movies = data.movies;
	let moviesArray = movies.map((movie) => movie.title);
	console.log(moviesArray);
});