<?php
/**
 * Core Block Styles
 *
 * Registers custom style variations for core (and third-party) blocks.
 *
 * @package Brilliant_FSE
 */

if ( ! function_exists( 'brilliantfse_block_styles' ) ) :
	/**
	 * Registers all custom block style variations for the theme.
	 */
	function brilliantfse_block_styles() {

		// ── Button block ───────────────────────────────────────────────────────

		register_block_style(
			'core/button',
			array(
				'name'  => 'link',
				'label' => __( 'Link', 'brilliant' ),
			)
		);

		register_block_style(
			'core/button',
			array(
				'name'  => 'arrow-link',
				'label' => __( 'Arrow Link', 'brilliant' ),
			)
		);

		register_block_style(
			'core/button',
			array(
				'name'         => 'gradient-fill',
				'label'        => __( 'Gradient Fill', 'brilliant' ),
				'inline_style' => '
				.wp-block-button.is-style-gradient-fill .wp-block-button__link {
					background: var(--wp--preset--gradient--blnt-gradient-accent);
					color: var(--wp--preset--color--blnt-white);
					border: none;
				}
				.wp-block-button.is-style-gradient-fill .wp-block-button__link:hover {
					opacity: 0.9;
				}',
			)
		);

		// ── Heading block ──────────────────────────────────────────────────────

		register_block_style(
			'core/heading',
			array(
				'name'         => 'gradient-bar',
				'label'        => __( 'Gradient Bar', 'brilliant' ),
				'inline_style' => '
				.wp-block-heading.is-style-gradient-bar {
					padding-left: 44px;
					background-image: var(--wp--preset--gradient--blnt-linear-gradient);
					background-size: 20px 100%;
					background-position: left top;
					background-repeat: no-repeat;
				}',
			)
		);

		register_block_style(
			'core/heading',
			array(
				'name'         => 'soft-bar',
				'label'        => __( 'Soft Bar', 'brilliant' ),
				'inline_style' => '
				.wp-block-heading.is-style-soft-bar {
					padding-left: 44px;
					background-image: var(--wp--preset--gradient--blnt-linear);
					background-size: 20px 100%;
					background-position: left top;
					background-repeat: no-repeat;
				}',
			)
		);

		// ── List block ─────────────────────────────────────────────────────────

		register_block_style(
			'core/list',
			array(
				'name'         => 'checkmark-list',
				'label'        => __( 'Checkmark', 'brilliant' ),
				'inline_style' => '
				ul.is-style-checkmark-list {
					list-style-type: "\2713";
				}
				ul.is-style-checkmark-list li {
					padding-inline-start: 1ch;
				}',
			)
		);

		// ── Paragraph block ────────────────────────────────────────────────────

		register_block_style(
			'core/paragraph',
			array(
				'name'         => 'arrow',
				'label'        => __( 'Arrow', 'brilliant' ),
				'inline_style' => '
				p.is-style-arrow::after {
					content: "";
					display: inline-block;
					width: 42px;
					height: 20px;
					margin-left: 15px;
					background-color: currentColor;
					-webkit-mask-image: url("data:image/svg+xml,%3Csvg width=\'60\' height=\'30\' viewBox=\'0 0 60 30\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 5H55V25\' stroke=\'black\' stroke-width=\'1.5\'/%3E%3Cpath d=\'M51 21L55 27L59 21Z\' fill=\'black\'/%3E%3C/svg%3E");
					mask-image: url("data:image/svg+xml,%3Csvg width=\'60\' height=\'30\' viewBox=\'0 0 60 30\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 5H55V25\' stroke=\'black\' stroke-width=\'1.5\'/%3E%3Cpath d=\'M51 21L55 27L59 21Z\' fill=\'black\'/%3E%3C/svg%3E");
					-webkit-mask-size: contain;
					mask-size: contain;
					-webkit-mask-repeat: no-repeat;
					mask-repeat: no-repeat;
					-webkit-mask-position: center;
					mask-position: center;
					vertical-align: middle;
					transform: translateY(5px);
				}',
			)
		);

		// ── Third-party blocks ─────────────────────────────────────────────────

		register_block_style(
			'kadence/rowlayout',
			array(
				'name'  => 'radial-overlay',
				'label' => __( 'Radial Overlay', 'brilliant' ),
			)
		);
	}
endif;
add_action( 'init', 'brilliantfse_block_styles' );
