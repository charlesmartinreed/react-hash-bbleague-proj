import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* Because we're animating our routes, we need to wrap that code in the TransitionGroup component. Now the component will keep track of the children and their changes, whether they're coming or going, etc. */
/*
	CSSTransition props:
	TIMEOUT is how long TransitionGroup will display all children before removing old children

	classNames is added to the component during prop change diffing

*/

/* by wrapping everything in a Route, we can get access to props. And beause we didn't give it a path, it will always render. */

/* Switch takes an optional location prop, we use that second location to let React know that we're transitioning. Otherwise, the route would neer know that there's a different location since we're using the passed in by the React Context API in our Route component */

class App extends Component {
	render() {
		return (
			<Router>
				<Route render={({location}) => (
					<div style={styles.fill}>
					<Route exact path='/' render={() => (
						<Redirect to='/hsl/10/90/50' />
					)} />

					<ul style={styles.nav}>
						<NavLink to="/hsl/10/90/50">Red</NavLink>
						<NavLink to="/hsl/120/100/40">Green</NavLink>
						<NavLink to="/rgb/33/150/243">Blue</NavLink>
						<NavLink to="/rgb/240/90/140">Pink</NavLink>
					</ul>

					<div style={styles.content}>
						<TransitionGroup>
							<CSSTransition
								key={location.key}
								timeout={300}
								classNames='fade'>
									<Switch location={location}>
										<Route exact path='/hsl/:h/:s/:l' component={HSL} />
										<Route exact path='/rgb/:r/:g/:b' component={RGB} />
										<Route render={() => <div>Not Found</div>} />
									</Switch>
							</CSSTransition>
						</TransitionGroup>
					</div>
				</div>
				)} />
			</Router>
		)
	}
}

/*
	TransitionGroup is like a wrapper component - a state machine for managing the mounting and unmounting of component. It's local state keeps track of all of its children. Whenever the props change, it loops over the children and compares the old children to the new children. Once it figures this out, it maps over the children and updates state for them with setState, which causes a re-render. Why does it render old and new children? Because of animations. The old child might need an animation OUT, a new child might need an animation IN.
*/

/*
	Takes all info from TransitionGroup and applies classNames to them during appear, exit stages of their transitions. You can use CSS selectors to then customize those classes, as usual.
*/

const NavLink = (props) => (
	<li style={styles.navItem}>
		<Link {...props} style={{color: 'inherit'}} />
	</li>
)
// grab the URL params from match, which will in turn give us the values to make our color

const HSL = ({ match}) => {
	const { params } = match;

	return (
		<div style={{
			...styles.hsl,
			background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
		}}>
			hsl({params.h}, {params.s}%, {params.l}%)
		</div>
	)
}

const RGB = ({match}) => {
	const { params } = match;

	return (
		<div style={{
			...styles.rgb,
			background: `rgb(${params.r}, ${params.g}, ${params.b})`
		}}>
			rgb({params.r}, {params.g}, {params.b})
		</div>
	)
}

const styles = {}

styles.fill = {
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0
}

styles.content = {
	...styles.fill,
	top: '40px',
	textAlign: 'center'
}

styles.hsl = {
	...styles.fill,
	color: 'white',
	paddingTop: '20px',
	fontSize: '30px'
}

styles.rgb = {
	...styles.fill,
	...styles.hsl
}

styles.nav = {
	padding: 0,
	margin: 0,
	position: 'absolute',
	top: 0,
	height: '40px',
	width: '100%',
	display: 'flex'
}

styles.navItem = {
	textAlign: 'center',
	flex: 1,
	listStyleType: 'none',
	padding: '10px'
}

export default App;
