<?php

function brilliant_register_team_cpt() {
    $labels = [
        'name'                  => _x( 'Team', 'Post Type General Name', 'brilliant' ),
        'singular_name'         => _x( 'Team Member', 'Post Type Singular Name', 'brilliant' ),
        'menu_name'             => __( 'Team', 'brilliant' ),
        'name_admin_bar'        => __( 'Team Member', 'brilliant' ),
        'archives'              => __( 'Team Archives', 'brilliant' ),
        'attributes'            => __( 'Team Attributes', 'brilliant' ),
        'parent_item_colon'     => __( 'Parent Team Member:', 'brilliant' ),
        'all_items'             => __( 'All Members', 'brilliant' ),
        'add_new_item'          => __( 'Add New Member', 'brilliant' ),
        'add_new'               => __( 'Add New', 'brilliant' ),
        'new_item'              => __( 'New Member', 'brilliant' ),
        'edit_item'             => __( 'Edit Member', 'brilliant' ),
        'update_item'           => __( 'Update Member', 'brilliant' ),
        'view_item'             => __( 'View Member', 'brilliant' ),
        'view_items'            => __( 'View Team', 'brilliant' ),
        'search_items'          => __( 'Search Team Member', 'brilliant' ),
        'not_found'             => __( 'Not found', 'brilliant' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'brilliant' ),
        'featured_image'        => __( 'Featured Image', 'brilliant' ),
        'set_featured_image'    => __( 'Set featured image', 'brilliant' ),
        'remove_featured_image' => __( 'Remove featured image', 'brilliant' ),
        'use_featured_image'    => __( 'Use as featured image', 'brilliant' ),
        'insert_into_item'      => __( 'Insert into item', 'brilliant' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'brilliant' ),
        'items_list'            => __( 'Team list', 'brilliant' ),
        'items_list_navigation' => __( 'Team list navigation', 'brilliant' ),
        'filter_items_list'     => __( 'Filter team list', 'brilliant' ),
    ];
    $args = [
        'label'                 => __( 'Team Member', 'brilliant' ),
        'labels'                => $labels,
        'supports'              => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
        'hierarchical'          => false,
        'public'                => false, // No single view natively
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-groups',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => false,
        'can_export'            => true,
        'has_archive'           => false,
        'exclude_from_search'   => true,
        'publicly_queryable'    => false,
        'show_in_rest'          => true, // required for block editor
    ];
    register_post_type( 'team', $args );
}
add_action( 'init', 'brilliant_register_team_cpt', 0 );


/**
 * Register Meta Boxes for Team CPT
 */
function brilliant_team_meta_boxes() {
    add_meta_box(
        'brilliant_team_meta',
        __( 'Team Member Details', 'brilliant' ),
        'brilliant_team_meta_callback',
        'team',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'brilliant_team_meta_boxes' );

function brilliant_team_meta_callback( $post ) {
    wp_nonce_field( 'brilliant_team_meta_nonce_action', 'brilliant_team_meta_nonce' );

    $designation = get_post_meta( $post->ID, '_team_designation', true );
    $email       = get_post_meta( $post->ID, '_team_email', true );
    $phone       = get_post_meta( $post->ID, '_team_phone', true );

    echo '<div style="margin-bottom: 15px;">';
    echo '<label for="team_designation" style="display:block; font-weight:bold; margin-bottom:5px;">' . __( 'Designation', 'brilliant' ) . '</label>';
    echo '<input type="text" id="team_designation" name="team_designation" value="' . esc_attr( $designation ) . '" style="width:100%;">';
    echo '</div>';

    echo '<div style="margin-bottom: 15px;">';
    echo '<label for="team_email" style="display:block; font-weight:bold; margin-bottom:5px;">' . __( 'Email', 'brilliant' ) . '</label>';
    echo '<input type="email" id="team_email" name="team_email" value="' . esc_attr( $email ) . '" style="width:100%;">';
    echo '</div>';

    echo '<div style="margin-bottom: 15px;">';
    echo '<label for="team_phone" style="display:block; font-weight:bold; margin-bottom:5px;">' . __( 'Phone', 'brilliant' ) . '</label>';
    echo '<input type="text" id="team_phone" name="team_phone" value="' . esc_attr( $phone ) . '" style="width:100%;">';
    echo '</div>';
}

function brilliant_save_team_meta( $post_id ) {
    if ( ! isset( $_POST['brilliant_team_meta_nonce'] ) ) {
        return;
    }
    if ( ! wp_verify_nonce( $_POST['brilliant_team_meta_nonce'], 'brilliant_team_meta_nonce_action' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    if ( isset( $_POST['team_designation'] ) ) {
        update_post_meta( $post_id, '_team_designation', sanitize_text_field( wp_unslash( $_POST['team_designation'] ) ) );
    }
    if ( isset( $_POST['team_email'] ) ) {
        update_post_meta( $post_id, '_team_email', sanitize_email( wp_unslash( $_POST['team_email'] ) ) );
    }
    if ( isset( $_POST['team_phone'] ) ) {
        update_post_meta( $post_id, '_team_phone', sanitize_text_field( wp_unslash( $_POST['team_phone'] ) ) );
    }
}
add_action( 'save_post_team', 'brilliant_save_team_meta' );

/**
 * Add Custom Columns for Team CPT List View
 */
function brilliant_team_columns( $columns ) {
	$new_columns = [];
	foreach ( $columns as $key => $title ) {
		$new_columns[ $key ] = $title;

		// Insert the ID column immediately after the title.
		if ( 'title' === $key ) {
			$new_columns['post_id'] = __( 'ID', 'brilliant' );
		}

		// Insert meta columns immediately before the date.
		if ( 'date' === $key ) {
			unset( $new_columns['date'] );
			$new_columns['team_designation'] = __( 'Designation', 'brilliant' );
			$new_columns['team_email']       = __( 'Email', 'brilliant' );
			$new_columns['team_phone']       = __( 'Phone', 'brilliant' );
			$new_columns['date']             = $title;
		}
	}
	return $new_columns;
}
add_filter( 'manage_team_posts_columns', 'brilliant_team_columns' );


function brilliant_team_custom_column( $column, $post_id ) {
	switch ( $column ) {
		case 'post_id':
			printf(
				'<span class="brilliant-copy-id" data-id="%1$s" title="%2$s">%1$s</span>',
				esc_attr( $post_id ),
				esc_attr__( 'Click to copy ID', 'brilliant' )
			);
			break;

		case 'team_designation':
			echo esc_html( get_post_meta( $post_id, '_team_designation', true ) );
			break;

		case 'team_email':
			$email = get_post_meta( $post_id, '_team_email', true );
			if ( $email ) {
				echo '<a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>';
			}
			break;

		case 'team_phone':
			echo esc_html( get_post_meta( $post_id, '_team_phone', true ) );
			break;
	}
}
add_action( 'manage_team_posts_custom_column', 'brilliant_team_custom_column', 10, 2 );


/**
 * Styles and script for the Post ID copy badge — only on the Team list screen.
 */
function brilliant_team_admin_assets( $hook ) {
	global $post_type;

	if ( 'edit.php' !== $hook || 'team' !== $post_type ) {
		return;
	}

	// Inline styles for the ID badge.
	echo '<style>
		.column-post_id { width: 56px; text-align: center; }
		.brilliant-copy-id {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			min-width: 36px;
			padding: 2px 8px;
			background: #f0f0f1;
			border: 1px solid #c3c4c7;
			border-radius: 3px;
			font-size: 12px;
			font-family: monospace;
			cursor: pointer;
			user-select: none;
			transition: background 0.15s, color 0.15s;
		}
		.brilliant-copy-id:hover     { background: #dcdcde; }
		.brilliant-copy-id.is-copied { background: #00a32a; color: #fff; border-color: #00a32a; }
	</style>';
}
add_action( 'admin_head', 'brilliant_team_admin_assets' );


function brilliant_team_copy_id_script( $hook ) {
	global $post_type;

	if ( 'edit.php' !== $hook || 'team' !== $post_type ) {
		return;
	}

	echo "<script>
		document.addEventListener( 'DOMContentLoaded', function () {
			document.querySelectorAll( '.brilliant-copy-id' ).forEach( function ( badge ) {
				badge.addEventListener( 'click', function () {
					const id   = this.dataset.id;
					const self = this;

					const markCopied = () => {
						self.classList.add( 'is-copied' );
						self.textContent = 'Copied!';
						setTimeout( () => {
							self.classList.remove( 'is-copied' );
							self.textContent = id;
						}, 1500 );
					};

					if ( navigator.clipboard && window.isSecureContext ) {
						navigator.clipboard.writeText( id ).then( markCopied );
					} else {
						const el = document.createElement( 'input' );
						el.value = id;
						el.style.cssText = 'position:absolute;left:-9999px;top:-9999px';
						document.body.appendChild( el );
						el.select();
						document.execCommand( 'copy' );
						document.body.removeChild( el );
						markCopied();
					}
				} );
			} );
		} );
	</script>";
}
add_action( 'admin_footer', 'brilliant_team_copy_id_script' );
