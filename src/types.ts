export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  stats: {
    name: string;
    value: number;
  }[];
  height: number;
  weight: number;
}