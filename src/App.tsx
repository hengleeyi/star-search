import Home from './Home';
import { SearchProvider } from './components/SearchProvider';

const App = () => {
  return (
    <SearchProvider>
      <Home />
    </SearchProvider>
  );
};

export default App;
