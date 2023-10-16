<?php
header('Content-Type: application/json');

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch($action) {
    case 'details':
        $id = intval($_GET['id']);
        echo json_encode(fetchPokemonDetails($id));
        exit;
        break;
    // You can add more cases as needed.
}

function fetchPokemons($offset = 0, $limit = 20) {
    $url = "https://pokeapi.co/api/v2/pokemon?offset={$offset}&limit={$limit}";
    $response = file_get_contents($url);
    return json_decode($response, true);
}

function fetchPokemonDetails($id) {
    $url = "https://pokeapi.co/api/v2/pokemon/{$id}";
    $response = file_get_contents($url);
    return json_decode($response, true);
}
