/* eslint-disable no-restricted-globals */
//Styles
import './Styles/main.scss';

//Import Pages
import Home from './Pages/home';
import Labels from './Pages/labels';
import Datasets from './Pages/datasets';
import Results from './Pages/results';

//Router
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

//Third-party libraries
import { AnimatePresence } from 'framer-motion';

const App = () => {
  return (
    <Router>
      <div className="App">
        <AnimatePresence>
          <Switch>
            <Route component={Home} exact path="/"/>
            <Route component={Labels} exact path="/name-labels"/>
            <Route component={Datasets} exact path="/datasets"/>
            <Route component={Results} exact path="/results"/>
          </Switch>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
