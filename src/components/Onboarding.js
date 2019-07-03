import React, { Component } from "react";
import { Card, Button } from "rebass";
import styled from "styled-components";
import { connect } from "react-redux";
import { Twitter, Github, Telegram, Medium } from "styled-icons/boxicons-logos";
import { GrinWink, Keyboard } from "styled-icons/fa-regular";
import * as Cookies from "js-cookie";

import CopyToClipboard from "./CopyToClipboard";
import NewFile from "./NewFile";

function mapStateToProps(state) {
	return {
		text: state.text,
		latestText: state.latestText,
		title: state.title
	};
}

const Message = styled(Card)`
	position: absolute;
	left: 50%;
	top: 0;
	transform: translate(-50%, 0);
	width: 71%;

	max-width: 1000px;
	visibility: ${props => (props.visibility ? props.visibility : "visible")};
	opacity: ${props => (props.visibility === "visible" ? 1 : 0)};
	transition: opacity 500ms linear, visibility 0s linear 500ms;

	@media (max-width: 450px) {
		width: 95%;
		transform: translate(-50%, 0);
		margin-top: 3px;
		margin-bottom: 3px;
	}
`;

const TwitterIcon = styled(Twitter)`
	margin-right: -3px;
	&:hover {
		color: #38a1f3;
	}
`;

const GithubIcon = styled(Github)`
	&:hover {
		color: black;
	}
`;

const TelegramIcon = styled(Telegram)`
	&:hover {
		color: #0088cc;
	}
`;

const MediumIcon = styled(Medium)`
	&:hover {
		color: black;
	}
`;

class Onboarding extends Component {
	constructor(props) {
		super(props);
		this.startButtonRef = React.createRef();
	}

	state = {
		showOnboarding: "true"
	};
	CheckCookie = () => {
		this.setState({ showOnboarding: Cookies.get("showOnboarding") });
	};

	// Currently Onboarding should be shown every time the App opens
	// SetCookie = () => {
	// 	Cookies.set("showOnboarding", "false");
	// };

	componentWillMount() {
		this.CheckCookie();
		// Currently Onboarding should be shown every time the App opens
		//this.SetCookie(); // Just set cookie to "true" when component mounts. This cookie lifitime - current browser session.
	}

	render() {
		return (
			<Message
				visibility={
					this.props.text.length > 0 ||
					this.props.latestText.length > 0 ||
					this.state.showOnboarding === "false"
						? "hidden"
						: "visible"
				}
				fontSize={3}
				fontWeight="bold"
				width="70px"
				p={5}
				my={6}
				bg="white"
				borderRadius={8}
				boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
			>
				<p style={{ textAlign: "center" }}>
					<NewFile
						image="new.svg"
						alt="New text"
						message="New text (ctrl+shift+n)"
					/>{" "}
					<CopyToClipboard
						image="copy.svg"
						alt="Copy text to clipboard"
						message="Copy text (ctrl+shift+c)"
					/>
				</p>
				<br />

				<p>Welcome to Flow Writer App!</p>
				<h1
					style={{
						fontSize: "20px",
						marginBottom: "1rem",
						fontWeight: "normal"
					}}
				>
					Flow &mdash; distraction-free writer, which helps to stay focused
					while writing texts.
				</h1>
				<p>
					Start writing. Move forward. Don't edit (and you can't{" "}
					<GrinWink size="22" color="grey" />
					).
				</p>
				<p>
					Once finished writing, press CTRL+SHIFT+C to copy text to clipboard.
					Then paste and edit in your favorite editor.
				</p>
				<br />

				<p style={{ textAlign: "center" }}>
					<Button
						ref={this.startButtonRef}
						onClick={() => {
							this.setState({ showOnboarding: "false" });
							let TextEditor = document.getElementById("TextEditor");
							if (TextEditor.requestFullscreen) {
								TextEditor.requestFullscreen().then(resolve => {
									document
										.getElementById("currentInput")
										.focus({ preventScroll: false });
								});
							}
							document
								.getElementById("currentInput")
								.focus({ preventScroll: false });
						}}
						bg="deepskyblue"
					>
						Ok, start writing...{" "}
						<Keyboard size="30" style={{ verticalAlign: "-.45em" }} />
					</Button>
				</p>

				<p style={{ textAlign: "right" }}>
					<a href="https://medium.com/@paveli/write-in-flow-edit-later-406fc74a4689">
						<MediumIcon size="30" color="grey" />
					</a>{" "}
					<a href="https://twitter.com/paveli" target="blank">
						<TwitterIcon size="30" color="grey" />
					</a>{" "}
					<a href="https://t.me/paveliv" target="blank">
						<TelegramIcon size="30" color="grey" />
					</a>{" "}
					<a href="https://github.com/paveli/Flow-Writer-App" target="blank">
						<GithubIcon size="30" color="grey" />
					</a>
				</p>
			</Message>
		);
	}
}

export default connect(
	mapStateToProps,
	null
)(Onboarding);
