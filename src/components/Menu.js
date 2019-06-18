import React, { Component } from "react";
import styled from "styled-components";

const MenuWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;

const Logo = styled.div`
	align-self: flex-start;
	margin: 25px;
	padding: 10px;
	font-size: 1.5rem;
	width: 32px;
	height: 32px;
	filter: opacity(20%);
	&:hover {
		filter: opacity(100%);
	}
`;

export default class Menu extends Component {
	render() {
		return (
			<MenuWrapper>
				<Logo>
					<img
						width="32"
						src="/flow-icon.svg"
						alt="Flow Writer App"
						title="Flow Writer App | CTRL+C to copy text | CRTL+N to start new text"
					/>
				</Logo>
			</MenuWrapper>
		);
	}
}
