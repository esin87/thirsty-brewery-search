import React, { Component } from 'react';
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import About from './About';
import Results from './Results';
import Nav from './Nav';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameValue: '',
			cityValue: '',
			data: [],
			searchString: ''
		};
	}

	handleChange = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleSubmit = evt => {
		evt.preventDefault();
		const nameurl = `https://api.openbrewerydb.org/breweries?per_page=50&by_name=${this.state.nameValue}`;

		const cityurl = `https://api.openbrewerydb.org/breweries?per_page=50&by_city=${this.state.cityValue}`;

		if (evt.target.name === 'name') {
			fetch(nameurl)
				.then(response => response.json())
				.then(response => {
					this.setState({
						data: response,
						searchString: this.state.nameValue
					});
					this.clearSearch();
				})
				.then(() => this.props.history.push('/search'));
		} else {
			fetch(cityurl)
				.then(response => response.json())
				.then(response => {
					this.setState({
						data: response,
						searchString: this.state.cityValue
					});
					this.clearSearch();
				})
				.then(() => this.props.history.push('/search'));
		}
	};

	clearSearch = () => {
		this.setState({ nameValue: '', cityValue: '' });
	};

	render() {
		return (
			<>
				<header>
					<Link to='/'>
						<h1>thirsty</h1>
					</Link>
					<h3>
						local breweries, cideries, brewpubs, and bottleshops
					</h3>
				</header>
				<div className='page'>
					<nav>
						<Nav
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
							nameValue={this.state.nameValue}
							cityValue={this.state.cityValue}
						/>
						<Link to='/'>
							<h2 className='searchbar'>about</h2>
						</Link>
						<img
							className='keg'
							src='./images/keg.svg'
							alt='keg'></img>
					</nav>
					<main>
						<Switch>
							<Route path={'/'} exact component={About} />

							<Route
								path={'/search'}
								render={() => (
									<Results
										searchString={this.state.searchString}
										data={this.state.data}
									/>
								)}
							/>
						</Switch>
					</main>
				</div>
			</>
		);
	}
}

export default withRouter(App);
