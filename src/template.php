<?php
/**
 * Template.
 *
 * @package @external-meta-block
 */

global $post;

$tag_name      = $attributes['tagName'];
$meta_key      = $attributes['metaKey'];
$meta_value    = '';
$external_post = $block->context['post'];

/**
 * This needs some thought, it is a quick and dirty way to get
 * the meta from a path.
 */
if ( strpos( $meta_key, ' ' ) !== false ) {
	$meta_key_path = explode( ' ', $meta_key );
	$meta_value    = $external_post;
	foreach ( $meta_key_path as $meta_key_item ) {
		$meta_value = (array) $meta_value[ $meta_key_item ];
	}
} else {
	$meta_value = $external_post[ $meta_key ];
}

if ( is_array( $meta_value ) ) {
	$meta_value = array_shift( $meta_value );
}

?>

<<?php echo esc_attr( $tag_name ); ?> <?php echo get_block_wrapper_attributes(); ?>>
	<?php echo esc_html( $meta_value ); ?>
</<?php echo esc_attr( $tag_name ); ?>>
