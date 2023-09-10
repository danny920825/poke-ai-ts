export type Generation = {
  abilities:       any[];
  id:              number;
  main_region:     MainRegion;
  moves:           MainRegion[];
  name:            string;
  names:           Name[];
  pokemon_species: MainRegion[];
  types:           MainRegion[];
  version_groups:  MainRegion[];
}

export type MainRegion = {
  name: string;
  url:  string;
}

export type Name = {
  language: MainRegion;
  name:     string;
}
