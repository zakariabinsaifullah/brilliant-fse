document.addEventListener( 'DOMContentLoaded', function () {
	// Each block instance is independent — handle multiple grids on one page.
	document.querySelectorAll( '.wp-block-brilliant-team-grid' ).forEach( initGrid );
} );

function initGrid( grid ) {
	const popup    = grid.querySelector( '.brilliant-team-grid__popup' );
	const overlay  = grid.querySelector( '.brilliant-team-grid__popup-overlay' );
	const closeBtn = grid.querySelector( '.brilliant-team-grid__popup-close' );
	const content  = grid.querySelector( '.brilliant-team-grid__popup-content' );

	if ( ! popup || ! content ) return;

	// ── Open ─────────────────────────────────────────────────────────────────
	grid.querySelectorAll( '.brilliant-team-card' ).forEach( function ( card ) {
		// Click to open.
		card.addEventListener( 'click', function () {
			openPopup( this );
		} );

		// Keyboard: Enter / Space to open (card has role="button").
		card.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Enter' || e.key === ' ' ) {
				e.preventDefault();
				openPopup( this );
			}
		} );
	} );

	function openPopup( card ) {
		let member = {};
		try {
			member = JSON.parse( card.dataset.member || '{}' );
		} catch ( err ) {
			return;
		}

		content.innerHTML = buildContent( member );

		popup.removeAttribute( 'aria-hidden' );
		popup.classList.add( 'is-active' );
		document.body.classList.add( 'brilliant-popup-open' );

		// Move focus to the close button for accessibility.
		closeBtn.focus();
	}

	// ── Close ────────────────────────────────────────────────────────────────
	function closePopup() {
		popup.classList.remove( 'is-active' );
		popup.setAttribute( 'aria-hidden', 'true' );
		document.body.classList.remove( 'brilliant-popup-open' );
	}

	overlay.addEventListener( 'click', closePopup );
	closeBtn.addEventListener( 'click', closePopup );

	// Close on Escape key.
	document.addEventListener( 'keydown', function ( e ) {
		if ( e.key === 'Escape' && popup.classList.contains( 'is-active' ) ) {
			closePopup();
		}
	} );

	// ── Build popup HTML from member data ─────────────────────────────────────
	function buildContent( m ) {
		const photoHtml = m.imageUrl
			? `<div class="brilliant-team-popup__photo">
				<img src="${ esc( m.imageUrl ) }" alt="${ esc( m.imageAlt || m.name ) }" loading="lazy">
			   </div>`
			: '';

		const phoneHtml = m.phone
			? `<p class="brilliant-team-popup__meta">
				<strong>Phone:</strong>
				<a href="tel:${ esc( m.phone.replace( /[^0-9+]/g, '' ) ) }">${ esc( m.phone ) }</a>
			   </p>`
			: '';

		const emailHtml = m.email
			? `<p class="brilliant-team-popup__meta">
				<strong>Email:</strong>
				<a href="mailto:${ esc( m.email ) }">${ esc( m.email ) }</a>
			   </p>`
			: '';

		// Bio comes from apply_filters('the_content') in PHP — it is trusted HTML.
		const bioHtml = m.bio
			? `<div class="brilliant-team-popup__bio">
				<h3 class="brilliant-team-popup__bio-title">Experience and Background</h3>
				<div class="brilliant-team-popup__bio-content">${ m.bio }</div>
			   </div>`
			: '';

		return `
			<div class="brilliant-team-popup__header">
				${ photoHtml }
				<div class="brilliant-team-popup__info">
					<h2 class="brilliant-team-popup__name">${ esc( m.name ) }</h2>
					${ m.designation
						? `<p class="brilliant-team-popup__designation">${ esc( m.designation ) }</p>`
						: ''
					}
					${ phoneHtml }
					${ emailHtml }
				</div>
			</div>
			${ bioHtml }
		`;
	}
}

/**
 * Escapes a string for safe insertion into HTML text / attribute values.
 * Only used for plain-text fields from the member data object.
 *
 * @param {*} value
 * @return {string}
 */
function esc( value ) {
	return String( value ?? '' )
		.replace( /&/g,  '&amp;'  )
		.replace( /</g,  '&lt;'   )
		.replace( />/g,  '&gt;'   )
		.replace( /"/g,  '&quot;' )
		.replace( /'/g,  '&#39;'  );
}
