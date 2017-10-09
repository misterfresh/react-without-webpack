import React from "react";
import ReactDOM from "react-dom";

import BarChart from "./barChart";
import PieChart from "./pieChart";

export default class Chart extends React.Component {
	constructor(props) {
		super(props);

		this.chartToClassMappings = {
			bar: BarChart,
			pie: PieChart
		};
	}

	componentDidMount() {
		if (Object.keys(this.props.data).length === 0) {
			return;
		}

		const el = ReactDOM.findDOMNode(this);

		if (this.props.type === "custom") {
			this.chart = new this.props.customChart(el, this.props);
		} else {
			this.chart = new this.chartToClassMappings[this.props.type](el, this.props);
		}

		this.chart.create(this.props.data);
	}

	componentDidUpdate() {
		this.chart.update(this.props.data);
	}

	componentWillUnmount() {
		this.chart.unmount();
	}

	render() {
		return (<div className="chart"></div>);
	}
}