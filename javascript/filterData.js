let allData = []; // This will hold all the data from the API

async function fetchData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
    const data = await response.json();
    allData = data.results;
  } catch (error) {
    console.error("There was an error fetching the data:", error);
  }
}

async function filterResults() {
    // Fetch current selected values
    const selectedType = $('#typeFilter').val();
    const selectedGeneration = $('#generationFilter').val();

    const filteredResults = allData.filter(pokemon => {
        // Adjusting the filter logic based on the provided structure
        return pokemon.types.includes(selectedType) && 
               pokemon.species.generation.name === selectedGeneration;
    });

    // Display these filtered results
    displayResults(filteredResults);
}

$(document).ready(function () {
  fetchData().then(() => { // Fetch data initially
    $("#typeFilter, #generationFilter").on("change", filterResults);
    // Add an event listener for the reset button
    $("#resetFilters").on("click", function () {
      $("#typeFilter").val("default"); 
      $("#generationFilter").val("default");
      filterResults();
    });
  });
});

function displayResults(data) {
  const resultsContainer = document.getElementById("resultsContainer"); 
  resultsContainer.innerHTML = ""; 

  data.forEach((pokemon) => {
    const pokemonElement = document.createElement("div");
    pokemonElement.innerText = pokemon.name;
    resultsContainer.appendChild(pokemonElement);
  });
}
