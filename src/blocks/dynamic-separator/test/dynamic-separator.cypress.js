/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Dynamic Seperator Block', function() {
	/**
   * Test that we can add a dynamic separator block to the page
   */
	it( 'Test dynamic separator block saves properly.', function() {
		helpers.addCoBlocksBlockToPage( true, 'dynamic-separator' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'dynamic-separator' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'exist' );

		helpers.editPage();
	} );

	/**
   * Test dynamic separator styles
   */
	it( 'Test dynamic separator styles.', function() {
		helpers.addCoBlocksBlockToPage( true, 'dynamic-separator' );

		helpers.openSettingsPanel( 'Styles' );

		cy.get( '.block-editor-block-styles__item-label' )
			.contains( 'Line' )
			.click();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'is-style-line' );

		cy.get( '.block-editor-block-styles__item-label' )
			.contains( 'Dot' )
			.click();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'is-style-dots' );

		cy.get( '.block-editor-block-styles__item-label' )
			.contains( 'Fullwidth' )
			.click();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'is-style-fullwidth' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'dynamic-separator' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'is-style-fullwidth' );

		helpers.editPage();
	} );

	/**
   * Test dynamic separator styles
   */
	it( 'Test dynamic separator colors.', function() {
		helpers.addCoBlocksBlockToPage( true, 'dynamic-separator' );

		helpers.setColorSetting( 'color', '#55e7ff' );

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.css', 'color' )
			.and( 'equal', helpers.hexToRGB( '#55e7ff' ) );

		helpers.setColorSetting( 'color', '#f70479' );

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.css', 'color' )
			.and( 'equal', helpers.hexToRGB( '#f70479' ) );

		helpers.savePage();

		helpers.checkForBlockErrors( 'dynamic-separator' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'has-background' )
			.and( 'have.css', 'color' )
			.and( 'equal', helpers.hexToRGB( '#f70479' ) );

		helpers.editPage();
	} );

	/**
   * Test that we can add a dynamic separator block to the page and alter it's height
   */
	it( 'Test dynamic separator height increase.', function() {
		helpers.addCoBlocksBlockToPage( true, 'dynamic-separator' );

		helpers.openSettingsPanel( 'Dynamic HR Settings' );
		cy.get( '.components-panel__body.is-opened input[type="number"]' )
			.clear()
			.type( 200 );

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.css', 'height' )
			.and( 'match', /200/ );

		helpers.savePage();

		helpers.checkForBlockErrors( 'dynamic-separator' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'exist' )
			.and( 'have.css', 'height' )
			.and( 'match', /200/ );

		helpers.editPage();
	} );

	/**
   * Test dynamic separator custom class
   */
	it( 'Test dynamic separator custom class.', function() {
		helpers.addCoBlocksBlockToPage( true, 'dynamic-separator' );

		helpers.addCustomBlockClass( 'my-custom-class', 'dynamic-separator' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'dynamic-separator' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-dynamic-separator' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );
