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
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	FormToggle,
	RangeControl,
	SelectControl,
	ToggleControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { buttonText, buttonUrl, buttonAlignment, buttonBackgroundColor, buttonShadowColor, buttonHoverColor, buttonTextColor, buttonSize, buttonShape, buttonGhost, buttonLine, buttonTarget } = this.props.attributes;
		const { setAttributes } = this.props;

		// Button size values
		const buttonSizeOptions = [
			{ value: 'lsx-button-size-small', label: __( 'Small' ) },
			{ value: 'lsx-button-size-medium', label: __( 'Medium' ) },
			{ value: 'lsx-button-size-large', label: __( 'Large' ) },
			{ value: 'lsx-button-size-extralarge', label: __( 'Extra Large' ) },
		];

		// Button shape
		const buttonShapeOptions = [
			{ value: 'lsx-button-shape-square', label: __( 'Square' ) },
			{ value: 'lsx-button-shape-rounded', label: __( 'Rounded Square' ) },
			{ value: 'lsx-button-shape-circular', label: __( 'Circular' ) },
		];

		// Button Border Options
		const buttonGhostOptions = [
			{ value: 'transparent', label: __( 'Border' ) },
			{ value: '', label: __( 'No Border' ) },
		];

		// Button Lines Options
		const buttonLineOptions = [
			{ value: 'lsx-button-line', label: __( 'Add Line' ) },
			{ value: 'lsx-button-no-line', label: __( 'No Line' ) },
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

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<ToggleControl
						label={ __( 'Open link in new window' ) }
						checked={ buttonTarget }
						onChange={ () => this.props.setAttributes( { buttonTarget: ! buttonTarget } ) }
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
						options={ buttonShapeOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { buttonShape: value } ) } }
					/>

					<SelectControl
						label={ __( 'Change border color' ) }
						value={ buttonGhost }
						options={ buttonGhostOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { buttonGhost: value } ) } }
					/>

					<SelectControl
						label={ __( 'Add Divider Lines Around Button' ) }
						value={ buttonLine }
						options={ buttonLineOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { buttonLine: value } ) } }
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
			</InspectorControls>
		);
	}
}
