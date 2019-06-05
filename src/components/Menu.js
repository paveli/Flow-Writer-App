import React, { Component } from "react";
import styled from "styled-components";
import CopyToClipboard from "./CopyToClipboard";
import NewFile from "./NewFile";

const MenuWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	width: 100%;
`;

// const MenuWrapper = styled.div`
// 	position: absolute;
// 	left: 10px;
// 	float: right;
// 	width: 150px;
// 	height: 100%;
// 	z-index: 1;
// 	background: white;
// 	filter: opacity(0%);
// 	&:hover {
// 		filter: opacity(100%);
// 	}
// `;

const MenuItems = styled.div`
	margin: 25px;
	padding: 10px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	background: #eee;
	font-size: 1.5rem;
	filter: opacity(30%);
	&:hover {
		filter: opacity(60%);
	}
`;

export default class Menu extends Component {
	render() {
		return (
			<MenuWrapper>
				<MenuItems>
					{/* <HeadingOne title="Distraction-free writing app">Flow</HeadingOne> */}
					<NewFile image="new.svg" alt="New text" message="New" />

					<CopyToClipboard
						image="copy.svg"
						alt="Copy text to clipboard"
						message="Copy"
					/>
				</MenuItems>
			</MenuWrapper>
		);
	}
}
