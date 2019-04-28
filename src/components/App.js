import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Players from './Players';
import Teams from './Teams';
import Navbar from './Navbar'

function App() {
  return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/players' component={Players} />
					<Route path='/teams' component={Teams} />
					<Route render={() => <h3 className='text-center'>It's the 404, boyz!</h3>} />
				</Switch>
			</div>
		</Router>
  );
}

export default App;
