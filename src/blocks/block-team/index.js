/**
 * Block dependencies
 */

import './style.scss';
import edit from './edit';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Spinner } = wp.components;
const { withSelect } = wp.data;

registerBlockType( 'lsx-blocks/lsx-team', {
	title: __( 'LSX Team', 'lsx-blocks' ),
	description: __( 'Add a teams block.', 'lsx-blocks' ),
	icon:  'groups',
	category: 'lsx-blocks',
	keywords: [
		__( 'team', 'lsx-blocks' ),
		__( 'lsx', 'lsx-blocks' ),
	],
	edit,
	save() {
		// Rendering in PHP
		return null;
	},
} );
