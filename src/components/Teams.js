import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getTeamNames } from '../api';

import { parse } from 'query-string';
import slug from 'slug';

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

			</div>
		)
	}
}
