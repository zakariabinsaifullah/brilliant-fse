<?php
/**
 * Block & Pattern Categories
 *
 * Registers custom block categories and block pattern categories
 * used throughout this theme.
 *
 * @package Brilliant_FSE
 */

if ( ! function_exists( 'brilliantfse_block_categories' ) ) :
	/**
	 * Adds the "Brilliant Blocks" category to the block inserter.
	 *
	 * @param  array                   $block_categories     Existing block categories.
	 * @param  WP_Block_Editor_Context $block_editor_context Current editor context.
	 * @return array
	 */
	function brilliantfse_block_categories( $block_categories, $block_editor_context ) {
		return array_merge(
			array(
				array(
					'slug'  => 'brilliant-blocks',
					'title' => __( 'Brilliant Blocks', 'brilliant' ),
				),
			),
			$block_categories

		);
	}
endif;
add_filter( 'block_categories_all', 'brilliantfse_block_categories', 10, 2 );


if ( ! function_exists( 'brilliantfse_pattern_categories' ) ) :
	/**
	 * Registers the "Brilliant" block pattern category.
	 */
	function brilliantfse_pattern_categories() {
		register_block_pattern_category(
			'brilliant_fse',
			array(
				'label'       => __( 'Brilliant', 'brilliant' ),
				'description' => __( 'A collection of Brilliant patterns.', 'brilliant' ),
			)
		);
	}
endif;
add_action( 'init', 'brilliantfse_pattern_categories' );
