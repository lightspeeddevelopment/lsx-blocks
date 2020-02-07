<?php

/**
 * Register the dynamic block.
 *
 * @since 2.1.0
 *
 * @return void
 */
function register_dynamic_block() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'lsx-blocks/lsx-team', [
		'render_callback' => 'render_dynamic_block',
	] );

}
add_action( 'init', 'register_dynamic_block' );

/**
 * Server rendering for /blocks/examples/12-dynamic
 */
function render_dynamic_block() {
	$recent_posts = wp_get_recent_posts( [
		'numberposts' => 6,
		'post_status' => 'publish',
		'post_type'   => 'team',
	] );

	if ( empty( $recent_posts ) ) {
		return '<p>No posts</p>';
	}

	$markup = '<ul>';

	foreach ( $recent_posts as $post ) {
		$post_id  = $post['ID'];
		$markup  .= sprintf(
			'<li><a href="%1$s">%2$s</a></li>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( get_the_title( $post_id ) )
		);
	}

	return "{$markup}<ul>";
}
