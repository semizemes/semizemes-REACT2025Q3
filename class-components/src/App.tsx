import React from 'react';
import SearchBar from './components/SearchBar';
import Display from './components/Display';
import ErrorBoundary from './components/ErrorBoundary';
import type { AppState } from './types/Types';

export default class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.triggerError = this.triggerError.bind(this);
  }

  handleSearch(searchTerm: string): void {
    this.setState({ searchTerm });
  }

  triggerError(): void {
    throw new Error('This is a test error from the error button!');
  }

  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <div className="app-container">
          <h1>Welcome to Class Component Task</h1>
          <SearchBar onSearch={this.handleSearch} />
          <Display searchTerm={this.state.searchTerm} />
          <button className="error-button" onClick={this.triggerError}>
            Trigger Error
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}
