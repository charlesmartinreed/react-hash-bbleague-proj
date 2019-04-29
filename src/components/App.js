import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Players from './Players';
import Teams from './Teams';
import Navbar from './Navbar';
import TeamPage from './TeamPage';

// be aware that loation of :teamId path matters. These switch conditionals fall through.
function App() {
  return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/players' component={Players} />
					<Route path='/teams' component={Teams} />
					<Route exact path='/:teamId' component={TeamPage} />
					<Route render={() => <h2 className='text-center'>It's the 404, boyz!</h2>} />
				</Switch>
			</div>
		</Router>
  );
}

export default App;
