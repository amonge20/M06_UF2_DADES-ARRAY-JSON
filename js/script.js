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
	printList();
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

//PART 1
//ES REINICIA LA PAGINA WEB CADA COP QUE ES EXECUTI LA FUNCIO
function reinicia(){
	location.reload();
}
//Ordre Ascendent o Descendent
function orderList(orden){
	let listado;
	switch (orden){
		case "asc":
			listado = pokemons;
			listado.sort((a,b) => a.name.localeCompare(b.name));
			break;
		case "desc":
			listado = pokemons;
			listado.sort((a, b) => b.name.localeCompare(a.name));
			break;
		default:
			alert("NOPE");
	}
	printList();
}
//Busca la llista del JSON del pokemon, pel·licula, meteorits i municipis
function  searchList(){
	let busqueda = prompt("Busca algo?");
	let resultado = pokemons.findIndex(pokemon => pokemon.name === busqueda);
	alert(`Elemento en tal posición: ${resultado !== -1 ? resultado : "NOT FOUND"}`);
}
//Array multidimensional
//Per calcular la mitjana amb un array JSON
function calcMitjana(){
	let caracteristicasPokemon = pokemons[pokemons.length - 1].weight;
	let pesoNumericoPokemon = parseFloat(caracteristicasPokemon);
	alert(`Media del ultimo bloque añadido: ${isNaN(pesoNumericoPokemon) ? 0 : pesoNumericoPokemon.toFixed(2)}`);
}
//Funcio per a que es mostri la taula del JSON amb el DOM
function printList() {
	let table = '<table id="pokemonTable" style="border-collapse: collapse; width: 100%;"><tr><th>ID</th><th>Imagen</th><th>Nombre</th><th>Peso</th></tr>';
		pokemons.forEach(pokemon => {
			let pesoNumericoPokemon = parseFloat(pokemon.weight);
			table += `<tr><td>${pokemon.id}</td><td><img src="${pokemon.img}" alt="${pokemon.name}" style="max-width: 50px; max-height: 50px;"></td><td>${pokemon.name}</td><td>${isNaN(pesoNumericoPokemon) ? 0 : pesoNumericoPokemon.toFixed(2)}</td></tr>`;
		});
		table += '</table>';
		document.getElementById("resultat").innerHTML = table;
  }