/**
 * External dependencies
 */
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import classnames from 'classnames';

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;
const { decodeEntities } = wp.htmlEntities;
const { withSelect } = wp.data;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	RadioControl,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
	Toolbar,
	withAPIData,
} = wp.components;

const {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
} = wp.editor;

class TeamBlock extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { attributes, posts, className, isSelected, setAttributes } = this.props;
		const { order, orderBy, postsToShow, postLayout, columns, displayPostImage } = attributes;

		if ( ! posts ) {
			return (
				<p className={className} >
					<Spinner />
					{ __( 'Loading Posts', 'lsx-blocks' ) }

				</p>
			);
		}
		if ( 0 === posts.length ) {
			return <p>{ __( 'No Posts', 'lsx-blocks' ) }</p>;
		}

		// Layouts options
		const postLayoutOptions = [
			{ value: 'grid', label: __( 'Grid' ) },
			{ value: 'list', label: __( 'List' ) },
		];

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Layout Settings' ) }>
					<RadioControl
						label={ __( 'Layout' ) }
						selected={ postLayout }
						options={ postLayoutOptions }
						onChange={ ( value ) => setAttributes( { postLayout: value } ) }
					/>
					{ postLayout === 'grid' &&
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 2 }
							max={ 6 }
							step={ 1 }
						/>
					}
				</PanelBody>
				<PanelBody title={ __( 'Display Settings' ) }>
					<ToggleControl
						label={ __( 'Display Featured Image' ) }
						checked={ displayPostImage }
						onChange={ () => this.props.setAttributes( { displayPostImage: ! displayPostImage } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'General Settings' ) }>
					<QueryControls
						{ ...{ order, orderBy, postsToShow } }
						numberOfItems={ postsToShow }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);

		return (
			<Fragment>
				{ inspectorControls }
				<div className={ className }>
					{ posts.map( ( post, i ) => {

						console.log(post);
						return (
							<article key={ i }
								className={ classnames(
									post.featured_media && displayPostImage ? 'has-thumb' : 'no-thumb'
								) }
							>
								{
									displayPostImage && post.featured_media !== undefined && post.featured_media ? (
										<div className="lsx-block-post-grid-image">
											<a href={ post.link } target="_blank" rel="bookmark">
												<img
													src={ post.images.medium }
													alt={ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }
												/>
											</a>
										</div>
									) : (
										null
									)
								}

								<div className="lsx-block-post-grid-text">
									<h2 className="entry-title"><a href={ post.link } target="_blank" rel="bookmark">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a></h2>
									<small className="lsx-team-job-title">{ post.teamrole[0] }</small>
									<div className="lsx-block-post-grid-excerpt">
										{ post.excerpt &&
											<div dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />
										}
									</div>
								</div>
							</article>
						);
					}) }
				</div>
			</Fragment>
		);
	}
}

export default withSelect( (select, props ) => {
	const { postsToShow, order, orderBy } = props.attributes;
	const latestPostsQuery = pickBy( {
		order: order,
		orderby: orderBy,
		per_page: postsToShow,
	}, ( value ) => ! isUndefined( value ) );
	return {
		posts: select( 'core' ).getEntityRecords( 'postType', 'team', latestPostsQuery )
	};
} )( TeamBlock ) // end withAPIData
