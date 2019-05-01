import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Link,
	Route,
	Redirect
} from 'react-router-dom';

// fake auth service
const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true
		setTimeout(cb, 100) // fake async
	},
	signOut(cb) {
		this.isAuthenticated = false
		setTimeout(cb, 100) // again, fake async
	}
}

// rendered components - only showing protected when user is authenticated, otherwise redirect to login

const Public = () => <h3>PUBLIC! 👋🏾</h3>
const Protected = () => <h3>PROTECTED! 🤫</h3>

class Login extends React.Component {
	state = {
		redirectToReferrer: false
	}

	login = () => {
		fakeAuth.authenticate(() => {
			this.setState(() => ({
				redirectToReferrer: true
			}))
		})
	}

	render() {
		const { redirectToReferrer } = this.state;
		const { from } = this.props.location.state || { from: {
			pathname: '/'} };

		if (redirectToReferrer === true) {
			return (
				<Redirect to={from} />
			)
		}

		return (
			<div>
				<p>You must be logged in to view this page {from.pathname}</p>
				<button onClick={this.login}>Log in</button>
			</div>
		)
	}
}

// of course, since React Router doesn't come with a PrivateRoute component, we'll have to build it ourselves, from the Route component
// when path matches the path passed to private route, render a function. If not authenticated, will redirect user to the protected page.
// {... props} are the components passed by Route, like location, match...
// we're passing an object with props.location since this is where the user was attempting to navigate to before authentication
const PrivateRoute = ({component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		fakeAuth.isAuthenticated === true
		? <Component {...props} />
		: <Redirect to={{
			pathname: '/login',
			state: { from: props.location }
		}}/>
	)} />
)

class App extends Component {
	render() {
		return (
			<Router>
			<div>
				<ul>
					<li><Link to='/public'>Public Page</Link></li>
					<li><Link to='/protected'>Protected Page</Link></li>
				</ul>

				<Route path='/public' component={Public} />
				<Route path='/login' component={Login} />
				<PrivateRoute path='/protected' component={Protected} />
			</div>
			</Router>
		)
	}
}

export default App;
