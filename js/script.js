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
//PART 3: FUNCIONS MODIFICADES
//PART 1
//ES REINICIA LA PAGINA WEB CADA COP QUE ES EXECUTI LA FUNCIO
function reinicia(){
	location.reload();
}
//Ordre Ascendent o Descendent
function orderList(orden){
	let listado = [...pokemons];
	switch (orden){
		case "asc":
			listado.sort((a,b) => a.name.localeCompare(b.name));
			break;
		case "desc":
			listado.sort((a, b) => b.name.localeCompare(a.name));
			break;
		default:
			alert("NOPE");
	}
	pokemons = listado;
	printList();
}
//Busca la llista del JSON del pokemon, pel·licula, meteorits i municipis
function  searchList(){
	let busqueda = prompt("Busca algo?");
	let resultado = false;

	pokemons.forEach((pokemon, index) => {
		if (pokemon.name.toLowerCase().includes(busqueda.toLowerCase())){
			alert("Elemento de posicion ${index}");
			resultado = true;
		} else {
			alert("NOPE");
			resultado = false;
		}
	});
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
	  
	pokemons.forEach((pokemon) => {
	  let pesoNumericoPokemon = parseFloat(pokemon.weight);
	  table += `<tr><td>${pokemon.id}</td><td><img src="${pokemon.img}" alt="${pokemon.name}" style="max-width: 50px; max-height: 50px;"></td><td>${pokemon.name}</td><td>${isNaN(pesoNumericoPokemon) ? 0 : pesoNumericoPokemon.toFixed(2)}</td></tr>`;
	});
	  
	table += '</table>';
	document.getElementById("resultat").innerHTML = table;
}
//PART 2: GRAFICA JSON
let arrayLabelsP = ["Grass","Poison","Fire","Flying","Water","Bug","Normal","Electric","Ground","Fighting","Psychic","Rock","Ice","Ghost","Dragon"];
let arrayLabelsM = ["Drama","Crime","Action","Thriller","Biography","History","Adventure","Fantasy","Western","Romance","Sci-Fi","Mystery","Comedy","War","Family","Animation","Musical","Music","Horror","Film-Noir","Sport"];
let arrayDadesGrafPokemons = [14,33,12,19,32,12,24,9,14,8,14,11,5,3,3];
let arrayDadesGrafMovies = [185,53,39,60,27,15,57,28,8,27,32,33,44,28,25,22,5,8,4,6,10];

let borderColorPokemons = generateRandomColors(arrayLabelsP.length);
let borderColorMovies = generateRandomColors(arrayLabelsM.length);

let backgroundColorPokemons = borderColorPokemons.map(color => color.replace(")", ", 0.2)"));
let backgroundColorMovies = borderColorMovies.map(color => color.replace(")", ", 0.2)"));

const config = {
	type: 'polarArea',
	data: {
	  labels: arrayLabelsP,
	  datasets: [{
		label: 'Pokémon',
		data: arrayDadesGrafPokemons,
		backgroundColor: backgroundColorPokemons,
		borderColor: borderColorPokemons,
		borderWidth: 1,
	  },
	  {
		label: 'Pel·lícules',
		data: arrayDadesGrafMovies,
		backgroundColor: backgroundColorMovies,
		borderColor: borderColorMovies,
		borderWidth: 1,
	  }],
	},
	options: {
	  scales: {
		r: {
		  max: 200,
		  min: 0,
		  stepSize: 50,
		},
	  },
	},
  };

  const ctx = document.getElementById('myChart').getContext('2d');

  const myChart = new Chart(ctx, config);

  function generateRandomColors(count) {
	const colors = [];
	for (let i = 0; i < count; i++) {
	  const randomColor = `rgba(${getRandomNumber(255)}, ${getRandomNumber(255)}, ${getRandomNumber(255)})`;
	  colors.push(randomColor);
	}
	return colors;
  }

  function getRandomNumber(max) {
	return Math.floor(Math.random() * (max + 1));
  }