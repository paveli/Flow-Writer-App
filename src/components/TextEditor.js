import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import AutosizeInput from "./AutosizeInput";

import Clipboard from "../includes/Clipboard";
import Statistics from "./Statistics";

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
    font-size: 2.1rem;
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
	min-height: 2.1rem;

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
	font-size: 2.1rem;
	color: lightgrey;
	overflow: hidden;

	@media (max-width: 450px) {
		width: 95%;
	}
`;

const Wrapper = styled.div`
	background: white;
	width: 100%;
	height: 100%;
`;

class TextEditor extends Component {
	constructor(props) {
		super(props);
		this.editorRef = React.createRef();
	}

	state = {
		textParagraphCount: 0
	};

	componentDidUpdate() {
		if (this.props.title) {
			document.title = this.props.title;
		}

		if (window.onbeforeunload === null && this.props.text.length > 0) {
			window.onbeforeunload = function(e) {
				e = e || window.event;
				// For IE and Firefox prior to version 4
				if (e) {
					e.returnValue = "Don't forget to save (CTRL+C) your text.";
				}
				// For Safari
				return "Don't forget to save (CTRL+C) your text.";
			};
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
				latestText = latestText.trimRight() + "\n";
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
				id="TextEditor"
				onClick={() => {
					this.editorRef.current.focus({ preventScroll: false });
				}}
				onTouchEnd={() => {
					this.editorRef.current.focus({ preventScroll: false });
				}}
			>
				<PreviewWrapper>
					{this.props.text.split("\n").map((value, index) => {
						if (this.state.textParagraphCount !== index) {
							return (
								<Paragraph
									key={index}
									onTouchEnd={() => {
										Clipboard(
											this.props.text + this.props.latestText,
											"Your text is copied to clipboard. \nPaste it to your favorite editor."
										);
									}}
								>
									{value}
								</Paragraph>
							);
						} else {
							return (
								<Paragraph
									key={index}
									onTouchEnd={() => {
										Clipboard(
											this.props.text + this.props.latestText,
											"Your text is copied to clipboard. \nPaste it to your favorite editor."
										);
									}}
								>
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
				<Statistics />
			</Wrapper>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDisptchToProps
)(TextEditor);
