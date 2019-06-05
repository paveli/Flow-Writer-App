import React, { Component } from "react";
import { connect } from "react-redux";
import clipboard from "clipboard-polyfill";
import styled from "styled-components";
import { Box, Flex } from "rebass";

const Image = styled.img`
	height: 2rem;
	width: 1.6rem;
	margin: 0px 10px 0px 10px;
	&:hover {
		cursor: pointer;
	}
`;

const Span = styled(Box)`
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
		clipboard.writeText(this.props.text + this.props.latestText).then(res => {
			alert(
				"Your text is copied to clipboard. \nPaste it to your favorite editor."
			);
		});
	};

	render() {
		return (
			<Flex>
				{this.props.image ? (
					<Box>
						<Image
							src={this.props.image}
							alt={this.props.alt}
							onClick={this.handleClick}
						/>
					</Box>
				) : (
					""
				)}
				{this.props.message ? (
					<Span onClick={this.handleClick}>{this.props.message}</Span>
				) : (
					""
				)}
			</Flex>
		);
	}
}

export default connect(
	mapStateToProps,
	null
)(CopyToClipboard);
