<?php
/**
 * Server-side rendering for the post grid block
 *
 * @since   1.1.7
 * @package LSX BLOCKS
 */

/**
 * Renders the post grid block on server.
 *
 * @param [type] $attributes attributes.
 * @return $block_content
 */
function lsx_blocks_render_block_core_latest_posts( $attributes ) {
	global $post;
	$categories = isset( $attributes['categories'] ) ? $attributes['categories'] : '';
	$tags       = isset( $attributes['selectedTag'] ) ? $attributes['selectedTag'] : '';

	if ( '' !== $attributes['categories'] ) {

		$args = array(
			'posts_per_page' => $attributes['postsToShow'],
			'post_status' => 'publish',
			'order'       => $attributes['order'],
			'orderby'     => $attributes['orderBy'],
			'cat'         => $categories,
			'tag__in'     => $tags,
			'ignore_sticky_posts' => 1,
			'post__not_in'        => array( $post->ID ), // Exclude the current post from the grid.
		);
	} else {
		$args = array(
			'posts_per_page' => $attributes['postsToShow'],
			'post_status' => 'publish',
			'order'       => $attributes['order'],
			'orderby'     => $attributes['orderBy'],
			'tag__in'     => $tags,
			'ignore_sticky_posts' => 1,
			'post__not_in'        => array( $post->ID ), // Exclude the current post from the grid.
		);
	}

	$recent_posts = new \WP_Query( $args );

	$list_items_markup = array();

	if ( $recent_posts->have_posts() ) {

		while ( $recent_posts->have_posts() ) {
			$recent_posts->the_post();
			global $post;
			$post_id = get_the_ID();

			// Get the post thumbnail.
			$post_thumb_id = get_post_thumbnail_id( $post_id );

			if ( $post_thumb_id && isset( $attributes['displayPostImage'] ) && $attributes['displayPostImage'] ) {
				$post_thumb_class = 'has-thumb';
			} elseif ( isset( $attributes['displayPostImage'] ) && $attributes['displayPostImage'] ) {
				$post_thumb_class = 'placeholder-thumb';
			} else {
				$post_thumb_class = 'no-placeholder';
			}

			if ( isset( $attributes['displayPostShadow'] ) && $attributes['displayPostShadow'] ) {
				$shadow_class = 'disable-shadow';
			} else {
				$shadow_class = '';
			}

			$bgcolor = $attributes['postsBackgroundColor'];
			if ( isset( $bgcolor ) && $bgcolor ) {
				$bgcolor_style = 'style=background-color:' . $bgcolor . ';';
			} else {
				$bgcolor_style = '';
			}

			// Start the markup for the post.
			$list_items_markup[] = sprintf(
				'<article class="%1$s %2$s" %3$s>',
				esc_attr( $post_thumb_class ),
				esc_attr( $shadow_class ),
				esc_attr( $bgcolor_style )
			);

			// Get the featured image.
			if ( isset( $attributes['displayPostImage'] ) && $attributes['displayPostImage'] ) {
				$post_thumb_size = 'lsx-block-post-grid-landscape';

				if ( ( 'lsx-placeholder' === $post_thumb_id ) || ( 0 === $post_thumb_id ) ) {
					$thumbnail = '<img class="attachment-responsive wp-post-image lsx-responsive" src="/wp-content/plugins/lsx-blocks/dist/assets/images/placeholder-350x230.jpg">';
				} else {
					$thumbnail = wp_get_attachment_image( $post_thumb_id, $post_thumb_size );
				}

				$list_items_markup[] = sprintf(
					'<div class="lsx-block-post-grid-image"><a href="%1$s" rel="bookmark">%2$s</a></div>',
					esc_url( get_permalink( $post_id ) ),
					$thumbnail
				);
			}

			// Wrap the text content.
			$list_items_markup[] = sprintf(
				'<div class="lsx-block-post-grid-text">'
			);

			// Get the post title.
			$title = get_the_title( $post_id );

			if ( ! $title ) {
				$title = __( 'Untitled', 'lsx-blocks' );
			}

			$list_items_markup[] = sprintf(
				'<h2 class="lsx-block-post-grid-title"><a href="%1$s" rel="bookmark">%2$s</a></h2>',
				esc_url( get_permalink( $post_id ) ),
				wp_kses_post( $title )
			);

			// Wrap the byline content.
			$list_items_markup[] = sprintf(
				'<div class="lsx-block-post-grid-byline">'
			);

			// Get the post author.
			if ( isset( $attributes['displayPostAuthor'] ) && $attributes['displayPostAuthor'] ) {
				$list_items_markup[] = sprintf(
					'<div class="lsx-block-post-grid-author"><a class="lsx-text-link" href="%2$s">%1$s</a>,</div>',
					esc_html( get_the_author_meta( 'display_name', $post->post_author ) ),
					esc_html( get_author_posts_url( $post->post_author ) )
				);
			}

			// Get the post date.
			if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
				$list_items_markup[] = sprintf(
					'<time datetime="%1$s" class="lsx-block-post-grid-date">%2$s.</time>',
					esc_attr( get_the_date( 'c', $post_id ) ),
					esc_html( get_the_date( '', $post_id ) )
				);
			}

			// Get the post Categories.
			if ( isset( $attributes['displayPostCategories'] ) && $attributes['displayPostCategories'] ) {

				$post_categories = wp_get_post_categories( get_the_ID() );
				$cats            = array();

				foreach ( $post_categories as $c ) {
					$cat = get_category( $c );
					/* Translators: %s: category name */
					$cats[] = '<a href="' . esc_url( get_category_link( $cat->term_id ) ) . '" title="' . sprintf( esc_html__( 'View all posts in %s', 'lsx' ), $cat->name ) . '">' . $cat->name . '</a>';
				}

				if ( ! empty( $cats ) ) {

					$list_items_markup[] = '<span id="post-meta-categories"><span class="cat-title">' .  __( 'Posted in: ', 'lsx-blocks' ) . '</span>' . wp_kses_post( implode( ', ', $cats ) ) .  '</span>';

				}
			}

			// Close the byline content.
			$list_items_markup[] = sprintf(
				'</div>'
			);

			// Wrap the excerpt content.
			$list_items_markup[] = sprintf(
				'<div class="lsx-block-post-grid-excerpt">'
			);

			// Get the excerpt.
			$excerpt = apply_filters( 'the_excerpt', get_post_field( 'post_excerpt', $post_id, 'display' ) );

			if ( empty( $excerpt ) ) {
				$excerpt = apply_filters( 'the_excerpt', wp_trim_words( $post->post_content, 20 ) );
			}

			if ( ! $excerpt ) {
				$excerpt = null;
			}

			if ( isset( $attributes['displayPostExcerpt'] ) && $attributes['displayPostExcerpt'] ) {
				$list_items_markup[] = wp_kses_post( $excerpt );
			}

			if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {
				$list_items_markup[] = sprintf(
					'<p><a class="lsx-block-post-grid-link lsx-text-link" href="%1$s" rel="bookmark">%2$s</a></p>',
					esc_url( get_permalink( $post_id ) ),
					esc_html( $attributes['readMoreText'] )
				);
			}

			// Close the excerpt content.
			$list_items_markup[] = sprintf(
				'</div>'
			);

			// Get the post Tags.
			if ( isset( $attributes['displayPostTags'] ) && $attributes['displayPostTags'] ) {

				if ( has_tag() ) {

					$list_items_markup[] = '<div id="post-tags"><span class="tags-title">' . esc_html__( 'Tags: ', 'lsx' ) . '</span>' . wp_kses_post( get_the_tag_list( '' ) ) . '</div>';

				}
			}

			// Wrap the text content.
			$list_items_markup[] = sprintf(
				'</div>'
			);

			// Close the markup for the post.
			$list_items_markup[] = "</article>\n";
		}
		wp_reset_postdata();
	}

	// Build the classes.
	$class = "lsx-block-post-grid align{$attributes['align']}";

	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	$grid_class = 'lsx-post-grid-items';

	if ( isset( $attributes['postLayout'] ) && 'list' === $attributes['postLayout'] ) {
		$grid_class .= ' is-list';
	} else {
		$grid_class .= ' is-grid';
	}

	if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
		$grid_class .= ' columns-' . $attributes['columns'];
	}

	// Output the post markup.
	$block_content = sprintf(
		'<div class="%1$s"><div class="%2$s">%3$s</div></div>',
		esc_attr( $class ),
		esc_attr( $grid_class ),
		implode( '', $list_items_markup )
	);

	return $block_content;
}

/**
 * Registers the `core/latest-posts` block on server.
 */
function lsx_blocks_register_block_core_latest_posts() {

	// Check if the register function exists.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( 'lsx-blocks/lsx-post-grid', array(
		'style'           => 'lsx-blocks-style-css',
		'attributes'      => array(
			'categories'            => array(
				'type'    => 'string',
				'default' => '',
			),
			'selectedTag'           => array(
				'type'    => 'string',
				'default' => '',
			),
			'className'             => array(
				'type' => 'string',
			),
			'postsToShow'           => array(
				'type'    => 'number',
				'default' => 6,
			),
			'displayPostDate'       => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayPostCategories' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayPostExcerpt'    => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayPostTags'       => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayPostAuthor'     => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayPostImage'      => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'displayPostShadow'     => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'displayPostLink'       => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'postLayout'            => array(
				'type'    => 'string',
				'default' => 'grid',
			),
			'columns'               => array(
				'type'    => 'number',
				'default' => 3,
			),
			'align'                 => array(
				'type'    => 'string',
				'default' => 'center',
			),
			'width'                 => array(
				'type'    => 'string',
				'default' => 'wide',
			),
			'order'                 => array(
				'type'    => 'string',
				'default' => 'desc',
			),
			'orderBy'               => array(
				'type'    => 'string',
				'default' => 'date',
			),
			'imageCrop'             => array(
				'type'    => 'string',
				'default' => 'landscape',
			),
			'postsBackgroundColor'  => array(
				'type'    => 'string',
				'default' => 'transparent',
			),
			'readMoreText'          => array(
				'type'    => 'string',
				'default' => 'Continue Reading',
			),
		),
		'render_callback' => 'lsx_blocks_render_block_core_latest_posts',
	) );
}
add_action( 'init', 'lsx_blocks_register_block_core_latest_posts' );


/**
 * Create API fields for additional info
 */
function lsx_blocks_register_rest_fields() {
	// Add landscape featured image source.
	register_rest_field(
		'post',
		'featured_image_src',
		array(
			'get_callback'    => 'lsx_blocks_get_image_src_landscape',
			'update_callback' => null,
			'schema'          => null,
		)
	);

	// Add square featured image source.
	// register_rest_field(
	// 	'post',
	// 	'featured_image_src_square',
	// 	array(
	// 		'get_callback'    => 'lsx_blocks_get_image_src_square',
	// 		'update_callback' => null,
	// 		'schema'          => null,
	// 	)
	// );

	// Add author info.
	register_rest_field(
		'post',
		'author_info',
		array(
			'get_callback'    => 'lsx_blocks_get_author_info',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
add_action( 'rest_api_init', 'lsx_blocks_register_rest_fields' );

/**
 * Get landscape featured image source for the rest field
 */
function lsx_blocks_get_image_src_landscape( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'lsx-block-post-grid-landscape',
		false
	);
	return $feat_img_array[0];
}

/**
 * Get square featured image source for the rest field
 */
// function lsx_blocks_get_image_src_square( $object, $field_name, $request ) {
// 	$feat_img_array = wp_get_attachment_image_src(
// 		$object['featured_media'],
// 		'lsx-block-post-grid-square',
// 		false
// 	);
// 	return $feat_img_array[0];
// }

/**
 * Get author info for the rest field
 */
function lsx_blocks_get_author_info( $object, $field_name, $request ) {
	// Get the author name.
	$author_data['display_name'] = get_the_author_meta( 'display_name', $object['author'] );

	// Get the author link.
	$author_data['author_link'] = get_author_posts_url( $object['author'] );

	// Get the author avatar.
	$author_data['author_avatar'] = get_avatar_url( $object['author'] );

	// Return the author data.
	return $author_data;
}
