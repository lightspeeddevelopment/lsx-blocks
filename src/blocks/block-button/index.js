/**
 * BLOCK: LSX Blocks Button
 */

// Import block dependencies and components
import classnames from "classnames";
import Inspector from "./components/inspector";
import CustomButton from "./components/button";
import icons from "./components/icons";

// Import CSS
import "./styles/style.scss";
import "./styles/editor.scss";

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	URLInput
} = wp.blockEditor;

// Register components
const { withFallbackStyles, Button, Dashicon } = wp.components;

class LSXButtonBlock extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		// Setup the attributes
		const {
			attributes: {
				buttonText,
				buttonUrl,
				buttonAlignment,
				buttonBackgroundColor,
				buttonShadowColor,
				buttonTextColor,
				buttonSize,
				buttonShape,
				buttonGhost,
				buttonLine,
				buttonHoverColor,
				buttonTarget
			},
			isSelected,
			className,
			setAttributes
		} = this.props;

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={buttonAlignment}
					onChange={value => {
						setAttributes({ buttonAlignment: value });
					}}
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				key={"lsx-button-inspector-" + this.props.clientId}
				{...this.props}
			/>,
			// Show the button markup in the editor
			<CustomButton key={"lsx-button-" + this.props.clientId} {...this.props}>
				<RichText
					tagName="span"
					placeholder={__("Button text...", "lsx-blocks")}
					keepPlaceholderOnFocus
					value={buttonText}
					formattingControls={[]}
					className={classnames(
						"lsx-button",
						buttonShape,
						buttonSize,
						"lsx-border" + buttonGhost
					)}
					style={{
						color: buttonTextColor,
						boxShadow: "2px 2px 0 0 " + buttonShadowColor,
						backgroundColor: buttonBackgroundColor
					}}
					onChange={value => setAttributes({ buttonText: value })}
				/>
			</CustomButton>,
			isSelected && (
				<form
					key="form-link"
					className={`blocks-button__inline-link lsx-button-${buttonAlignment}`}
					onSubmit={event => event.preventDefault()}
					style={{
						textAlign: buttonAlignment
					}}
				>
					<Dashicon icon={"admin-links"} />
					<URLInput
						autoFocus={true}
						className="button-url"
						value={buttonUrl}
						onChange={value => setAttributes({ buttonUrl: value })}
					/>
					<Button
						icon="editor-break"
						label={__("Apply", "lsx-blocks")}
						type="submit"
					/>
				</form>
			)
		];
	}
}

// Register the block
registerBlockType("lsx-blocks/lsx-button", {
	title: __("LSX Button", "lsx-blocks"),
	description: __("Add a customizable button.", "lsx-blocks"),
	icon: "admin-links",
	category: "lsx-blocks",
	keywords: [
		__("button", "lsx-blocks"),
		__("link", "lsx-blocks"),
		__("lsx", "lsx-blocks")
	],
	attributes: {
		buttonText: {
			type: "string"
		},
		buttonUrl: {
			type: "string",
			source: "attribute",
			selector: "a",
			attribute: "href"
		},
		buttonAlignment: {
			type: "string"
		},
		buttonBackgroundColor: {
			type: "string",
			default: "#418AD0"
		},
		buttonShadowColor: {
			type: "string",
			default: "#27639e"
		},
		buttonHoverColor: {
			type: "string",
			default: "#27639D"
		},
		buttonTextColor: {
			type: "string",
			default: "#ffffff"
		},
		buttonSize: {
			type: "string",
			default: "lsx-button-size-medium"
		},
		buttonShape: {
			type: "string",
			default: "lsx-button-shape-rounded"
		},
		buttonGhost: {
			type: "string",
			default: ""
		},
		buttonLine: {
			type: "string",
			default: "lsx-button-no-line"
		},
		buttonTarget: {
			type: "boolean",
			default: false
		}
	},

	// Render the block components
	edit: LSXButtonBlock,

	// Save the attributes and markup
	save: function(props) {
		// Setup the attributes
		const {
			buttonText,
			buttonUrl,
			buttonAlignment,
			buttonBackgroundColor,
			buttonShadowColor,
			buttonHoverColor,
			buttonTextColor,
			buttonSize,
			buttonShape,
			buttonGhost,
			buttonLine,
			buttonTarget
		} = props.attributes;

		var bgDefaultColour = buttonBackgroundColor;
		var bgHoverColour = buttonHoverColor;

		var textDefaultColour = buttonTextColor;
		var textHoverColour = buttonTextColor;

		if ("transparent" === buttonGhost) {
			bgDefaultColour = buttonBackgroundColor;
			bgHoverColour = buttonTextColor;

			textDefaultColour = buttonTextColor;
			textHoverColour = buttonBackgroundColor;
		}

		// Save the block markup for the front end
		return (
			<CustomButton {...props}>
				{// Check if there is button text and output
				buttonText && (
					<a
						href={buttonUrl}
						target={buttonTarget ? "_blank" : "_self"}
						className={classnames(
							"lsx-button",
							buttonShape,
							buttonSize,
							"lsx-border" + buttonGhost
						)}
						style={{
							color: buttonTextColor,
							boxShadow: "2px 2px 0 0 " + buttonShadowColor,
							backgroundColor: buttonBackgroundColor,
							borderColor: textDefaultColour
						}}
						data-on-bg-hover={bgHoverColour}
						data-off-bg-hover={bgDefaultColour}
						data-on-txt-hover={textHoverColour}
						data-off-txt-hover={textDefaultColour}
						onMouseEnter="this.style.backgroundColor=this.getAttribute('data-on-bg-hover');this.style.color=this.getAttribute('data-on-txt-hover');"
						onMouseLeave="this.style.backgroundColor=this.getAttribute('data-off-bg-hover');this.style.color=this.getAttribute('data-off-txt-hover');"
						rel="noopener noreferrer"
					>
						<RichText.Content value={buttonText} />
					</a>
				)}
			</CustomButton>
		);
	}
});
