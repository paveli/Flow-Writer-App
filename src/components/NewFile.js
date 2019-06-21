import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "rebass";
import Hotkeys from "react-hot-keys";

const Image = styled.img`
	margin: 0px 10px 0px 10px;
	height: 2rem;
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
			<Hotkeys
				keyName="ctrl+shift+n"
				onKeyUp={this.handleClick}
				filter={event => {
					return true;
				}}
			>
				<Button onClick={this.handleClick} bg="white" color="black" border="2">
					{this.props.image ? (
						<Image src={this.props.image} alt={this.props.alt} />
					) : (
						""
					)}
					{this.props.message ? this.props.message : ""}
				</Button>
			</Hotkeys>
		);
	}
}

export default NewFile;
