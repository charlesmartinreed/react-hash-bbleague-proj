import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getPlayers } from '../api';
import { parse } from 'query-string';
import slug from 'slug';


// in componentDidMount, we have access to location because React Router is being used to render our Players component
export default class Players extends Component {
	state = {
		players: [],
		loading: true,
	}

	fetchPlayers = (teamId) => {
		getPlayers(teamId)
			.then((players) => this.setState({
				players,
				loading: false,
			}))
	}
	/* if a query param, only get the players associated with that param value - i.e., if 'bulls', only get 'bulls' players. Else, just get all players */
	componentDidMount() {
		const { location } = this.props;

		location.search ? this.fetchPlayers(parse(location.search).teamId) : this.fetchPlayers()
	}

	/* render sidebar - this.props is spread into an object to pass along location, match..., once again, we get these props because Players is rendered by React Router... */
	render() {
		const { loading, players } = this.state;
		const { match, location } = this.props;

		return (
			<div className="container two-column">
				<Sidebar
				loading={loading}
				title='Players'
				list={players.map((player) => player.name)}
				{...this.props}
				/>

				{loading === false && location.pathname === '/players' ? <div className='sidebar-instruction'>Select a Player</div> : null}
			</div>
		)
	}
}
