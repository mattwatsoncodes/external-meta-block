<?php
/**
 * Plugin Name:       External Meta Block
 * Description:       Proof of Concept block that outputs a post meta field within an External Query Loop Post Template block.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Matt Watson
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       external-meta-block
 * Domain Path:       external-meta-block
 *
 * @package           external-meta-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function external_meta_block_external_meta_block_block_init() {
	register_block_type(
		__DIR__ . '/build',
		array(
			'render_callback' => 'external_meta_block_external_meta_block_render_callback',
		)
	);
}
add_action( 'init', 'external_meta_block_external_meta_block_block_init' );

/**
 * Render callback function.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string The rendered output.
 */
function external_meta_block_external_meta_block_render_callback( $attributes, $content, $block ) {
	ob_start();
	require plugin_dir_path( __FILE__ ) . 'build/template.php';
	return ob_get_clean();
}
