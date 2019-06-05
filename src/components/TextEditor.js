import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import AutosizeInput from "./AutosizeInput";

import { updateText, updateLatestText, updateTitle } from "../store/actions";

function mapDisptchToProps(dispatch) {
	return {
		updateText: newText => dispatch(updateText(newText)),
		updateLatestText: latestText => dispatch(updateLatestText(latestText)),
		updateTitle: newTitle => dispatch(updateTitle(newTitle))
	};
}

function mapStateToProps(state) {
	return {
		text: state.text,
		latestText: state.latestText,
		title: state.title
	};
}

const Editor = styled(AutosizeInput)`
    border: 0px;
    margin: 0px;
    padding: 0px;
    outline: none;
    font-size: 2rem;
	caret-color: deepskyblue;


    &:focus {
        border: 0px;
        margin: 0px;
        padding: 0px
        outline: none;
	}
	
	// Also search for "Quickfix" in AutosizeInput component source
`;

const Paragraph = styled.p`
	display: block;
	width: 100%;
	min-height: 2rem;

	&:last-of-type {
		width: auto;
		display: inline;
	}
`;

const PreviewWrapper = styled.div`
	position: absolute;
	left: 50%;
	top: 0;
	transform: translate(-50%, 0);

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-content: flex-end;
	align-items: flex-end;

	width: 70%;
	max-width: 1000px;
	height: 50%;
	font-size: 2rem;
	color: lightgrey;
	overflow: hidden;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

class TextEditor extends Component {
	constructor(props) {
		super(props);
		this.editorRef = React.createRef();
	}

	state = {
		// text: "",
		// latestText: "",
		textParagraphCount: 0
	};

	componentDidUpdate() {
		console.log("componentDidUpdate");
		if (this.props.title) {
			document.title = this.props.title;
		}
	}

	updateEditor = event => {
		// event.persist(); // Use it for debugging purposes only
		let latestText = event.target.value;

		if (latestText === " ") {
			latestText = "";
		}

		this.props.updateLatestText({
			latestText: latestText
		});
	};

	updateText = event => {
		let keyPressed = event.which;

		// Check if Enter (13) or Space (32) were pressed
		if (keyPressed === 13 || keyPressed === 32) {
			let latestText = event.target.value + " ";
			let paragpraphIncerement = 0;

			if (this.props.title.split(" ").length <= 5) {
				this.props.updateTitle({
					title: this.props.title + latestText
				});
			}

			if (keyPressed === 13) {
				latestText += "\n ";
				paragpraphIncerement++;
			}

			this.setState(currentState => {
				this.props.updateText({
					text: this.props.text + latestText,
					latestText: ""
				});
				return {
					textParagraphCount:
						currentState.textParagraphCount + paragpraphIncerement
				};
			});
		}
	};

	render() {
		return (
			<Wrapper
				onClick={() => {
					this.editorRef.current.focus({ preventScroll: false });
				}}
			>
				<PreviewWrapper>
					{this.props.text.split("\n").map((value, index) => {
						if (this.state.textParagraphCount !== index) {
							return <Paragraph key={index}>{value}</Paragraph>;
						} else {
							return (
								<Paragraph key={index}>
									{value}
									<Editor
										ref={this.editorRef}
										onChange={this.updateEditor}
										onKeyDown={this.updateText}
										value={this.props.latestText}
										autoFocus
									/>
								</Paragraph>
							);
						}
					})}
				</PreviewWrapper>
			</Wrapper>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDisptchToProps
)(TextEditor);
