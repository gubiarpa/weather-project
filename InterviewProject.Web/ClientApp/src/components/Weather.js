import React, { Component } from 'react';

export class Weather extends Component {
	static displayName = Weather.name;

	constructor(props) {
		super(props);

		/// State
		this.state = {
			input: {
				lat: 0,
				lon: 0
			},
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
		this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
		this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
	}

	/// Handlers
	handleRefreshClick() {
		this.setState(
			{ loading: true },
			() => {
				this.populateWeatherData();
			})
	}

	handleLatitudeChange(e) {
		e.preventDefault()
		this.setState({
			input: {
				...this.state.input,
				lat: e.target.value
			},
			weather: {
				...this.state.weather
			}
		})
	}

	handleLongitudeChange(e) {
		e.preventDefault()
		this.setState({
			input: {
				...this.state.input,
				lon: e.target.value
			},
			weather: {
				...this.state.weather
			}
		})

	}

	/// Utils
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

	async populateWeatherData() {
		const response = await fetch('weatherforecast');
		const data = await response.json();
		this.setState({ weather: data, loading: false });
	}

	/// Render Utils
	renderForecastsControl() {
		return (
			<>
				<div className={'mb-4 input-group'}>
					{/* Latitude */}
					<span className="input-group-text" style={{ borderRadius: '0.25rem 0 0 0.25rem', borderRight: 'none' }}>Latitude</span>
					<input
						type="text"
						className="form-control"
						aria-label="Latitude"
						style={{ borderRadius: '0', borderRight: 'none' }}
						value={this.state.input.lat}
						onChange={this.handleLatitudeChange}
					/>
					{/* Longitude */}
					<span className="input-group-text" style={{ borderRadius: '0', borderRight: 'none' }}>Longitude</span>
					<input
						type="text"
						className="form-control"
						aria-label="Longitude"
						value={this.state.input.lon}
						onChange={this.handleLongitudeChange}
					/>
					{/* Retrieve */}
					<button
						type="button"
						className={'btn btn-secondary'}
						onClick={this.handleRefreshClick}
						style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
					>
						Refresh data
					</button>
				</div>
			</>
		)
	}

	renderForecastsTable(weather) {
		return (
			<>
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

	/// Life Cycle
	componentDidMount() {
		this.populateWeatherData();
	}

	render() {
		return (
			<div>
				<h1 id="tabelLabel" className={'mb-4'}>Weather forecast</h1>
				{this.renderForecastsControl()}
				{
					this.state.loading
						? <p><em>Loading...</em></p>
						: this.renderForecastsTable(this.state.weather)
				}
			</div>
		);
	}
}
