
// filterData.js
$(document).ready(function() {
  $('#typeFilter').on('change', function() {
      filterResults();
      console.log('filter is applied')
  });

});

function filterResults() {
  const selectedType = $('#typeFilter').val();
  const offset = 0; 

  $.ajax({
      url: 'poke-api.php',
      method: 'GET',
      data: {
          action: 'filter',
          type: selectedType,
          offset: offset
      },
      success: function(filteredPokemonList) {
          updatePokemonCards(filteredPokemonList);
      },
      error: function(error) {
          console.error('Failed to fetch the filtered Pokemon', error);
      }
  });
}

function updatePokemonCards(pokemonList) {
  let gridContent = '';
  if (Array.isArray(pokemonList)) {
      pokemonList.forEach(pokemon => {
          const parts = pokemon.url.split('/');
          const pokemonId = parts[parts.length - 2];
          const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
          gridContent += `
              <div class="pokemon-card p-4 border rounded-lg shadow hover:shadow-xl transition bg-white cursor-pointer" data-id="${pokemonId}">
                  <img src="${pokemonImageUrl}" alt="${pokemon.name}" class="mx-auto w-32 h-32">
                  <h2 class="capitalize text-center mt-4 text-2xl font-medium">${pokemon.name}</h2>
              </div>`;
      });
  }
  $('#pokemonGrid').html(gridContent);


  $('#pokemonGrid .pokemon-card').on('click', function(event) {
    // Had to use Explicit Rebinding here. Last solution i could think off as Event Delegation wouldn't work on replacement of event handlers on modal results from filter
      const pokemonCard = $(event.currentTarget);
      const pokemonId = pokemonCard.data('id');
      console.log('just clicked...', pokemonId);

      // Display a loading message or spinner in the modal while fetching data -  is hould add a css pre processor in future
      $('#pokemonDetailsModal').html('<p>Loading...</p>');
      $('#pokemonDetailsModal').removeClass('hidden');  // Show the modal

      $.ajax({
          url: 'poke-api.php',
          method: 'GET',
          data: {
              action: 'details',
              id: pokemonId
          },
          success: function(response) {
              var htmlContent = `
                  <div class="bg-white p-5 rounded-lg flex flex-col items-center">  
                      <button id="closeModal" class="absolute top-3 right-3 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-lg focus:outline-none hover:bg-red-600">&times;</button>
                      <img src="${response.sprites.front_default}" class="w-48 h-48 object-contain mb-4" alt="${response.name}">
                      <h2 class="capitalize text-2xl font-semibold mb-4">${response.name}</h2>
                      <p class="mb-2"><span class="font-bold">Size:</span> ${response.height} decimetres</p>
                      <p class="mb-2"><span class="font-bold">Weight:</span> ${response.weight} hectograms</p>
                      <p><span class="font-bold">Moves:</span> ${response.moves.map(move => move.move.name).join(', ')}</p>
                  </div>
              `;

              $('#pokemonDetailsModal').html(htmlContent);
          },
          error: function(error) {
              console.error('Failed to fetch the Pokemon details', error);
              $('#pokemonDetailsModal').html('<p>Failed to fetch data. Please try again.</p>');
          }
      });
  });
}