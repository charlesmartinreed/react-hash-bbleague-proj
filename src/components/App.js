import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// dynamically load a module, once loaded pass that module to children
// .load invokes the passed in function, which, in this example, triggers an import
// the function called by load returns a promise, we need .then to handle to res. Then we simply set state, which causes a re-render.
// invoke the child function passed when DynamicImport is called, passing it the component that we got from mounting, will either be null or a component
class DynamicImport extends Component {
	state = {
		component: null
	}

	componentDidMount() {
		this.props.load()
			.then((mod) => this.setState(() => ({
				component: mod.default
			})))
	}

	render() {
		return this.props.children(this.state.component)
	}
}

// when invoked, dynamically import a module using the import syntax
// DynamicImport will receive a function as a props.children that will be invokved with the imported module or component
const Home = (props) => (
	<DynamicImport load={() => import('./Home')}>
		{(Component) => Component === null ? <h1>Loading!</h1> : <Component {...props} /> }
	</DynamicImport>
)

const Topics = (props) => (
	<DynamicImport load={() => import('./Topics')}>
		{(Component) => Component === null ? <h1>Loading!</h1> : <Component {...props} /> }
	</DynamicImport>
)

const Settings = (props) => (
	<DynamicImport load={() => import('./Settings')}>
		{(Component) => Component === null ? <h1>Loading!</h1> : <Component {...props} /> }
	</DynamicImport>
)

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<ul>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/topics'>Topics</Link></li>
						<li><Link to='/settings'>Settings</Link></li>
					</ul>

					<hr />

					<Route exact path='/' component={Home} />
					<Route path='/topics' component={Topics} />
					<Route path='/settings' component={Settings} />
				</div>
			</Router>
	  )
	}
}

export default App;
