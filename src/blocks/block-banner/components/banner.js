/**
 * Banner Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

// Create a banner box wrapper Component
export default class BannerBox extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { bannerAlignment, bannerImgURL, bannerFontSize, bannerBackgroundColor, bannerTextColor, bannerImageShape } = this.props.attributes;

		return (
			<div
				style={ {
					backgroundColor: bannerBackgroundColor,
					color: bannerTextColor,
				} }
				className={ classnames(
					this.props.className,
					bannerAlignment,
					bannerImageShape,
					{ 'lsx-has-image': bannerImgURL },
					'lsx-font-size-' + bannerFontSize,
					'lsx-block-banner',
					'lsx-banner-columns',
					'alignfull',
				) }>
				{ this.props.children }
			</div>
		);
	}
}
