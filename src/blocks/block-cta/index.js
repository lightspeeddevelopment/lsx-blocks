/**
 * BLOCK: LSX Blocks Call-To-Action
 */

// Import block dependencies and components
import classnames from "classnames";
import Inspector from "./components/inspector";
import CallToAction from "./components/cta";

// Import CSS
import "./styles/style.scss";
import "./styles/editor.scss";
import Container from "../block-container/components/container";

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	AlignmentToolbar,
	URLInput,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	RichText
} = wp.blockEditor;

// Register components
const { withFallbackStyles, Button, Dashicon, Toolbar } = wp.components;

const blockAttributes = {
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
		type: "string",
		default: "center"
	},
	buttonBackgroundColor: {
		type: "string",
		default: "#418ad0"
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
	buttonTarget: {
		type: "boolean",
		default: false
	},
	ctaTitle: {
		type: "array",
		selector: ".lsx-cta-title",
		source: "children"
	},
	ctaTitleFontSize: {
		type: "string",
		default: "32"
	},
	ctaTextFontSize: {
		type: "string",
		default: "20"
	},
	ctaText: {
		type: "array",
		selector: ".lsx-cta-text",
		source: "children"
	},
	ctaWidth: {
		type: "string",
		default: "center"
	},
	ctaBackgroundColor: {
		type: "string",
		default: "#f2f2f2"
	},
	ctaTextColor: {
		type: "string",
		default: "#32373c"
	},
	imgURL: {
		type: "string",
		source: "attribute",
		attribute: "src",
		selector: "img"
	},
	imgID: {
		type: "number"
	},
	imgAlt: {
		type: "string",
		source: "attribute",
		attribute: "alt",
		selector: "img"
	},
	dimRatio: {
		type: "number",
		default: 100
	},
	//V2 Attributes
	blockPadding: {
		type: "string",
		default: "5% 3%"
	},
	blockMargin: {
		type: "string",
		default: "0 auto"
	}
};

const deprecatedBlockAttributes = {
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
		type: "string",
		default: "center"
	},
	buttonBackgroundColor: {
		type: "string",
		default: "#418ad0"
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
	buttonTarget: {
		type: "boolean",
		default: false
	},
	ctaTitle: {
		type: "array",
		selector: ".lsx-cta-title",
		source: "children"
	},
	ctaTitleFontSize: {
		type: "string",
		default: "32"
	},
	ctaTextFontSize: {
		type: "string",
		default: "20"
	},
	ctaText: {
		type: "array",
		selector: ".lsx-cta-text",
		source: "children"
	},
	ctaWidth: {
		type: "string",
		default: "center"
	},
	ctaBackgroundColor: {
		type: "string",
		default: "#f2f2f2"
	},
	ctaTextColor: {
		type: "string",
		default: "#32373c"
	},
	imgURL: {
		type: "string",
		source: "attribute",
		attribute: "src",
		selector: "img"
	},
	imgID: {
		type: "number"
	},
	imgAlt: {
		type: "string",
		source: "attribute",
		attribute: "alt",
		selector: "img"
	},
	dimRatio: {
		type: "number",
		default: 100
	},
	//V2 Attributes
	blockPadding: {
		type: "string",
		default: "5% 3%"
	},
	/* ===== DEPRECATED ATTRIBUTES ===== */
	blockMargin: {
		type: "string",
		default: "0 0 1.2em 0"
	}
};

class LSXCTABlock extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
				buttonText,
				buttonUrl,
				buttonAlignment,
				buttonBackgroundColor,
				buttonShadowColor,
				buttonHoverColor,
				buttonTextColor,
				buttonSize,
				buttonShape,
				buttonTarget,
				ctaTitle,
				ctaText,
				ctaTitleFontSize,
				ctaTextFontSize,
				ctaWidth,
				ctaBackgroundColor,
				ctaTextColor,
				imgURL,
				imgID,
				imgAlt,
				dimRatio
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes({
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt
			});
		};

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<BlockAlignmentToolbar
					value={ctaWidth}
					onChange={ctaWidth => setAttributes({ ctaWidth })}
					controls={["center", "wide", "full"]}
				/>
				<AlignmentToolbar
					value={buttonAlignment}
					onChange={value => {
						setAttributes({ buttonAlignment: value });
					}}
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector key="inspectors" {...{ setAttributes, ...this.props }} />,
			// Show the button markup in the editor
			<CallToAction key="cta" {...this.props}>
				{imgURL && !!imgURL.length && (
					<div className="lsx-cta-image-wrap">
						<img
							className={classnames(
								"lsx-cta-image",
								dimRatioToClass(dimRatio),
								{
									"has-background-dim": dimRatio !== 0
								}
							)}
							src={imgURL}
							alt={imgAlt}
						/>
					</div>
				)}

				<div className="lsx-cta-content">
					<RichText
						tagName="h2"
						placeholder={__("Call-To-Action Title", "lsx-blocks")}
						keepPlaceholderOnFocus
						value={ctaTitle}
						className={classnames(
							"lsx-cta-title",
							"lsx-font-size-" + ctaTitleFontSize
						)}
						style={{
							color: ctaTextColor
						}}
						onChange={value => setAttributes({ ctaTitle: value })}
					/>
					<RichText
						tagName="div"
						multiline="p"
						placeholder={__("Call To Action Text", "lsx-blocks")}
						keepPlaceholderOnFocus
						value={ctaText}
						className={classnames(
							"lsx-cta-text",
							"lsx-font-size-" + ctaTextFontSize
						)}
						style={{
							color: ctaTextColor
						}}
						onChange={value => setAttributes({ ctaText: value })}
					/>
				</div>
				<div className="lsx-cta-button">
					<RichText
						tagName="span"
						placeholder={__("Button text...", "lsx-blocks")}
						value={buttonText}
						formattingControls={[]}
						className={classnames("lsx-button", buttonShape, buttonSize)}
						style={{
							color: buttonTextColor,
							backgroundColor: buttonBackgroundColor,
							boxShadow: "2px 2px 0 0 " + buttonShadowColor,
							borderColor: buttonBackgroundColor
						}}
						onChange={value => setAttributes({ buttonText: value })}
					/>
					{isSelected && (
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
					)}
				</div>
			</CallToAction>
		];
	}
}

function dimRatioToClass(ratio) {
	return ratio === 0 || ratio === 50
		? null
		: "has-background-dim-" + 10 * Math.round(ratio / 10);
}

function backgroundImageStyles(url) {
	return url ? { backgroundImage: `url(${url})` } : undefined;
}

// Register the block
registerBlockType("lsx-blocks/lsx-cta", {
	title: __("LSX Call To Action", "lsx-blocks"),
	description: __(
		"Add a call to action section with a title, text, and a button.",
		"lsx-blocks"
	),
	icon: "megaphone",
	category: "lsx-blocks",
	keywords: [
		__("call to action", "lsx-blocks"),
		__("cta", "lsx-blocks"),
		__("lsx", "lsx-blocks")
	],

	attributes: blockAttributes,

	getEditWrapperProps({ ctaWidth }) {
		if ("center" === ctaWidth || "wide" === ctaWidth || "full" === ctaWidth) {
			return { "data-align": ctaWidth };
		}
	},

	// Render the block components
	edit: LSXCTABlock,

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
			buttonTarget,
			ctaTitle,
			ctaText,
			ctaTitleFontSize,
			ctaTextFontSize,
			ctaWidth,
			ctaBackgroundColor,
			ctaTextColor,
			imgURL,
			imgID,
			imgAlt,
			dimRatio,
			//V2 Attributes
			blockPadding,
			blockMargin
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<CallToAction {...props}>
				{imgURL && (
					<div className="lsx-cta-image-wrap">
						<img
							className={classnames(
								"lsx-cta-image",
								dimRatioToClass(dimRatio),
								{
									"has-background-dim": dimRatio !== 0
								}
							)}
							src={imgURL}
							alt={imgAlt}
						/>
					</div>
				)}

				<div className="lsx-cta-content">
					{ctaTitle && (
						<RichText.Content
							tagName="h2"
							className={classnames(
								"lsx-cta-title",
								"lsx-font-size-" + ctaTitleFontSize
							)}
							style={{
								color: ctaTextColor
							}}
							value={ctaTitle}
						/>
					)}
					{ctaText && (
						<RichText.Content
							tagName="div"
							className={classnames(
								"lsx-cta-text",
								"lsx-font-size-" + ctaTextFontSize
							)}
							style={{
								color: ctaTextColor
							}}
							value={ctaText}
						/>
					)}
				</div>
				{buttonText && (
					<div className="lsx-cta-button">
						<a
							href={buttonUrl}
							target={buttonTarget ? "_blank" : "_self"}
							className={classnames("lsx-button", buttonShape, buttonSize)}
							style={{
								color: buttonTextColor,
								backgroundColor: buttonBackgroundColor,
								boxShadow: "2px 2px 0 0 " + buttonShadowColor,
								borderColor: buttonBackgroundColor
							}}
							rel="noopener noreferrer"
							data-onhover={buttonHoverColor}
							data-offhover={buttonBackgroundColor}
							onMouseEnter="this.style.backgroundColor=this.getAttribute('data-onhover');"
							onMouseLeave="this.style.backgroundColor=this.getAttribute('data-offhover');"
						>
							<RichText.Content value={buttonText} />
						</a>
					</div>
				)}
			</CallToAction>
		);
	},
	deprecated: [
		// V1
		{
			attributes: blockAttributes,

			migrate: function(attributes) {
				return {
					blockPadding: "5% 3%",
					blockMargin: "0 0 1.2em 0"
				};
			},

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
					buttonTarget,
					ctaTitle,
					ctaText,
					ctaTitleFontSize,
					ctaTextFontSize,
					ctaWidth,
					ctaBackgroundColor,
					ctaTextColor,
					imgURL,
					imgID,
					imgAlt,
					dimRatio
				} = props.attributes;

				// Save the block markup for the front end
				return (
					<CallToAction {...props}>
						{imgURL && (
							<div className="lsx-cta-image-wrap">
								<img
									className={classnames(
										"lsx-cta-image",
										dimRatioToClass(dimRatio),
										{
											"has-background-dim": dimRatio !== 0
										}
									)}
									src={imgURL}
									alt={imgAlt}
								/>
							</div>
						)}

						<div className="lsx-cta-content">
							{ctaTitle && (
								<RichText.Content
									tagName="h2"
									className={classnames(
										"lsx-cta-title",
										"lsx-font-size-" + ctaTitleFontSize
									)}
									style={{
										color: ctaTextColor
									}}
									value={ctaTitle}
								/>
							)}
							{ctaText && (
								<RichText.Content
									tagName="div"
									className={classnames(
										"lsx-cta-text",
										"lsx-font-size-" + ctaTextFontSize
									)}
									style={{
										color: ctaTextColor
									}}
									value={ctaText}
								/>
							)}
						</div>
						{buttonText && (
							<div className="lsx-cta-button">
								<a
									href={buttonUrl}
									target={buttonTarget ? "_blank" : "_self"}
									className={classnames("lsx-button", buttonShape, buttonSize)}
									style={{
										color: buttonTextColor,
										backgroundColor: buttonBackgroundColor,
										boxShadow: "2px 2px 0 0 " + buttonShadowColor,
										borderColor: buttonBackgroundColor
									}}
									data-onhover={buttonHoverColor}
									data-offhover={buttonBackgroundColor}
									onMouseEnter="this.style.backgroundColor=this.getAttribute('data-onhover');"
									onMouseLeave="this.style.backgroundColor=this.getAttribute('data-offhover');"
								>
									<RichText.Content value={buttonText} />
								</a>
							</div>
						)}
					</CallToAction>
				);
			}
		},

		// V2
		{
			attributes: deprecatedBlockAttributes,

			migrate: function(attributes) {
				return {
					blockMargin: "0 auto"
				};
			},

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
					buttonTarget,
					ctaTitle,
					ctaText,
					ctaTitleFontSize,
					ctaTextFontSize,
					ctaWidth,
					ctaBackgroundColor,
					ctaTextColor,
					imgURL,
					imgID,
					imgAlt,
					dimRatio
				} = props.attributes;

				// Save the block markup for the front end
				return (
					<CallToAction {...props}>
						{imgURL && (
							<div className="lsx-cta-image-wrap">
								<img
									className={classnames(
										"lsx-cta-image",
										dimRatioToClass(dimRatio),
										{
											"has-background-dim": dimRatio !== 0
										}
									)}
									src={imgURL}
									alt={imgAlt}
								/>
							</div>
						)}

						<div className="lsx-cta-content">
							{ctaTitle && (
								<RichText.Content
									tagName="h2"
									className={classnames(
										"lsx-cta-title",
										"lsx-font-size-" + ctaTitleFontSize
									)}
									style={{
										color: ctaTextColor
									}}
									value={ctaTitle}
								/>
							)}
							{ctaText && (
								<RichText.Content
									tagName="div"
									className={classnames(
										"lsx-cta-text",
										"lsx-font-size-" + ctaTextFontSize
									)}
									style={{
										color: ctaTextColor
									}}
									value={ctaText}
								/>
							)}
						</div>
						{buttonText && (
							<div className="lsx-cta-button">
								<a
									href={buttonUrl}
									target={buttonTarget ? "_blank" : "_self"}
									className={classnames("lsx-button", buttonShape, buttonSize)}
									style={{
										color: buttonTextColor,
										backgroundColor: buttonBackgroundColor,
										boxShadow: "2px 2px 0 0 " + buttonShadowColor,
										borderColor: buttonBackgroundColor
									}}
									data-onhover={buttonHoverColor}
									data-offhover={buttonBackgroundColor}
									onMouseEnter="this.style.backgroundColor=this.getAttribute('data-onhover');"
									onMouseLeave="this.style.backgroundColor=this.getAttribute('data-offhover');"
								>
									<RichText.Content value={buttonText} />
								</a>
							</div>
						)}
					</CallToAction>
				);
			}
		}
	]
});
