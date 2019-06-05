import React, { Component } from "react";
import styled from "styled-components";
import { Box, Flex } from "rebass";

const Image = styled.img`
	margin: 0px 10px 0px 10px;
	height: 2rem;
	&:hover {
		cursor: pointer;
	}
`;

const Span = styled(Box)`
	&:hover {
		cursor: pointer;
	}
`;

class NewFile extends Component {
	handleClick = () => {
		window.open("/", "_blank");
	};
	render() {
		return (
			<Flex justifyContent="left" flexDirection="row" alignItems="center">
				<Box>
					<Image
						src={this.props.image}
						alt={this.props.alt}
						onClick={this.andleClick}
					/>
				</Box>

				{this.props.message ? (
					<Span onClick={this.handleClick}>{this.props.message}</Span>
				) : (
					""
				)}
			</Flex>
		);
	}
}

export default NewFile;
