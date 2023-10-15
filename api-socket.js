// launch xxamp first

let currentPage = 1;

function fetchPokemon(page = 1) {
    // $.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`, function(data) {
    //     for(let pokemon of data.results) {
    //     }
    // });
}

$('#loadMore').click(function() {
    currentPage++;
    fetchPokemon(currentPage);
});

$(document).ready(function() {
    fetchPokemon();
});
