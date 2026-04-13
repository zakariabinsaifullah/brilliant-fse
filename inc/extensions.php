<?php
/**
 * Block Editor Extensions
 *
 * Enqueues assets for block editor extensions that live in build/extensions/.
 * Extensions are different from custom blocks — they extend existing blocks
 * rather than registering new block types.
 *
 * @package Brilliant_FSE
 */

if ( ! function_exists( 'brilliant_enqueue_hover_color_editor_assets' ) ) :
	/**
	 * Enqueues the hover-color extension script and editor stylesheet.
	 * Runs on `enqueue_block_editor_assets` (editor only).
	 */
	function brilliant_enqueue_hover_color_editor_assets() {
		$asset_file = get_theme_file_path( 'build/extensions/hover-color/index.asset.php' );

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$assets = require $asset_file;

		wp_enqueue_script(
			'brilliant-hover-color-extension',
			get_theme_file_uri( 'build/extensions/hover-color/index.js' ),
			$assets['dependencies'],
			$assets['version'],
			true
		);

		$editor_css = get_theme_file_path( 'build/extensions/hover-color/index.css' );
		if ( file_exists( $editor_css ) ) {
			wp_enqueue_style(
				'brilliant-hover-color-extension',
				get_theme_file_uri( 'build/extensions/hover-color/index.css' ),
				array(),
				$assets['version']
			);
		}
	}
endif;
add_action( 'enqueue_block_editor_assets', 'brilliant_enqueue_hover_color_editor_assets' );


if ( ! function_exists( 'brilliant_enqueue_hover_color_frontend_assets' ) ) :
	/**
	 * Enqueues the hover-color extension frontend stylesheet.
	 * Runs on `enqueue_block_assets` (editor + front end).
	 */
	function brilliant_enqueue_hover_color_frontend_assets() {
		$asset_file  = get_theme_file_path( 'build/extensions/hover-color/index.asset.php' );
		$style_file  = get_theme_file_path( 'build/extensions/hover-color/style-index.css' );

		if ( ! file_exists( $asset_file ) || ! file_exists( $style_file ) ) {
			return;
		}

		$assets = require $asset_file;

		wp_enqueue_style(
			'brilliant-hover-color-extension-style',
			get_theme_file_uri( 'build/extensions/hover-color/style-index.css' ),
			array(),
			$assets['version']
		);
	}
endif;
add_action( 'enqueue_block_assets', 'brilliant_enqueue_hover_color_frontend_assets' );
