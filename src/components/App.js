import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<div style={styles.fill}>

				<ul style={styles.nav}>
					<NavLink to="/hsl/10/90/50">Red</NavLink>
					<NavLink to="/hsl/120/100/40">Green</NavLink>
					<NavLink to="/rgb/33/150/243">Blue</NavLink>
					<NavLink to="/rgb/240/90/140">Pink</NavLink>
				</ul>

				<div style={styles.content}>
					<Route path='/hsl/:h/:s/:l' component={HSL} />
					<Route path='/rgb/:r/:g/:b' component={RGB} />
				</div>
			</div>
			</Router>
		)
	}
}

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
	color: 'white',
	paddingTop: '20px',
	fontSize: '30px'
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
