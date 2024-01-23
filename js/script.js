//DECLARANT VARIABLES PER CONVERTIR EL JSON EN ARRAY
let pokemons, municipis, meteorits, movies;
//ARRAY MULTIDIMENSIONAL
let pokemonData = [];
let municipisData = [];
let earthMeteoritesData = [];
let moviesData = [];
//FUNCIÓ QUE SELECCIONA LA TAULA PER A SELECCIONAR EL JSON
function TablaSeleccionada() {
    let opcioSeleccionada = document.querySelector('input[name="categoria"]:checked').value;
    //SELECCIÓ DE LA CATEGORIA
    switch (opcioSeleccionada) {
        //POKEMONS
        case 'pokemons':
            fetch("js/data/pokemon.json")
                .then((response) => response.json())
                .then((data) => {
                    pokemons = data.pokemon;
                    pokemonData = pokemons.map((pokemon) => ({
                        id: pokemon.id,
                        img: pokemon.img,
                        name: pokemon.name,
                        weight: pokemon.weight
                    }));
                    //MOSTRA LA TAULA DE POKEMONS
                    printList(pokemonData, 'pokemons');
                });
            break;
        case 'municipis':
            fetch("js/data/municipis.json")
                .then((response) => response.json())
                .then((data) => {
                    municipis = data.elements;
                    municipisData = municipis.map((municipi) => ({
                        ine: municipi.ine,
                        municipi_nom: municipi.municipi_nom,
                        municipi_escut: municipi.municipi_escut,
                        nombre_habitants: municipi.nombre_habitants
                    }));
                    //MOSTRA LA TAULA DE MUNICIPIS
                    printList(municipisData, 'municipis');
                });
            break;
        case 'meteorits':
            fetch("js/data/earthMeteorites.json")
                .then((response) => response.json())
                .then((data) => {
                    earthMeteoritesData = data;
                    //MOSTRA LA TAULA DE METEORITS
                    printList(earthMeteoritesData, 'meteorits');
                });
            break;
        case 'pelicules':
            fetch("js/data/movies.json")
                .then((response) => response.json())
                .then((data) => {
                    moviesData = data.movies;
                    //MOSTRA LA TAULA DE PEL·LÍCULES
                    printList(moviesData, 'pelicules');
                });
            break;
    }
}
//FUNCIO QUE REINICIA LA PÀGINA CADA VEGADA QUE ES PREM EL BOTÓ
function reinicia() {
    location.reload();
}
//QUAN CLIQUES EL TEXT <TH>, ES ORDENARA DE FORMA ASCENDENT O DESCENDENT
function orderList(column) {
    let opcioSeleccionada = document.querySelector('input[name="categoria"]:checked').value;
    let data, tableType;
    //Selecciona les dades i el tipus de taula segons l'opció seleccionada
    switch (opcioSeleccionada) {
        case 'pokemons':
            data = pokemonData;
            tableType = 'pokemons';
            break;
        case 'municipis':
            data = municipisData;
            tableType = 'municipis';
            break;
        case 'meteorits':
            data = earthMeteoritesData;
            tableType = 'meteorits';
            break;
        case 'pelicules':
            data = moviesData;
            tableType = 'pelicules';
            break;
        default:
            data = [];
            tableType = '';
            break;
    }
    //Si la columna actual és la mateixa que la anterior, alterna entre asc i desc
    if (column === window.columnaReciente) {
        window.orderType = window.orderType === 'asc' ? 'desc' : 'asc';
    } else {
        window.columnaReciente = column;
        window.orderType = 'asc';
    }
    //Ordena les dades segons la columna i el tipus d'ordre
    data.sort((a, b) => {
        let opcioA = a[column];
        let opcioB = b[column];
        // Realitza la comparació segons el tipus de dada
        if (typeof opcioA === 'string') {
            return opcioA.localeCompare(opcioB);
        } else {
            return opcioA - opcioB;
        }
    });
    //Si el tipus d'ordre és descendent, inverteix l'array ordenat
    if (window.orderType === 'desc') {
        data.reverse();
    }
    //Mostra la taula actualitzada
    printList(data, tableType);
}
//QUAN ES POSA EL QUE VOLS BUSCAR, ES FILTRARÀ LO SEGÜENT
function searchList() {
    let opcioSeleccionada = document.querySelector('input[name="categoria"]:checked').value;
    let data, tableType;
    //Selecciona les dades i el tipus de taula segons l'opció seleccionada
    switch (opcioSeleccionada) {
        case 'pokemons':
            data = pokemonData;
            tableType = 'pokemons';
            break;
        case 'municipis':
            data = municipisData;
            tableType = 'municipis';
            break;
        case 'meteorits':
            data = earthMeteoritesData;
            tableType = 'meteorits';
            break;
        case 'pelicules':
            data = moviesData;
            tableType = 'pelicules';
            break;
        default:
            data = [];
            tableType = '';
            break;
    }
    //Obté el valor del cuadre de búsqueda
    let inputSearch = document.getElementById('txtSearch').value.toLowerCase();
    //Filtra las dades segons el valor de cerca
    let dadesFiltrades = data.filter(item => {
        for (const key in item) {
            if (item.hasOwnProperty(key) && typeof item[key] === 'string' && item[key].toLowerCase().includes(inputSearch)) {
                return true;
            }
        }
        return false;
    });
    //Ordena les dades segons la columna i el tipus d'ordre
    dadesFiltrades.sort((a, b) => {
        const opcioA = a[window.columnaReciente];
        const opcioB = b[window.columnaReciente];
        //Realitza la comparació segons el tipus de dada
        if (typeof opcioA === 'string') {
            return opcioA.localeCompare(opcioB);
        } else {
            return opcioA - opcioB;
        }
    });
    //Si el tipus d'ordre és descendent, inverteix l'array ordenat
    if (window.orderType === 'desc') {
        dadesFiltrades.reverse();
    }
    //Mostra la taula actualitzada
    printList(dadesFiltrades, tableType);
}
//CALCULARÀ LA MITJANA DEL PES, HABITANTS, VALORACIÓ, ETC.
function calcMitjana(column) {
    let opcioSeleccionada = document.querySelector('input[name="categoria"]:checked').value;
    let data, tableType;
    //Selecciona les dades i el tipus de taula segons l'opció seleccionada
    switch (opcioSeleccionada) {
        case 'pokemons':
            data = pokemonData;
            tableType = 'pokemons';
            break;
        case 'municipis':
            data = municipisData;
            tableType = 'municipis';
            break;
        case 'meteorits':
            data = earthMeteoritesData;
            tableType = 'meteorits';
            break;
        case 'pelicules':
            data = moviesData;
            tableType = 'pelicules';
            break;
        default:
            data = [];
            tableType = '';
            break;
    }
    //Calcula la mitjana de la columna
    const columnData = data.map(item => parseFloat(item[column]) || 0); 
    const average = columnData.reduce((sum, value) => sum + value, 0) / columnData.length;
    //Mostra la taula actualitzada
    printList(data, tableType);
    //Resultat de la mitja quan cliques una dels <th>
    alert(`Mitjana de ${column}: ${average.toFixed(2)}`);
}
//MOSTRA LA TAULA DEL JSON SELECCIONAT
function printList(tableData, tableType) {
    let tablaJSON = '<table>';
    switch (tableType) {
        case 'pokemons':
            tablaJSON += '<tr><th onclick="orderList(\'id\')">ID</th><th>Imagen</th><th onclick="orderList(\'name\')">Nom</th><th onclick="calcMitjana(\'weight\')">Peso</th></tr>';
            tableData.forEach(function (pokemon) {
                tablaJSON += '<tr>';
                tablaJSON += '<td>' + pokemon.id + '</td>';
                tablaJSON += '<td><img src="' + pokemon.img + '"></td>';
                tablaJSON += '<td>' + pokemon.name + '</td>';
                tablaJSON += '<td>' + pokemon.weight + '</td>';
                tablaJSON += '</tr>';
            });
            break;
        case 'municipis':
            tablaJSON += '<tr><th onclick="orderList(\'ine\')">Codigo Postal</th><th onclick="orderList(\'municipi_nom\')">Municipio</th><th>Escudo Municipio</th><th onclick="calcMitjana(\'nombre_habitants\')">habitantes</th></tr>';
            tableData.forEach(function (municipi) {
                tablaJSON += '<tr>';
                tablaJSON += '<td>' + municipi.ine + '</td>';
                tablaJSON += '<td>' + municipi.municipi_nom + '</td>';
                tablaJSON += '<td><img src="' + municipi.municipi_escut + '"></td>';
                tablaJSON += '<td>' + municipi.nombre_habitants + '</td>';
                tablaJSON += '</tr>';
            });
            break;
        case 'meteorits':
            tablaJSON += '<tr><th onclick="orderList(\'id\')">ID</th><th onclick="orderList(\'name\')">Nombre</th><th onclick="calcMitjana(\'reclat\')">Reclat</th><th onclick="calcMitjana(\'reclong\')">Reclong</th></tr>';
            tableData.forEach(function (earthMeteorit) {
                tablaJSON += '<tr>';
                tablaJSON += '<td>' + earthMeteorit.id + '</td>';
                tablaJSON += '<td>' + earthMeteorit.name + '</td>';
                tablaJSON += '<td>' + earthMeteorit.reclat + '</td>';
                tablaJSON += '<td>' + earthMeteorit.reclong + '</td>';
                tablaJSON += '</tr>';
            });
            break;
        case 'pelicules':
            tablaJSON += '<tr><th onclick="orderList(\'title\')">Nombre dela pelicula</th><th>Poster</th><th>Genero</th><th onclick="calcMitjana(\'rating\')">Valoración</th></tr>';
            tableData.forEach(function (movie) {
                tablaJSON += '<tr>';
                tablaJSON += '<td>' + movie.title + '</td>';
                tablaJSON += '<td><img src="' + movie.url + '" alt="Cartell"></td>';
                tablaJSON += '<td>' + movie.genres.join(', ') + '</td>';
                tablaJSON += '<td>' + movie.rating + '</td>';
                tablaJSON += '</tr>';
            });
            break;
    }
    tablaJSON += '</table>';
    document.getElementById('resultat').innerHTML = tablaJSON;
}
//DADES DELA GRAFICA JSON DE POKEMONS
let pokemonTipo = ["Grass", "Poison", "Fire", "Flying", "Water", "Bug", "Normal", "Electric", "Ground", "Fighting", "Psychic", "Rock", "Ice", "Ghost", "Dragon"];
let pokemonTipoNumerico = [14, 33, 12, 19, 32, 12, 24, 9, 14, 8, 14, 11, 5, 3, 3];
//COLORS PER LA GRAFICA JSON DE POKEMONS
let pokemonColorBorde = Array.from({ length: pokemonTipo.length }, () => ColorAleatorio());
let pokemonColorFondo = pokemonColorBorde.map(color => color.replace(")", ", 0.2)"));
//CREACIO DELA GRAFICA JSON DE POKEMONS
const config = {
    type: 'polarArea',
    data: {
        labels: pokemonTipo,
        datasets: [{
            label: 'Pokemons',
            data: pokemonTipoNumerico,
            backgroundColor: pokemonColorFondo,
            borderColor: pokemonColorBorde,
            borderWidth: 1
        }],
    },
};
//CREA LA GRAFICA DELA GRAFICA JSON DE POKEMONS
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, config);
//FUNCIO PER OBTENIR UN COLOR ALEATORI EN FORMAT RGBA
function ColorAleatorio() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b})`;
}
//MOSTRAR O AMAGAR LA TAULA O GRAFICA DEL JSON POKEMON
document.addEventListener("DOMContentLoaded", function () {
    const tablaPokemon = document.getElementById('resultat');
    const graficaPokemon = document.querySelector('.chart-container');
    const botonTablaGrafica = document.querySelector('button');
    graficaPokemon.style.display = 'none';
    botonTablaGrafica.style.display = 'block';
    document.querySelector('input[name="categoria"]').addEventListener('change', function () {
        if (this.value === 'pokemons') {
            botonTablaGrafica.style.display = 'none';
        } else {
            botonTablaGrafica.style.display = 'block';
        }
    });
});
//FUNCIO PER AMAGAR O PER MOSTRAR TAULA/GRAFICA
function MostrarOcultar() {
    const tablaPokemon = document.getElementById('resultat');
    const graficaPokemon = document.querySelector('.chart-container');
    const botonTablaGrafica = document.querySelector('button');

    if (graficaPokemon.style.display !== 'none') {
        tablaPokemon.style.display = 'block';
        graficaPokemon.style.display = 'none';
        botonTablaGrafica.style.display = 'block';
    } else {
        tablaPokemon.style.display = 'none';
        graficaPokemon.style.display = 'block';
        botonTablaGrafica.style.display = 'none';
    }
}