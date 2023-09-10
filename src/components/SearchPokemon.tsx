import React, { useState, type FormEvent } from 'react'
import { type Pokemon, type Type } from '../types.d/pokemon'
import PokemonCard from './PokemonCard.astro'

function SearchPokemon() {
  const errorURL = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2hvZm9ia2o3cmZ3cm90MnBzYWFkYWlncHRtMWlxb216bmx4ZWdpcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qyYVPghAbWY2AmNDL2/giphy.gif'
  const [search, setSearch] = useState<string>('')
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [error, setError] = useState<string | null>(null)

  const searchPokemon = async (e: FormEvent) => {
    e.preventDefault()
    setError(null); // Restablece el estado de error

    if (search.trim() !== '') {
      try {
        // Enviar la solicitud a /api/search con el parámetro "pokemon"
        const response = await fetch(`/api/search?pokemon=${search}`);
        
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }

        const {data}: {data: Pokemon} = await response.json();
        console.log(data)
        setPokemon(data); // Establecer el estado del Pokémon con la respuesta JSON
      } catch (error: any) {
        setError(error.message);
        setPokemon(null);
      }
    }
  };

  return (
    <div>
      <form
      onSubmit={searchPokemon}
        className="text-center mt-4"
      >
        <input
          type="text"
          className="border p-2 w-80 rounded-md outline-none focus:ring focus:ring-red-800"
          placeholder="Nombre o ID del Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <button type="button" onClick={searchPokemon} className="bg-blue-500 text-white p-2 ml-2">Buscar</button> */}
      </form>
      {error && (
       <div className="flex justify-center">
         <article className="w-80 bg-white relative shadow-lg rounded-lg overflow-hidden m-4">
        <div className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold absolute top-0 left-0 rounded-t-lg">
          ID: "En tus sueños"
        </div>
        <div className="flex items-center justify-center p-4">
          <img
            className="w-40 h-40"
            src={errorURL}
            alt=""
          />
        </div>
        <div className="text-center p-4">
          <h1 className="text-xl font-semibold">{search}</h1>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex justify-center p-4">
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm mx-1">
              InventFlix
            </span>
        </div>
      </article>
       </div>
      )}
      <div className="flex justify-center">
      {pokemon && (
        <article className="w-80 bg-white relative shadow-lg rounded-lg overflow-hidden m-4">
        <div className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold absolute top-0 left-0 rounded-t-lg">
          ID: {pokemon?.id}
        </div>
        <div className="flex items-center justify-center p-4">
          <img
            className="w-40 h-40"
            src={pokemon?.sprites.other?.dream_world.front_default ?? pokemon?.sprites.front_default}
            alt=""
          />
        </div>
        <div className="text-center p-4">
          <h1 className="text-xl font-semibold">{pokemon?.name}</h1>
        </div>
        <hr className="border-t border-gray-300" />
        <div className="flex justify-center p-4">
          {pokemon?.types.map(({ type} :{type:Type['type']}) => (
            <span key={type.name} className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm mx-1">
              {type.name}
            </span>
          ))}
        </div>
      </article>
      )}
      </div>
    </div>
  )
}

export default SearchPokemon
