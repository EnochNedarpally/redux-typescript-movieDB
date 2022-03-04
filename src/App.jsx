
import './App.scss';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import NotFound from './components/NotFound/NotFound';
function App() {
  return (
    <Router >
        <Header/>
          <div className='main'>
              <Routes>
                  <Route path ="/" exact element={<Home/>}/>
                  <Route path ="/movie/:id" exact element={<Movie/>}/>
                  <Route path="*" element={<NotFound/>}/>
              </Routes>
          </div>
        <Footer/>
    </Router>
  );
}

export default App;
