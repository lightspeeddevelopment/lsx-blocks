/**
 * External dependencies
 */
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import map from 'lodash/map';
import classnames from 'classnames';

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;
const { decodeEntities } = wp.htmlEntities;
const { withSelect } = wp.data;

const { addQueryArgs } = wp.url;
const { apiFetch } = wp;
const { compose } = wp.compose;

const {
	PanelBody,
	QueryControls,
	RangeControl,
	RadioControl,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
} = wp.components;

const {
	InspectorControls
} = wp.blockEditor;

class TeamBlock extends Component {
	constructor() {
		super( ...arguments );
		this.state = { teamroleList: [] };
		this.stillMounted = false;
	}

	componentDidMount() {
		this.stillMounted = true;
		this.fetchRequest = apiFetch({
			path: addQueryArgs( '/wp/v2/teamrole', { per_page: -1 })
		}).then(
			( categoriesList ) => {
				if ( this.stillMounted ) {
					this.setState({ categoriesList });
				}
			}
		).catch(
			() => {
				if ( this.stillMounted ) {
					this.setState({ categoriesList: [] });
				}
			}
		);
	}

	componentWillUnmount() {
		this.stillMounted = false;
	}

	render() {
		const { attributes, posts, className, setAttributes, numberOfItems } = this.props;
		const { order, orderBy, teamrole, postsToShow, postLayout, columns, displayCarousel, imageShape, displayPostImage, displayPostExcerpt, displayPostLink, displayTeamSocial, displayTeamJobTitle, includeId } = attributes;

		const { categoriesList } = this.state;
		//console.log(categoriesList);
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

		//Image Shape options
		const imageShapeOptions = [
			{ value: 'circle', label: __( 'Circle' ) },
			{ value: 'square', label: __( 'Square' ) },
		];

		//Image Shape options
		const displayPostExcerptOptions = [
			{ value: 'excerpt', label: __( 'Excerpt' ) },
			{ value: 'full', label: __( 'Full Content' ) },
			{ value: 'none', label: __( 'No Content' ) },
		];

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Layout Settings' ) }>
					<RadioControl
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
					{ postLayout === 'grid' &&
						<ToggleControl
							label={ __( 'Enable Carousel' ) }
							checked={ displayCarousel }
							onChange={ () => this.props.setAttributes( { displayCarousel: ! displayCarousel } ) }
						/>
					}
					<SelectControl
						label={ __( 'Image Shape' ) }
						value={ imageShape }
						options={ imageShapeOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { imageShape: value } ) } }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Display Settings' ) }>
					<ToggleControl
						label={ __( 'Display Featured Image' ) }
						checked={ displayPostImage }
						onChange={ () => this.props.setAttributes( { displayPostImage: ! displayPostImage } ) }
					/>
					<SelectControl
						label={ __( 'Display Excerpt' ) }
						value={ displayPostExcerpt }
						options={ displayPostExcerptOptions.map( ({ value, label }) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ ( value ) => { this.props.setAttributes( { displayPostExcerpt: value } ) } }
					/>
					<ToggleControl
						label={ __( 'Link to single team member' ) }
						checked={ displayPostLink }
						onChange={ () => this.props.setAttributes( { displayPostLink: ! displayPostLink } ) }
					/>
					<ToggleControl
						label={ __( 'Show Social Icons' ) }
						checked={ displayTeamSocial }
						onChange={ () => this.props.setAttributes( { displayTeamSocial: ! displayTeamSocial } ) }
					/>
					<ToggleControl
						label={ __( 'Show Job Title' ) }
						checked={ displayTeamJobTitle }
						onChange={ () => this.props.setAttributes( { displayTeamJobTitle: ! displayTeamJobTitle } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'General Settings' ) }>
					<QueryControls
						{ ...{ order, orderBy, postsToShow, numberOfItems, teamrole } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategoryId={ teamrole }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onCategoryChange={ ( value ) => setAttributes({ teamrole: '' !== value ? value : undefined }) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
					<TextControl
						label={ __( 'Specify team members by ID' ) }
						help={__('Comma separated list, overrides limit setting')}
						type="text"
						value={ includeId }
						onChange={ ( value ) => this.props.setAttributes( { includeId: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);

		return (
			<Fragment>
				{ inspectorControls }
				<div className={ classnames(
					className,
					postLayout === 'grid' ? 'is-grid' : 'is-list',
					[ `columns-${ columns }` ],
				)}>
					{ posts.map( ( post, i ) => {
						//console.log(post.teamrole);
						return (
							<article key={ i }
								className={ classnames(
									post.featured_media && displayPostImage ? 'has-thumb' : 'no-thumb',
									'lsx-team-slot'
								) }
							>
								{
									displayPostImage && post.featured_media !== undefined && post.featured_media ? (
										<div className="lsx-block-post-grid-image">
											<a href={ post.link } target="_blank" rel="bookmark">
												<img
													className={ imageShape }
													src={ post.images.medium }
													alt={ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }
												/>
											</a>
										</div>
									) : (
										null
									)
								}

								<div className="lsx-block-post-grid-text lsx-team-description">
									<h5 className="lsx-team-name"><a href={ post.link } target="_blank" rel="bookmark">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a></h5>
									{/* { role &&
										<small className="lsx-team-job-title">{role}</small>
									} */}
									{ displayTeamJobTitle === true && post.additional_meta.job_title &&
										<small className="lsx-team-job-title">{post.additional_meta.job_title}</small>
									}
									<div className="lsx-block-post-grid-excerpt">
										{ displayPostExcerpt === 'excerpt' && post.excerpt &&
											<div dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />
										}
										{ displayPostExcerpt === 'full' && post.content &&
											<div dangerouslySetInnerHTML={ { __html: post.content.rendered } } />
										}
									</div>
									{ displayTeamSocial && (post.additional_meta.facebook || post.additional_meta.twitter || post.additional_meta.linkedin ) &&
										<ul className="team-social">
											{ post.additional_meta.facebook &&
												<li className="fb"><a href={post.additional_meta.facebook}><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
											}
											{ post.additional_meta.twitter &&
												<li className="tw"><a href={post.additional_meta.twitter}><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
											}
											{ post.additional_meta.linkedin &&
												<li className="ln"><a href={post.additional_meta.linkedin}><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
											}
										</ul>
									}
									{ post.additional_meta.email &&
										<a href={post.additional_meta.email} className="lsx-team-email" tabIndex="0">{post.additional_meta.email}</a>
									}
									{ displayPostLink === true &&
										<a href={ post.link } className="lsx-team-show-more" tabIndex="0">More about { decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }<i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
									}
								</div>
							</article>
						);
					}) }
				</div>
			</Fragment>
		);
	}
}

export default compose([
	withSelect( (select, props ) => {
		const { postsToShow, order, orderBy, includeId, teamrole } = props.attributes;
		const latestPostsQuery = pickBy( {
			teamrole,
			order,
			orderby: orderBy,
			per_page: postsToShow,
			include: includeId,
		} );

		return {
			posts: select( 'core' ).getEntityRecords( 'postType', 'team', latestPostsQuery )
		};
	})
])( TeamBlock );
