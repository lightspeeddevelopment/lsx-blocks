/**
 * BLOCK: LSX Blocks Container
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Container from './components/container';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';
import CardBox from "../block-card/components/card";
import AvatarColumn from "../block-card/components/avatar";

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	RichText,
	InnerBlocks,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
	withState,
	Toolbar,
} = wp.components;

const blockAttributes = {
	containerPaddingTop: {
		type: 'number',
		default: 3,
	},
	containerPaddingRight: {
		type: 'number',
		default: 3,
	},
	containerPaddingBottom: {
		type: 'number',
		default: 3,
	},
	containerPaddingLeft: {
		type: 'number',
		default: 3,
	},
	containerMarginTop: {
		type: 'number',
		default: 3,
	},
	containerMarginBottom: {
		type: 'number',
		default: 3,
	},
	containerWidth: {
		type: 'string',
		default: 'center',
	},
	containerMaxWidth: {
		type: 'number',
		default: 1200,
	},
	containerBackgroundColor: {
		type: 'string',
		default: 'transparent',
	},
	containerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	containerImgURLMobile: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	containerImgID: {
		type: 'number',
	},
	containerImgIDMobile: {
		type: 'number',
	},
	containerImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
	},
	containerImgAltMobile: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
	},
	bgPosition: {
		type: 'string',
		default: 'lsx-container-initial',
	},
    bgFit: {
        type: 'string',
        default: '',
    },
	containerDimRatio: {
		type: 'number',
		default: 50,
	},
};

class LSXContainerBlock extends Component {

	render() {

		// Setup the attributes
		const {
			attributes: {
				containerPaddingTop,
				containerPaddingRight,
				containerPaddingBottom,
				containerPaddingLeft,
				containerMarginTop,
				containerMarginBottom,
				containerWidth,
				containerMaxWidth,
				containerBackgroundColor,
				containerImgURL,
				containerImgID,
				containerImgAlt,
				containerImgURLMobile,
				containerImgIDMobile,
				containerImgAltMobile,
				bgPosition,
                bgFit,
				containerDimRatio,
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt,
			} );
		};

		const onSelectImageMobile = imgMob => {
			setAttributes( {
				containerImgIDMobile: imgMob.id,
				containerImgURLMobile: imgMob.url,
				containerImgAltMobile: imgMob.alt,
			} );
		};

		return [
			// Show the alignment toolbar on focus
			<BlockControls>
				<BlockAlignmentToolbar
					value={ containerWidth }
					onChange={ containerWidth => setAttributes( { containerWidth } ) }
					controls={ [ 'center', 'full' ] }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the container markup in the editor
			<Container { ...this.props }>
				<div className="lsx-container-inside">
					{ containerImgURL && !! containerImgURL.length && (
						<div className="lsx-container-image-wrap">
							<img
								className={ classnames(
									'lsx-container-image',
									bgPosition,
                                    bgFit,
									{ containerImgAlt },
									dimRatioToClass( containerDimRatio ),
									{
										'has-background-dim': containerDimRatio !== 0,
									}
								) }
								src={ containerImgURL }
								alt={ containerImgAlt }
							/>
						</div>
					) }

					<div
						className="lsx-container-content"
						style={ {
							maxWidth: `${containerMaxWidth}px`,
						} }
					>
						<InnerBlocks />
					</div>
				</div>
			</Container>
		];
	}
}

function dimRatioToClass( ratio ) {
    return ( ratio === 0 || ratio === 50 ) ?
        null :
        'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

function backgroundImageStyles( url ) {
    return url ?
        { backgroundImage: `url(${ url })` } :
        undefined;
}

// Register the block
registerBlockType( 'lsx-blocks/lsx-container', {
	title: __( 'LSX Container', 'lsx-blocks' ),
	description: __( 'Add a container block to wrap several blocks in a parent container.', 'lsx-blocks' ),
	icon: 'editor-table',
	category: 'lsx-blocks',
	keywords: [
		__( 'container', 'lsx-blocks' ),
		__( 'section', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
	],

	attributes: blockAttributes,

	getEditWrapperProps( { containerWidth } ) {
		if ( 'left' === containerWidth || 'right' === containerWidth || 'full' === containerWidth ) {
			return { 'data-align': containerWidth };
		}
	},

	// Render the block components
	edit: LSXContainerBlock,

	// Save the attributes and markup
	save: function( props ) {
		// Setup the attributes
		const {
			containerPaddingTop,
			containerPaddingRight,
			containerPaddingBottom,
			containerPaddingLeft,
			containerMarginTop,
			containerMarginBottom,
			containerWidth,
			containerMaxWidth,
			containerBackgroundColor,
			containerImgURL,
			containerImgID,
			containerImgAlt,
			containerImgURLMobile,
			containerImgIDMobile,
			containerImgAltMobile,
			bgPosition,
            bgFit,
			containerDimRatio,
		} = props.attributes;
		{ containerImgURL &&
			console.log(containerImgURLMobile);
		}

		// Save the block markup for the front end
		return (
			<Container { ...props }>
				<div className="lsx-container-inside">
					{ containerImgURL && !! containerImgURL.length && (
						<div className="lsx-container-image-wrap">
							<img
								className={ classnames(
									'lsx-container-image',
									bgPosition,
                                    bgFit,
									dimRatioToClass( containerDimRatio ),
									{
										'has-background-dim': containerDimRatio !== 0,
									}
								) }
								src={ containerImgURL }
								alt={ containerImgAlt }
							/>
						</div>
					) }
					<div
						className="lsx-container-content"
						style={ {
							maxWidth: `${containerMaxWidth}px`,
						} }
					>
						<InnerBlocks.Content />
					</div>
				</div>
			</Container>
		);
	},
    deprecated: [
    	// V1
        {
            attributes: blockAttributes,

            migrate: function( attributes ) {
                return {
                    bgPosition: attributes.bgPosition+'-center',
                    bgFit: 'lsx-container-fit',
                };
            },

            save: function( props ) {

                // Setup the attributes
                const {
                    containerPaddingTop,
                    containerPaddingRight,
                    containerPaddingBottom,
                    containerPaddingLeft,
                    containerMarginTop,
                    containerMarginBottom,
                    containerWidth,
                    containerMaxWidth,
                    containerBackgroundColor,
                    containerImgURL,
                    containerImgID,
                    containerImgAlt,
                    bgPosition,
                    containerDimRatio,
                } = props.attributes;

                // Save the block markup for the front end
                return (
                    <Container { ...props }>
                        <div className="lsx-container-inside">
                            { containerImgURL && !! containerImgURL.length && (
                                <div className="lsx-container-image-wrap">
                                    <img
                                        className={ classnames(
                                            'lsx-container-image',
                                            bgPosition,
                                            dimRatioToClass( containerDimRatio ),
                                            {
                                                'has-background-dim': containerDimRatio !== 0,
                                            }
                                        ) }
                                        src={ containerImgURL }
                                        alt={ containerImgAlt }
                                    />
                                </div>
                            ) }
                            <div
                                className="lsx-container-content"
                                style={ {
                                    maxWidth: `${containerMaxWidth}px`,
                                } }
                            >
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </Container>
                );
            },
        }
    ]
} );
