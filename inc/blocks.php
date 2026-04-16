<?php
/**
 * Custom Block Registration
 *
 * Registers all custom block types from the build directory.
 *
 * WHY the manifest-collection APIs are intentionally avoided:
 * `wp_register_block_types_from_metadata_collection()` registers every entry in
 * the manifest without checking whether the block directory actually exists under
 * the supplied base path.  Our manifest includes entries that live outside
 * build/blocks/ (e.g. extensions), which causes WordPress to pass null to
 * dirname() when it cannot resolve the file paths — producing PHP deprecation
 * warnings.  Using a manual loop with an is_dir() guard is the safe alternative.
 *
 * @package Brilliant_FSE
 */

if ( ! function_exists( 'brilliant_register_blocks' ) ) :
	/**
	 * Registers custom blocks from the build directory.
	 *
	 * Registration order:
	 * 1. If build/blocks exists, use the manifest for metadata caching (WP 6.5+)
	 *    then register only the blocks whose directories actually exist.
	 * 2. If no manifest, scan build/blocks/ directly.
	 * 3. If build/ does not exist at all, fall back to src/ for development.
	 */
	function brilliant_register_blocks() {
		$build_dir     = __DIR__ . '/../build/blocks';
		$manifest_path = __DIR__ . '/../build/blocks-manifest.php';
		$src_dir       = __DIR__ . '/../src/blocks';

		// ── No build directory ────────────────────────────────────────────────
		// Development-only fallback: register directly from source.
		if ( ! is_dir( $build_dir ) ) {
			if ( is_dir( $src_dir ) ) {
				foreach ( glob( $src_dir . '/*', GLOB_ONLYDIR ) as $block_path ) {
					if ( file_exists( $block_path . '/block.json' ) && file_exists( $block_path . '/index.asset.php' ) ) {
						register_block_type( $block_path );
					}
				}
			}
			return;
		}

		// ── Build directory exists ─────────────────────────────────────────────

		// Pre-populate the metadata cache when supported (WP 6.5+).
		// This is a performance optimisation only — it does not register blocks.
		if ( function_exists( 'wp_register_block_metadata_collection' ) && file_exists( $manifest_path ) ) {
			wp_register_block_metadata_collection( $build_dir, $manifest_path );
		}

		// Register blocks from the manifest, skipping any entry whose directory
		// does not exist under build/blocks/ (e.g. extensions listed in the manifest).
		if ( file_exists( $manifest_path ) ) {
			$manifest = require $manifest_path;

			foreach ( array_keys( $manifest ) as $block_slug ) {
				$block_dir = $build_dir . '/' . $block_slug;

				if ( is_dir( $block_dir ) && file_exists( $block_dir . '/block.json' ) && file_exists( $block_dir . '/index.asset.php' ) ) {
					register_block_type( $block_dir );
				}
			}

			return;
		}

		// No manifest — scan the build directory directly as a last resort.
		foreach ( glob( $build_dir . '/*', GLOB_ONLYDIR ) as $block_dir ) {
			if ( file_exists( $block_dir . '/block.json' ) && file_exists( $block_dir . '/index.asset.php' ) ) {
				register_block_type( $block_dir );
			}
		}
	}
endif;
add_action( 'init', 'brilliant_register_blocks' );
