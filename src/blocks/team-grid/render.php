<?php
/**
 * Team Grid block render template.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content (unused).
 * @var WP_Block $block      Block instance.
 */

// ── Resolve attributes ─────────────────────────────────────────────────────────
$order_by     = $attributes['orderBy']    ?? 'menu_order';
$selected_ids = $attributes['selectedIds'] ?? '';
$block_style  = $attributes['blockStyle'] ?? [];

// Parse comma-separated IDs into a clean array of positive integers.
$post_in = [];
if ( ! empty( trim( $selected_ids ) ) ) {
	$post_in = array_values(
		array_filter(
			array_map( 'absint', explode( ',', $selected_ids ) ),
			fn( $id ) => $id > 0
		)
	);
}

// ── Build the wrapper inline style from CSS custom properties ──────────────────
$style_parts = [];
foreach ( $block_style as $property => $value ) {
	if ( ! empty( $value ) ) {
		$style_parts[] = esc_attr( $property ) . ':' . esc_attr( $value );
	}
}
$inline_style = implode( ';', $style_parts );

$wrapper_attributes = get_block_wrapper_attributes(
	! empty( $inline_style ) ? [ 'style' => $inline_style ] : []
);

// ── Query team members ─────────────────────────────────────────────────────────
$query_args = [
	'post_type'      => 'team',
	'posts_per_page' => -1,
	'post_status'    => 'publish',
	'no_found_rows'  => true, // skips pagination count for performance
];

if ( ! empty( $post_in ) ) {
	// Show only the selected members in the user-specified ID order.
	$query_args['post__in'] = $post_in;
	$query_args['orderby']  = 'post__in';
} else {
	// Show all members using the chosen sort order.
	$query_args['orderby'] = $order_by;
	$query_args['order']   = 'ASC';
}

$members_query = new WP_Query( $query_args );

if ( ! $members_query->have_posts() ) {
	echo '<div ' . $wrapper_attributes . '>';
	echo '<p class="brilliant-team-grid__empty">' . esc_html__( 'No team members found.', 'brilliant' ) . '</p>';
	echo '</div>';
	return;
}
?>

<div <?php echo $wrapper_attributes; ?>>

	<div class="brilliant-team-grid__grid">

		<?php while ( $members_query->have_posts() ) : $members_query->the_post(); ?>
		<?php
			$post_id     = get_the_ID();
			$name        = get_the_title();
			$designation = get_post_meta( $post_id, '_team_designation', true );
			$phone       = get_post_meta( $post_id, '_team_phone',       true );
			$email       = get_post_meta( $post_id, '_team_email',       true );
			$bio         = apply_filters( 'the_content', get_the_content() );
			$image_url   = get_the_post_thumbnail_url( $post_id, 'medium' );
			$image_alt   = get_post_meta( get_post_thumbnail_id( $post_id ), '_wp_attachment_image_alt', true ) ?: $name;

			// All member data is stored as JSON on the card element.
			// view.js reads this to populate the popup without a round-trip request.
			$member_data = wp_json_encode( [
				'name'        => $name,
				'designation' => $designation,
				'phone'       => $phone,
				'email'       => $email,
				'bio'         => $bio,
				'imageUrl'    => $image_url,
				'imageAlt'    => $image_alt,
			] );
		?>

		<article
			class="brilliant-team-card"
			data-member="<?php echo esc_attr( $member_data ); ?>"
			tabindex="0"
			role="button"
			aria-label="<?php echo esc_attr( sprintf( __( 'View %s profile', 'brilliant' ), $name ) ); ?>"
		>
			<div class="brilliant-team-card__image-wrap">

				<?php if ( has_post_thumbnail() ) : ?>
				<img
					src="<?php echo esc_url( $image_url ); ?>"
					alt="<?php echo esc_attr( $image_alt ); ?>"
					class="brilliant-team-card__image"
					loading="lazy"
				>
				<?php endif; ?>

				<div class="brilliant-team-card__overlay" aria-hidden="true">
					<svg class="brilliant-team-card__overlay-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
					</svg>
				</div>

			</div>

			<div class="brilliant-team-card__body">

				<h3 class="brilliant-team-card__name">
					<?php echo esc_html( $name ); ?>
				</h3>

				<?php if ( $designation ) : ?>
				<p class="brilliant-team-card__designation">
					<?php echo esc_html( $designation ); ?>
				</p>
				<?php endif; ?>

				<?php if ( $phone || $email ) : ?>
				<div class="brilliant-team-card__contact">

					<?php if ( $phone ) : ?>
					<a
						class="brilliant-team-card__contact-link"
						href="tel:<?php echo esc_attr( preg_replace( '/[^0-9+]/', '', $phone ) ); ?>"
						aria-label="<?php echo esc_attr( sprintf( __( 'Call %s', 'brilliant' ), $name ) ); ?>"
						onclick="event.stopPropagation();"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
							<path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
						</svg>
					</a>
					<?php endif; ?>

					<?php if ( $email ) : ?>
					<a
						class="brilliant-team-card__contact-link"
						href="mailto:<?php echo esc_attr( $email ); ?>"
						aria-label="<?php echo esc_attr( sprintf( __( 'Email %s', 'brilliant' ), $name ) ); ?>"
						onclick="event.stopPropagation();"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
							<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
						</svg>
					</a>
					<?php endif; ?>

				</div>
				<?php endif; ?>

			</div>
		</article>

		<?php endwhile; wp_reset_postdata(); ?>

	</div>

	<?php /* ── Popup shell — populated by view.js on card click ─────────── */ ?>
	<div
		class="brilliant-team-grid__popup"
		role="dialog"
		aria-modal="true"
		aria-hidden="true"
		aria-label="<?php esc_attr_e( 'Team member profile', 'brilliant' ); ?>"
	>
		<div class="brilliant-team-grid__popup-overlay" aria-hidden="true"></div>

		<div class="brilliant-team-grid__popup-dialog">

			<button
				class="brilliant-team-grid__popup-close"
				aria-label="<?php esc_attr_e( 'Close', 'brilliant' ); ?>"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
				</svg>
			</button>

			<div class="brilliant-team-grid__popup-content">
				<?php /* JS populates this */ ?>
			</div>

		</div>
	</div>

</div>
