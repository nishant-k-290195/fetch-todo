import './App.css';
import FetchedData from './pages/FetchedData'
import ManualData  from './pages/ManualData';
import {Route, Switch, Link} from 'react-router-dom'

function App() {
  return(
    <div className="App">
      <div>
        <Link to="fetchedData">Fetched Data</Link><br /><br />
        <Link to="manualData">Manual Data</Link><br /><br />
      </div>
      <div>
        <Switch>
          <Route path="/fetchedData"><FetchedData  /></Route>
          <Route path="/manualData"><ManualData /></Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;
