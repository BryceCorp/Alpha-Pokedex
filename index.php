<?php
// Fetching data from PokeAPI
$pokemon_list = [];
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;

$offset = ($page - 1) * 20; // Calculate the offset for pagination
$api_url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=$offset";
$response = file_get_contents($api_url);
$data = json_decode($response);
$pokemon_list = $data->results;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokemon Viewer</title>
    <!-- Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="styles.css" rel="stylesheet">
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

    <!-- Navigation -->
    <nav class="fixed top-0 left-0 w-full bg-red-600 text-white p-4 shadow-md z-50">
        <h2 class="text-xl">Pokemon Viewer</h2>
    </nav>

    <!-- Header -->
    <header class="mt-20 mb-8 text-center">
        <h1 class="text-5xl font-bold">Pokemon Viewer</h1>
        <p class="text-gray-600 mt-2">Discover the world of Pokemon</p>
    </header>
    <!-- Main Content -->
    <main class="container mx-auto px-6">
        <!-- Grid for Pokemon -->
        <div class="grid grid-cols-5 gap-6" id="pokemonGrid">
            <!-- Looping through pokemons -->
            <?php
            if (is_array($pokemon_list)) {
                foreach ($pokemon_list as $pokemon) : 
                    // Extracting the Pokemon ID from its URL
                    $parts = explode('/', rtrim($pokemon->url, '/'));
                    $pokemon_id = end($parts);
                    $pokemon_image_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{$pokemon_id}.png";
                    ?>
                    <div class="pokemon-card p-4 border rounded-lg shadow hover:shadow-xl transition bg-white cursor-pointer" data-id="<?= $pokemon_id ?>">
                        <!-- Displaying the Pokemon image -->
                        <img src="<?= $pokemon_image_url ?>" alt="<?= ucfirst($pokemon->name) ?>" class="mx-auto w-32 h-32">
                        <h2 class="text-center mt-4 text-2xl font-medium"><?= ucfirst($pokemon->name) ?></h2>
                    </div>
                <?php endforeach;
            }
            ?>
        </div>
        <div class="text-center mt-8">
            <!-- Previous Button -->
            <?php if ($page > 1) : ?>
                <a href="?page=<?= $page - 1 ?>" class="bg-red-600 text-white px-4 py-2 rounded-l">Previous</a>
            <?php endif; ?>

            <!-- Next Button -->
            <a href="?page=<?= $page + 1 ?>" class="bg-red-600 text-white px-4 py-2 rounded-r">Next</a>
        </div>
        </div>

    </main>

    <!-- Sidebar -->
    <aside class="sidebar fixed right-0 top-20 w-64 p-6 bg-white shadow-lg z-40">
        <!-- Filters go here -->
        <h3 class="text-xl font-bold mb-4">Filters</h3>
        <div>
            <label for="typeFilter">Type:</label>
            <select id="typeFilter" class="mt-2 border rounded">
                <option value="grass">Grass</option>
                <option value="fire">Fire</option>
                <!-- Add other types as needed -->
            </select>
        </div>
        <div class="mt-4">
            <label for="generationFilter">Generation:</label>
            <select id="generationFilter" class="mt-2 border rounded">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <!-- Add more generations as needed -->
            </select>
        </div>
        <button class="resetFilters" id="resetFilters">Reset Filters</button>

        <!-- You can expand upon these filters based on what you'd like to achieve -->

    </aside>
    
<!-- Pokemon Details Modal -->
<div id="pokemonDetailsModal" class="hidden fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
    <div class="bg-white p-8 rounded-xl shadow-2xl w-4/5 max-w-xl">
        <button id="closeModal" class="absolute top-3 right-3 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-lg focus:outline-none hover:bg-red-600">&times;</button>
        <img id="pokemonImage" src="" alt="Pokemon Image" class="mx-auto w-40 h-40 object-cover rounded-full shadow-md border border-gray-200 mt-4">
        <h2 id="pokemonName" class="text-2xl font-semibold text-center mt-6 mb-4">Pokemon Name</h2>
        <p class="mb-2"><span class="font-semibold">Size:</span> <span id="pokemonSize" class="font-medium">0</span> cm</p>
        <p class="mb-2"><span class="font-semibold">Weight:</span> <span id="pokemonWeight" class="font-medium">0</span> kg</p>
        <p class="font-semibold mb-2">Moveset:</p>
        <ul id="pokemonMoveset" class="list-decimal pl-5"></ul>
    </div>
</div>

    <!-- Scripts -->
    <script>
        $(document).ready(function() {
            $('.pokemon-card').on('click', function() {
                var pokemonId = $(this).data('id');
                
                // Use the pokemonId to make an AJAX request and fetch details
                // Update the #pokemonDetailsModal content with the fetched details and show the modal.
            });
        });
    </script>

    <!-- Include modal.js -->
<script src="./javascript/modal.js"></script>
    <!-- Include filterData.js -->
<script src="./javascript/filterData.js"></script>

<!-- Include api-socket.js -->
<!-- <script src="./javascript/./api-socket.js"></script> -->

</body>
</html>
