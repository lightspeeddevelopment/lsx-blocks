<?php
/**
 * Register Custom Block Styles for Group
 *
 * @package LSX BLOCKS
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register Custom Block Styles for Group
	 *
	 * @return void
	 */
	function block_styles_register_group_block_styles() {

		/**
		 * Register block style
		 */
		register_block_style(
			'core/group',
			array(
				'name'         => 'lsx-group-style',
				'label'        => 'Card',
				'isDefault'    => false,
				'style_handle' => 'lsx-blocks-style-css',
			)
		);
	}

	add_action( 'init', 'block_styles_register_group_block_styles' );
}
