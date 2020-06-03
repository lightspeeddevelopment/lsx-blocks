<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package LSX BLOCKS
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue assets for frontend and backend
 *
 * @since 1.0.0
 */
function lsx_blocks_block_assets() {

	$postfix = ( SCRIPT_DEBUG === true ) ? '' : '.min';

	// Load the compiled styles
	wp_register_style(
		'lsx-blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.style.build.css' )
	);

	// Load the FontAwesome icon library
	wp_enqueue_style(
		'lsx-blocks-fontawesome',
		plugins_url( 'dist/assets/fontawesome/css/all' . $postfix . '.css', dirname( __FILE__ ) ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/fontawesome/css/all.css' )
	);
}
add_action( 'init', 'lsx_blocks_block_assets' );


/**
 * Enqueue assets for backend editor
 *
 * @since 1.0.0
 */
function lsx_blocks_editor_assets() {

	$postfix = ( SCRIPT_DEBUG === true ) ? '' : '.min';

	// Load the FontAwesome icon library
	wp_enqueue_style(
		'lsx-blocks-fontawesome',
		plugins_url( 'dist/assets/fontawesome/css/all' . $postfix . '.css', dirname( __FILE__ ) ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/fontawesome/css/all.css' )
	);

	// Load the compiled blocks into the editor
	wp_enqueue_script(
		'lsx-blocks-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-edit-post', 'wp-plugins', 'wp-elements' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.build.js' )
	);

	// Load the compiled styles into the editor
	wp_enqueue_style(
		'lsx-blocks-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.editor.build.css' )
	);

	// Pass in REST URL
	wp_localize_script(
		'lsx-blocks-block-js',
		'lsx_globals',
		array(
			'rest_url' => esc_url( rest_url() ),
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'lsx_blocks_editor_assets' );


// Add custom block category.
add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'lsx-blocks',
				'title' => __( 'LSX Blocks', 'lsx-blocks' ),
			),
		)
	);
}, 10, 2 );

if ( in_array( 'lsx-team/lsx-team.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
	/**
	 * Add custom block category for Team block that will only show if the plugin is active.
	 */
	add_filter( 'block_categories', function( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'lsx-team-blocks',
					'title' => __( 'LSX Team Blocks', 'lsx-blocks' ),
				),
			)
		);
	}, 10, 2 );
}

if ( in_array( 'lsx-testimonials/lsx-testimonials.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ), true ) ) {
	/**
	 * Add custom block category for Team block that will only show if the plugin is active.
	 */
	add_filter( 'block_categories', function( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'lsx-testimonials-blocks',
					'title' => __( 'LSX Team Blocks', 'lsx-blocks' ),
				),
			)
		);
	}, 10, 2 );
}
