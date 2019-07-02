import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "rebass";

function mapStateToProps(state) {
	return {
		text: state.text,
		latestText: state.latestText
	};
}

const StatisticsButton = styled(Button)`
	position: absolute;
	bottom: 0;
	right: 0;
	padding-left: 100%;
	opacity: 0;
	&:hover {
		opacity: 0.25;
	}
`;

class Statistics extends Component {
	words = 0;
	countWords = (text, latestText) => {
		return (
			text
				.replace(/\n/g, " ")
				.replace(/ +/g, " ")
				.split(" ").length -
			1 +
			(latestText ? 1 : 0)
		);
	};
	render() {
		return (
			<StatisticsButton
				disabled
				bg="inherit"
				color="black"
				border="0"
				borderRadius={0}
				fontSize={1}
			>
				{(this.words = this.countWords(
					this.props.text,
					this.props.latestText
				)) !== 0
					? this.words
					: ""}
				&nbsp;
				{this.words === 0 ? "" : this.words === 1 ? "word" : "words"}
			</StatisticsButton>
		);
	}
}

export default connect(
	mapStateToProps,
	null
)(Statistics);
