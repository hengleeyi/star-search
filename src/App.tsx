import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import { SearchProvider } from './components/SearchProvider';
import CategoryPage from './CategoryPage';

const Categories = () => {
  return (
    <Routes>
      {/* <Route index element={<h1>Blog Index</h1>} /> */}
      <Route path=":categoryName" element={<CategoryPage/>} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SearchProvider>
              <Home />
            </SearchProvider>
          }
        />
        <Route path="/categories/*" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
