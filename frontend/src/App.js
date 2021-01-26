import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import { Container } from '@material-ui/core';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <Router>
     <Header/>
     <main>
       <Container>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/product/:id' component={ProductScreen} />
          {/* '?' after id is used to make id optional in the url */}
          <Route path='/cart/:id?' component={CartScreen} /> 
       </Container>
     </main>
     <Footer/>
    </Router>
  );
}

export default App;
