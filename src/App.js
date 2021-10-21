import './App.css';
import Create from './components/create'
import Read from './components/read'
import Update from './components/update'
import { BrowserRouter as Router, Link, Route}  from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">React Crud Operations</h2>
        
        <Link to="/create">Go to Form</Link>
        
        <div>
          <Route exact path="/create" component= {Create} ></Route>
        </div>

        <div style={{marginTop:20}}>
          <Route exact path="/read" component= {Read} ></Route>
        </div>

        <div>
          <Route exact path="/update" component= {Update} ></Route>
        </div>

      </div>
    </Router>
  );
}

export default App;
