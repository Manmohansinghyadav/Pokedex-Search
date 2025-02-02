import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import PokemonCard from './components/PokemonCard';
import { Pokemon } from './types';

function App() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPokemon, setTotalPokemon] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
        const data = await response.json();
        setTotalPokemon(data.count);
      } catch (err) {
        console.error('Failed to fetch total Pokémon count:', err);
      }
    };

    fetchTotalPokemon();
  }, []);

  const searchPokemon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    setError('');
    setPokemon(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokémon not found!');
      const data = await response.json();
      setPokemon({
        id: data.id,
        name: data.name,
        types: data.types.map((type: any) => type.type.name),
        sprite: data.sprites.other['official-artwork'].front_default,
        stats: data.stats.map((stat: any) => ({
          name: stat.stat.name,
          value: stat.base_stat
        })),
        height: data.height / 10, // Convert to meters
        weight: data.weight / 10, // Convert to kg
      });
    } catch (err) {
      setError('Pokémon not found! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRandomPlaceholder = () => {
    if (!totalPokemon) return "Search Pokémon...";
    const randomId = Math.floor(Math.random() * totalPokemon) + 1;
    return `Try searching: ${randomId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Pokédex Search</h1>
          <p className="text-white/80 mb-2">Enter a Pokémon name or ID to search</p>
          {totalPokemon && (
            <p className="text-white/90 text-sm">
              Total Pokémon available: <span className="font-bold">{totalPokemon}</span>
            </p>
          )}
        </div>

        <form onSubmit={searchPokemon} className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={getRandomPlaceholder()}
              className="w-full px-4 py-3 rounded-lg pl-12 bg-white/10 backdrop-blur-md text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Search className="absolute left-4 top-3.5 text-white/50" size={20} />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="text-center text-white bg-red-500/50 backdrop-blur-md p-4 rounded-lg max-w-md mx-auto">
            {error}
          </div>
        )}

        {pokemon && <PokemonCard pokemon={pokemon} />}
      </div>
    </div>
  );
}

export default App;