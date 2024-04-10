<?php
header('Content-Type: application/json');

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'details':
        $id = intval($_GET['id']);
        echo json_encode(fetchPokemonDetails($id));
        exit;
        break;
    case 'filter':
        $type = isset($_GET['type']) ? $_GET['type'] : '';
        $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
        echo json_encode(filterPokemonByType($type, $offset));
        exit;
        break;

    default:
        $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
        echo json_encode(fetchPokemons($offset));
        exit;
        break;
}

function fetchPokemons($offset = 0, $limit = 20)
{
    $url = "https://pokeapi.co/api/v2/pokemon?offset={$offset}&limit={$limit}";
    $response = file_get_contents($url);
    return json_decode($response, true);
}

function fetchPokemonDetails($id)
{
    $url = "https://pokeapi.co/api/v2/pokemon/{$id}";
    $response = file_get_contents($url);
    return json_decode($response, true);
}

function filterPokemonByType($type, $offset = 0, $limit = 20)
{
    $url = "https://pokeapi.co/api/v2/type/{$type}";
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    
    $slicedPokemon = array_slice($data['pokemon'], $offset, $limit);
    

    $result = [];
    foreach ($slicedPokemon as $entry) {
        $pokemonData = [
            'name' => $entry['pokemon']['name'],
            'url' => $entry['pokemon']['url']
        ];
        $result[] = $pokemonData;
    }
    
    return $result;
}
