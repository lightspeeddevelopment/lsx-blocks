/**
 * Avatar Column Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';
import icons from './icons';

// Import block components
const {
	MediaUpload,
} = wp.blockEditor;

// Create an AvatarColumn wrapper Component
export default class AvatarColumn extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div className="lsx-card-column lsx-card-avatar-wrap">
				<div className="lsx-card-image-wrap">
					{ this.props.children }
				</div>
			</div>
		);
	}
}
