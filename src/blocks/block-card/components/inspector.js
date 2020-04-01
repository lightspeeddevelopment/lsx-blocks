/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
	InspectorControls,
	BlockDescription,
	ColorPalette,
  	PanelColorSettings,
} = wp.blockEditor;

// Import Inspector components
const {
	Panel,
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} = wp.components;

// Create an Inspector Controls wrapper Component
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { cardName, cardTitle, cardContent, cardAlignment, cardImgURL, cardImgID, cardFontSize, cardBackgroundColor, cardTextColor, cardLinkColor, twitter, facebook, instagram, pinterest, google, youtube, github, email, website, buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonShadowColor, buttonHoverColor, buttonTextColor, buttonSize, buttonShape, buttonGhost, buttonTarget, buttonFlat } = this.props.attributes;
		const { setAttributes } = this.props;

		// Button size values
		const buttonSizeOptions = [
			{ value: 'lsx-button-size-small', label: __( 'Small' ) },
			{ value: 'lsx-button-size-medium', label: __( 'Medium' ) },
			{ value: 'lsx-button-size-large', label: __( 'Large' ) },
			{ value: 'lsx-button-size-extralarge', label: __( 'Extra Large' ) },
		];

		const buttonFlatOptions = [
			{ value: 'lsx-button-flat', label: __( 'Yes' ) },
			{ value: 'lsx-button-normal', label: __( 'No' ) },
		];

		// Button shape
		const buttonShapeOptions = [
			{ value: 'lsx-button-shape-square', label: __( 'Square' ) },
			{ value: 'lsx-button-shape-rounded', label: __( 'Rounded Square' ) },
			{ value: 'lsx-button-shape-circular', label: __( 'Circular' ) },
		];

		const buttonGhostOptions = [
			{ value: 'lsx-button-border-btn', label: __( 'Border' ) },
			{ value: 'lsx-button-no-border', label: __( 'No Border' ) },
		];
		// Button colors
		const buttonColors = [
			{ color: '#F7941D', name: 'yellow' },
			{ color: '#C4771B', name: 'dark yellow' },
			{ color: '#418AD0', name: 'blue' },
			{ color: '#27639D', name: 'dark blue' },
			{ color: '#6BA913', name: 'green' },
			{ color: '#3f640b', name: 'dark green' },
			{ color: '#000000', name: 'black' },
			{ color: '#ffffff', name: 'white' },
		];

		// Update color values
		const onChangeButtonColor = value => setAttributes( { buttonBackgroundColor: value } );
		const onChangeButtonShadowColor = value => setAttributes( { buttonShadowColor: value } );
		const onChangeButtonHoverColor = value => setAttributes( { buttonHoverColor: value } );
		const onChangeButtonTextColor = value => setAttributes( { buttonTextColor: value } );

		// Update color values
		const onChangeBackgroundColor = value => setAttributes( { cardBackgroundColor: value } );
		const onChangeCardTextColor = value => setAttributes( { cardTextColor: value } );

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<RangeControl
						label={ __( 'Content Font Size (the title and subtitle font sizes are proportional to this)' ) }
						value={ cardFontSize }
						onChange={ ( value ) => this.props.setAttributes( { cardFontSize: value } ) }
						min={ 15 }
						max={ 24 }
						step={ 1 }
					/>

					<PanelColorSettings
						title={ __( 'Background Color' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: cardBackgroundColor,
							onChange: onChangeBackgroundColor,
							label: __( 'Background Color' ),
						} ] }
					>
					</PanelColorSettings>

					<PanelColorSettings
						title={ __( 'Text Color' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: cardTextColor,
							onChange: onChangeCardTextColor,
							label: __( 'Text Color' ),
						} ] }
					>
					</PanelColorSettings>

					<PanelBody title={ __( 'Button Options' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Open link in new window' ) }
							checked={ buttonTarget }
							onChange={ () => this.props.setAttributes( { buttonTarget: ! buttonTarget } ) }
						/>

						<SelectControl
							label={ __( 'Flat Button?' ) }
							value={ buttonFlat }
							options={ buttonFlatOptions.map( ({ value, label }) => ( {
								value: value,
								label: label,
							} ) ) }
							onChange={ ( value ) => { this.props.setAttributes( { buttonFlat: value } ) } }
						/>

						<SelectControl
							label={ __( 'Button Size' ) }
							value={ buttonSize }
							options={ buttonSizeOptions.map( ({ value, label }) => ( {
								value: value,
								label: label,
							} ) ) }
							onChange={ ( value ) => { this.props.setAttributes( { buttonSize: value } ) } }
						/>

						<SelectControl
							label={ __( 'Button Shape' ) }
							value={ buttonShape }
							options={ buttonShapeOptions.map( ( { value, label } ) => ( {
								value: value,
								label: label,
							} ) ) }
							onChange={ ( value ) => { this.props.setAttributes( { buttonShape: value } ) } }
						/>

						<SelectControl
							label={ __( 'Border Button with transparent Background?' ) }
							value={ buttonGhost }
							options={ buttonGhostOptions.map( ( { value, label } ) => ( {
								value: value,
								label: label,
							} ) ) }
							onChange={ ( value ) => { this.props.setAttributes( { buttonGhost: value } ) } }
						/>

						<PanelColorSettings
							title={ __( 'Button Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonBackgroundColor,
								onChange: onChangeButtonColor,
								label: __( 'Button Color' ),
								colors: buttonColors,
							} ] }
						>
						</PanelColorSettings>

						<PanelColorSettings
							title={ __( 'Button Shadow Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonShadowColor,
								onChange: onChangeButtonShadowColor,
								label: __( 'Button Shadow Color' ),
								colors: buttonColors,
							} ] }
						>
						</PanelColorSettings>

						<PanelColorSettings
							title={ __( 'Button Hover Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonHoverColor,
								onChange: onChangeButtonHoverColor,
								label: __( 'Button Hover Color' ),
								colors: buttonColors,
							} ] }
						>
						</PanelColorSettings>

						<PanelColorSettings
							title={ __( 'Button Text Color' ) }
							initialOpen={ false }
							colorSettings={ [ {
								value: buttonTextColor,
								onChange: onChangeButtonTextColor,
								label: __( 'Button Text Color' ),
							} ] }
						>
						</PanelColorSettings>
					</PanelBody>

				</PanelBody>

			</InspectorControls>
		);
	}
}
