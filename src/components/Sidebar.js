import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import slug from 'slug';

// slug is an external library that we use to make our item snakecase
Sidebar.propTypes = {
	title: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
}

// returning a route because we need to use its built-in location checker via match. If location matches, make the link bold. If not, make it normal.
function CustomLink({ to, children }) {
	return (
			<Route path={to.pathname} children={({match}) => (
				<li style={{listStyleType: 'none', fontWeight: match ? 'bold' : 'normal'}}>
					<Link to={to}>{children}</Link>
				</li>
			)}
		/>
	)
}

// location and match from React Router
// instead of using NavLink, we are actually going to use a custom link component
export default function Sidebar({ title, list, loading, location, match}) {
	return loading === true ? <h1>LOADING</h1> :
	<div>
		<h3 className="header">{title}</h3>
		<ul className="sidebar-list">
			{list.map((item) => (
					<CustomLink key={item} to={{
						pathname: `${match.url}/${slug(item)}`,
						search: location.search
					}}
				>
					{item.toUpperCase()}
				</CustomLink>
			))}
		</ul>
	</div>
}
