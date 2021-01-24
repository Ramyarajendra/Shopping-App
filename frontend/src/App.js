import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router} from 'react-router-dom';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import { Container } from '@material-ui/core';

function App() {
  return (
    <Router>
     <Header/>
     <main>
       <Container>
          <HomeScreen/>
       </Container>
     </main>
     <Footer/>
    </Router>
  );
}

export default App;
