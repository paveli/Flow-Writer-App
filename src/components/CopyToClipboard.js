import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Button } from "rebass";
import Hotkeys from "react-hot-keys";

import Clipboard from "../includes/Clipboard";

const Image = styled.img`
	height: 2rem;
	width: 1.6rem;
	margin: 0px 10px 0px 10px;
	&:hover {
		cursor: pointer;
	}
`;

function mapStateToProps(state) {
	return {
		text: state.text,
		latestText: state.latestText
	};
}

class CopyToClipboard extends Component {
	handleClick = () => {
		Clipboard(
			this.props.text + this.props.latestText,
			"Your text is copied to clipboard. \nPaste it to your favorite editor."
		);
	};

	render() {
		return (
			<Hotkeys
				keyName="ctrl+c"
				onKeyUp={this.handleClick}
				filter={event => {
					return true;
				}}
			>
				<Button onClick={this.handleClick} bg="white" color="black" border="2">
					{this.props.image ? (
						<Image
							src={this.props.image}
							alt={this.props.alt}
							onClick={this.handleClick}
						/>
					) : (
						""
					)}
					{this.props.message ? this.props.message : ""}
				</Button>
			</Hotkeys>
		);
	}
}

export default connect(
	mapStateToProps,
	null
)(CopyToClipboard);
