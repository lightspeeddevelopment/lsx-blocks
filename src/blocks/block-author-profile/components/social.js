/**
 * Social Media Icons
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

/**
 * Create an SocialIcons wrapper Component
 */
export default class SocialIcons extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<ul className="lsx-social-links">
				{ this.props.attributes.website && !! this.props.attributes.website.length && (
					<li>
						<a href={ this.props.attributes.website } target="_blank" rel="noopener">{ __( 'Website' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } className="fas fa-link"></i></a>
					</li>
				) }

				{ this.props.attributes.twitter && !! this.props.attributes.twitter.length && (
					<li>
						<a href={ this.props.attributes.twitter } target="_blank" rel="noopener">{ __( 'Twitter' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } className="fab fa-twitter"></i></a>
					</li>
				) }

				{ this.props.attributes.facebook && !! this.props.attributes.facebook.length && (
					<li>
						<a href={ this.props.attributes.facebook } target="_blank" rel="noopener">{ __( 'Facebook' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } className="fab fa-facebook-f"></i></a>
					</li>
				) }

				{ this.props.attributes.instagram && !! this.props.attributes.instagram.length && (
					<li>
						<a href={ this.props.attributes.instagram } target="_blank" rel="noopener">{ __( 'Instagram' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } className="fab fa-instagram"></i></a>
					</li>
				) }

				{ this.props.attributes.pinterest && !! this.props.attributes.pinterest.length && (
					<li>
						<a href={ this.props.attributes.pinterest } target="_blank" rel="noopener">{ __( 'Pinterest' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } className="fab fa-pinterest"></i></a>
					</li>
				) }

				{ this.props.attributes.google && !! this.props.attributes.google.length && (
					<li>
						<a href={ this.props.attributes.google } target="_blank" rel="noopener">{ __( 'Google' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } className="fab fa-google"></i></a>
					</li>
				) }

				{ this.props.attributes.youtube && !! this.props.attributes.youtube.length && (
					<li>
						<a href={ this.props.attributes.youtube } target="_blank" rel="noopener">{ __( 'YouTube' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } className="fab fa-youtube"></i></a>
					</li>
				) }

				{ this.props.attributes.github && !! this.props.attributes.github.length && (
					<li>
						<a href={ this.props.attributes.github } target="_blank" rel="noopener">{ __( 'Github' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } className="fab fa-github"></i></a>
					</li>
				) }

				{ this.props.attributes.email && !! this.props.attributes.email.length && (
					<li>
						<a href={ this.props.attributes.email } target="_blank" rel="noopener">{ __( 'Email' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } className="far fa-envelope"></i></a>
					</li>
				) }
			</ul>
		);
	}
}
