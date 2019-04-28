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

	/* render the specific player when the user is at the corresponding route */
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

				<Route path={`${match.url}/:playerId`} render={({match}) => {
					if (loading === true) return null

					const { name, position, teamId, number, avatar, apg, ppg, rpg, spg, } = players.find((player) => slug(player.name) === match.params.playerId)

					return (
						<div className="panel">
							<img className="avatar" src={`${avatar}`} alt={`${name}'s avatar`} />
							<h1 className="medium-header">{name}</h1>
							<h3 className="header">#{number}</h3>
							<div className="row">
								<ul className="info-list" style={{marginRight: 80}}>
									<li>Team
										<div>
											<Link style={{color: '#68809a'}} to={`/${teamId}`}>{teamId[0].toUpperCase() + teamId.slice(1)}
											</Link>
										</div>
									</li>
									<li>Position<div>{position}</div></li>
									<li>PPG<div>{ppg}</div></li>
								</ul>
								<ul className='info-list'>
									<li>APG<div>{apg}</div></li>
									<li>SPG<div>{spg}</div></li>
									<li>RPG<div>{rpg}</div></li>
								</ul>
							</div>
						</div>
					)

				}} />
			</div>
		)
	}
}
