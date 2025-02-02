import React from 'react';
import { Pokemon } from '../types';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-white/20">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-48 h-48 flex-shrink-0">
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white capitalize">
                {pokemon.name}
              </h2>
              <span className="text-white/80">#{pokemon.id.toString().padStart(3, '0')}</span>
            </div>

            <div className="flex gap-2 mb-4">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`${typeColors[type]} px-3 py-1 rounded-full text-white text-sm capitalize`}
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-white/80">
              <div>
                <span className="block text-sm">Height</span>
                <span className="font-medium">{pokemon.height}m</span>
              </div>
              <div>
                <span className="block text-sm">Weight</span>
                <span className="font-medium">{pokemon.weight}kg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-white font-medium mb-3">Base Stats</h3>
          <div className="grid gap-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.name}>
                <div className="flex justify-between text-sm text-white/80 mb-1">
                  <span className="capitalize">{stat.name.replace('-', ' ')}</span>
                  <span>{stat.value}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(stat.value / 255) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;