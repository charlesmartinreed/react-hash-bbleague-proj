import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getTeamNames } from '../api';
import TeamLogo from './TeamLogo';
import Team from './Team';

export default class Teams extends Component {
	state = {
		teamNames: [],
		loading: true,
	}

	componentDidMount() {
		getTeamNames()
			.then((teamNames) => {
				this.setState(() => ({
					teamNames,
					loading: false
				}))
			})
	}

	/* in our route, we render a Team component. If team is null, we are fetching and we need to display a Loading notice. If team is retrieve, build out the UI with the team info. */
	render() {
		const { teamNames, loading } = this.state;
		const { location, match } = this.props;

		return (
			<div className="container two-column">
				<Sidebar
					loading={loading}
					title='Teams'
					list={teamNames}
					{...this.props}
				/>

				{loading === false && location.pathname === '/teams' ? <div className='sidebar-instruction'>Select a Team</div> : null}

				<Route path={`${match.url}/:teamId`} render={({match}) => (
					<div className="panel">
						<Team id={match.params.teamId}>
							{(team) => team === null ? <h1>LOADING</h1> : <div style={{width: '100%'}}>
								<TeamLogo id={team.id} className="center" />
								</div>}
						</Team>
					</div>
				)}/>

			</div>
		)
	}
}
