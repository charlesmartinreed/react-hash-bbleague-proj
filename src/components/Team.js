import { Component } from 'react';
import PropTypes from 'prop-types';
import { getTeam }  from '../api';

// not importing React since we're not actually using JSX
// when we use Team, we pass in an id and a function
// what are we rendering? Remember that we pass in a function as a child to this component, so we need to invoke it, using the team contained within our state.
export default class Team extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		children: PropTypes.func.isRequired,
	}

	state = {
		team: null
	}

	fetchTeam = (id) => {
		this.setState(() => ({
			team: null
		}))

		getTeam(id)
			.then((team) => this.setState(() => ({team})))
	}
	/* because we're not unmounting and mounting a new component when the user selects a new team, we compare old props to new ones and trigger a new fetch if they are different */
	componentWillReceiveProps(nextProps) {
		if (this.props.id !== nextProps.id) {
			this.fetchTeam(nextProps.id)
		}
	}

	componentDidMount() {
		this.fetchTeam(this.props.id)
	}

	render() {
		return this.props.children(this.state.team)
	}
}
