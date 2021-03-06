/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Logos Block', function () {
	/**
	 * Setup Logos data
	 */
	const logosData = {
		fileName: '150x150.png',
		imageBase: '150x150',
		pathToFixtures: '../.dev/tests/cypress/fixtures/images/',
	};

	/**
	 * Test that we can add a logos block to the content, not add any images or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'Test logos block saves with empty values.', function () {
		helpers.addCoBlocksBlockToPage( true, 'logos' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'logos' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-logos' ).should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can upload images to block and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test logos block saves with image upload.', function () {
		const { fileName, imageBase, pathToFixtures } = logosData;
		helpers.addCoBlocksBlockToPage( true, 'logos' );

		cy.get( '.wp-block[data-type="coblocks/logos"]' )
			.click();

		cy.fixture( pathToFixtures + fileName, 'base64' ).then( fileContent => {
			cy.get( 'div[data-type="coblocks/logos"]' )
				.find( 'div.components-drop-zone' ).first()
				.upload(
					{ fileContent, fileName, mimeType: 'image/png' },
					{ subjectType: 'drag-n-drop', force: true, events: [ 'dragstart', 'dragover', 'drop' ] },
				)
				.wait( 2000 ); // Allow upload to finish.

			cy.get( '.wp-block-coblocks-logos' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

			helpers.savePage();

			helpers.checkForBlockErrors( 'logos' );

			helpers.viewPage();

			cy.get( '.wp-block-coblocks-logos' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

			helpers.editPage();
		} );
	} );

	/**
	 * Test that we can add image from library and are able
	 * to successfully save the block without errors.
	 */
	it( 'Test logos block saves with image from media library.', function () {
		helpers.addCoBlocksBlockToPage( true, 'logos' );

		cy.get( '.wp-block[data-type="coblocks/logos"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();

		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'logos' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-logos' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-logos' ).find( 'img' ).should( 'have.attr', 'src' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add "black and white" image filter and
	 * successfully save the block without errors.
	 */
	it( 'Test logos block saves with black and white filter.', function () {
		helpers.addCoBlocksBlockToPage( true, 'logos' );

		cy.get( '.wp-block[data-type="coblocks/logos"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();

		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.setBlockStyle( /black & white/i );

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-black-and-white' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'logos' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-black-and-white' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add image "grayscale" filter and
	 * successfully save the block without errors.
	 */
	it( 'Test logos block saves with grayscale filter.', function () {
		helpers.addCoBlocksBlockToPage( true, 'logos' );

		cy.get( '.wp-block[data-type="coblocks/logos"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();

		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.setBlockStyle( /grayscale/i );

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-grayscale' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'logos' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-grayscale' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add image "default" filter and
	 * successfully save the block without errors.
	 */
	it( 'Test logos block saves with default filter.', function () {
		helpers.addCoBlocksBlockToPage( true, 'logos' );

		cy.get( '.wp-block[data-type="coblocks/logos"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();

		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.setBlockStyle( /default/i );

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-default' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'logos' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-logos' ).should( 'have.class', 'is-style-default' );

		helpers.editPage();
	} );
} );
