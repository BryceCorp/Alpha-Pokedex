let currentPage = 1;

function fetchPokemon(page = 1) {
    $.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`, function(data) {
        // Check if the data returned is valid and contains the results key
        if (data && data.results && Array.isArray(data.results)) {
            for (let pokemon of data.results) {
                // Logic to append each Pokemon to the grid
                // For simplicity, using jQuery
                $('#pokemonGrid').append(`
                    <div class="pokemon-card p-4 border rounded-lg shadow hover:shadow-xl transition bg-white cursor-pointer" data-url="${pokemon.url}">
                        <h2 class="text-center mt-4 text-2xl font-medium">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                    </div>
                `);
            }
        } else {
            console.error("Invalid data returned from the API");
        }
    }).fail(function() {
        console.error("Failed to fetch data from the API");
    });
}

$('#loadMore').click(function() {
    currentPage++;
    fetchPokemon(currentPage);
});

$(document).ready(function() {
    fetchPokemon();
});
