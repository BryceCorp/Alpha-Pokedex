$(document).ready(function() {

    // Click event for the pokemon card
    $('.pokemon-card').on('click', function() {
        var pokemonId = $(this).data('id');  // Fetching the Pokemon ID from data-id attribute
        console.log('just clicked...')

        // Display a loading message or spinner in the modal while fetching data
        $('#pokemonDetailsModal').html('<p>Loading...</p>');
        $('#pokemonDetailsModal').removeClass('hidden');  // Show the modal

        // Making AJAX request to fetch the Pokemon details using the ID
        $.ajax({
            url: 'poke-api.php',
            method: 'GET',
            data: {
                action: 'details',
                id: pokemonId
            },
            success: function(response) {
                // Construct the HTML to display the Pokemon details
                var htmlContent = `
                    <div class="bg-white p-5 rounded-lg flex flex-col items-center">  
                        <button id="closeModal" class="absolute top-3 right-3 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-lg focus:outline-none hover:bg-red-600">&times;</button>
                        <img src="${response.sprites.front_default}" class="w-48 h-48 object-contain mb-4" alt="${response.name}">
                        <h2 class="text-2xl font-semibold mb-4">${response.name}</h2>
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

    // Close the modal when the close button is clicked
    $(document).on('click', '#closeModal', function() {
        $('#pokemonDetailsModal').addClass('hidden');
    });
    
    // Close the modal when the background overlay is clicked
    $('#pokemonDetailsModal').on('click', function(event) {
        if ($(event.target).is('#pokemonDetailsModal')) {
            $(this).addClass('hidden');  // Hide the modal
        }
    });
});
