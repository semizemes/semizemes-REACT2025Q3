export interface PokemonListItem {
  name: string;
  url: string;
}

export interface DisplayProps {
  searchTerm: string;
}

export interface DisplayState {
  data: {
    results: PokemonListItem[];
  };
  loading: boolean;
  error: string | null;
}

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface AppState {
  searchTerm: string;
}
