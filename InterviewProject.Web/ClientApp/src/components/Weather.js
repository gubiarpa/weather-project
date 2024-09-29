import React, { Component } from 'react';

export class Weather extends Component {
	static displayName = Weather.name;

	constructor(props) {
		super(props);

		/// State
		this.state = {
			weather: {
				city: {
					coord: { lat: 0, lon: 0 },
					name: ''
				},
				list: [{
					dt: 0,
					main: {
						temp: 0
					}
				}]
			},
			loading: true
		};

		/// Binding
		this.handleRefreshClick = this.handleRefreshClick.bind(this);
	}

	componentDidMount() {
		this.populateWeatherData();
	}

	handleRefreshClick() {
		this.setState(
			{ loading: true },
			() => {
				this.populateWeatherData();
			})
	}

	convertTimestampToDateTime(timestamp) {
		const date = new Date(timestamp * 1000); // Crear un objeto Date a partir del timestamp

		const formattedDate = date.toLocaleDateString("en-US", {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});

		const formattedTime = date.toLocaleTimeString("en-US", {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false // Formato de 24 horas
		});

		return `${formattedDate} ${formattedTime}`;
	}

	renderForecastsTable(weather) {
		return (
			<>
				<div>
					<button className={'btn btn-outline-primary'} onClick={this.handleRefreshClick}>
						Refresh data
					</button>
				</div>
				<table className='table table-striped' aria-labelledby="tabelLabel">
					<thead>
						<tr>
							<th>Date</th>
							<th className="text-right">Temp. (C)</th>
							<th className="text-right">Pressure (ATM)</th>
							<th className="text-right">Humidity</th>
						</tr>
					</thead>
					<tbody>
						{
							weather.list.toSorted(({ dt }) => dt)
								.map(({ dt, main }) =>
									<tr key={dt}>
										<td>{this.convertTimestampToDateTime(dt)}</td>
										<td className="text-right">{main.temp.toFixed(2)}</td>
										<td className="text-right">{main.pressure}</td>
										<td className="text-right">{main.humidity}</td>
									</tr>
								)
						}
					</tbody>
				</table>
			</>
		);
	}

	render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: this.renderForecastsTable(this.state.weather);

		return (
			<div>
				<h1 id="tabelLabel" >Weather forecast</h1>
				<p>This component demonstrates fetching data from the server.</p>
				{contents}
			</div>
		);
	}

	async populateWeatherData() {
		const response = await fetch('weatherforecast');
		const data = await response.json();
		this.setState({ weather: data, loading: false });
	}
}
