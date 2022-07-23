import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import SearchPage from './pages/SearchPage/SearchPage';
import DetailPage from './pages/DetailPage/DetailPage';
import BookmarksPage from './pages/BookmarksPage/BookmarksPage';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-primary fixed-bottom mt-5 justify-content-between">
          <div className="container">
            <Link to="/" className="navbar-brand font-weight-bold">AsianCountryList</Link>
              <Link to="/" className="nav-item text-light">Home</Link>
              <Link to="/search" className="nav-item text-light">Search by Code</Link>
              <Link to="/bookmarks" className="nav-item text-light">Country Bookmarks</Link>
          </div>
          
        </nav>

        <Routes>
          <Route exact path='/detail/:code' element={<DetailPage/>}></Route>
          <Route exact path='/search' element={<SearchPage/>}></Route>
          <Route exact path='/bookmarks' element={<BookmarksPage/>}></Route>
          <Route exact path='/' element={<HomePage/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

