import type { APIContext } from "astro";
import type { Pokemon } from "../../types.d/pokemon";

export async function GET({ request }: APIContext) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const pokemon = searchParams.get('pokemon');

  if (!pokemon) {
    return new Response('Debes proporcionar un nombre de Pokémon en la cadena de consulta.', { status: 400 });
  }

  try {
    const response = await fetch(`https://www.pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    
    if (!response.ok) {
      throw new Error('Pokémon no encontrado');
    }

    const data: Pokemon = await response.json();

    return new Response(JSON.stringify({ data }), { status: 200, headers: { 'Content-Type': 'application/json' }});
  } catch (error: any) {
    return new Response(error.message, { status: 400 });
  }
}
