<?php
/**
 * Holds the Page Title Panel Settings.
 *
 * @package   lsx\blocks\classes\lib
 * @author    LightSpeed
 * @license   GPL-3.0+
 * @link
 * @copyright 2019 LightSpeed
 */

namespace lsx\blocks\classes\lib;

/**
 * Setup plugin class.
 *
 * @package lsx\blocks\classes\lib
 * @author  LightSpeed
 */
class Page_Title {

	/**
	 * Holds class instance
	 *
	 * @since 1.0.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function __construct() {
		add_action( 'wp_head', array( $this, 'init' ), 999 );
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since 1.0.0
	 *
	 * @return    object \lsx\blocks\classes\Frontend();    A single instance of this class.
	 */
	public static function get_instance() {
		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Init
	 */
	public function init() {
		if ( defined( 'LSX_VERSION' ) ) {
			$version_compare = version_compare( '2.8.0', LSX_VERSION );

			// Remove the legacy page title and entry meta.
			if ( function_exists( 'has_blocks' ) && ( has_blocks() || true === apply_filters( 'override_title_display', false ) ) ) {
				remove_action( 'lsx_entry_top', 'lsx_post_header' );
				remove_action( 'lsx_entry_top', 'lsx_add_entry_meta', 999 );
				add_action( 'body_class', array( $this, 'body_class' ) );
				$this->position_title();
			}
		}
	}

	/**
	 * Position our page title class on the body
	 *
	 * @param  array $classes
	 * @return array
	 */
	public function position_title() {
		$position = get_post_meta( get_the_ID(), 'lsx_title_position', true );
		$position = apply_filters( 'lsx_hero_banner_block_position', $position );
		switch ( $position ) {
			case 'below-banner':
				add_action( 'lsx_content_top', array( $this, 'lsx_block_header' ) );
				break;

			case 'above-content':
				add_action( 'lsx_entry_top', array( $this, 'lsx_block_header' ) );
				break;

			case 'in-banner':
			default:
				add_action( 'lsx_hero_banner', array( $this, 'lsx_block_header' ) );
				break;
		}
	}

	/**
	 * Adds our page title class to the body
	 *
	 * @param  array $classes
	 * @return array
	 */
	public function body_class( $classes ) {

		$disable_title = get_post_meta( get_the_ID(), 'lsx_disable_title', true );
		if ( 'yes' !== $disable_title || ( ! is_singular() ) ) {
			return $classes;
		}
		$position  = get_post_meta( get_the_ID(), 'lsx_title_position', true );
		$position  = apply_filters( 'lsx_hero_banner_block_position', $position );
		$classes[] = 'lsx-title-' . $position;
		$classes[] = 'lsx-page-title';
		return $classes;
	}

	/**
	 * Outputs the page header in a WordPress Block format.
	 */
	public function lsx_block_header() {
		$disable_title = get_post_meta( get_the_ID(), 'lsx_disable_title', true );
		if ( 'yes' !== $disable_title || ( ! is_singular() ) ) {
			return;
		}
		?>
			<?php do_action( 'lsx_block_header_top' ); ?>

			<div class="lsx-title-block wp-block-group <?php $this->the_title_width(); ?> <?php $this->the_title_bg_colour_class(); ?>" style="<?php $this->the_title_bg_colour_attr(); ?>">
				<div class="wp-block-group__inner-container">
					<?php $this->lsx_block_title(); ?>
				</div>
			</div>

			<?php do_action( 'lsx_block_header_bottom' ); ?>
		<?php
		remove_action( 'lsx_entry_top', array( $this, 'lsx_block_header' ) );
	}

	/**
	 * Outputs the page title in a WordPress Block format.
	 */
	public function lsx_block_title() {
		$title = apply_filters( 'lsx_block_title', get_the_title() );
		$title = '<h1 class="' . $this->get_title_css() . '" style="' . $this->get_title_colour_attr() . '">' . $title . '</h1>';
		echo wp_kses_post( $title );
	}

	/**
	 * Gets the title css classes.
	 *
	 * @return string
	 */
	public function get_title_css() {
		$classes = '';
		$alignment = get_post_meta( get_the_ID(), 'lsx_title_alignment', true );
		if ( '' === $alignment || false === $alignment ) {
			$alignment = 'center';
		}
		$classes .= ' has-text-align-' . $alignment;

		$colour = get_post_meta( get_the_ID(), 'lsx_title_bg_colour', true );
		if ( '' !== $colour && false !== $colour ) {
			$classes .= ' has-text-color';
		}

		return $classes;
	}

	/**
	 * Gets the width you want for the parent group block .
	 */
	public function the_title_width() {
		$classes = '';
		$width   = get_post_meta( get_the_ID(), 'lsx_title_width', true );
		if ( '' === $width || false === $width ) {
			$width = 'content';
		}
		$classes = 'align' . $width;
		echo esc_attr( $classes );
	}

	/**
	 * Gets the width you want for the parent group block .
	 *
	 * @return string
	 */
	public function the_title_bg_colour_class() {
		$classes = '';
		$colour  = get_post_meta( get_the_ID(), 'lsx_title_bg_colour', true );
		if ( '' !== $colour && false !== $colour ) {
			$classes = ' has-background';
		}
		echo esc_attr( $classes );
	}

	/**
	 * Gets the width you want for the parent group block .
	 *
	 * @return string
	 */
	public function the_title_bg_colour_attr() {
		$attr   = '';
		$colour = get_post_meta( get_the_ID(), 'lsx_title_bg_colour', true );
		if ( '' !== $colour && false !== $colour ) {
			$attr = ' background-color:' . $colour . ';';
		}
		echo esc_attr( $attr );
	}

	/**
	 * Gets the colour for the title text.
	 *
	 * @return string
	 */
	public function get_title_colour_attr() {
		$attr   = '';
		$colour = get_post_meta( get_the_ID(), 'lsx_title_colour', true );
		if ( '' !== $colour && false !== $colour ) {
			$attr = ' color:' . $colour . ';';
		}
		return $attr;
	}
}
