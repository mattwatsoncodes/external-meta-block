import { get } from 'lodash';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Note that the context comes from `usesContext` in block.json,
 * this is needed so the context from the query loop is passed into
 * the block.
 */
export default function Edit( {
	attributes: {
		metaKey,
		tagName
	},
	context: {
		post,
	},
	setAttributes
} ) {
	const metaKeys = [];

	/**
	 * This would need to be a proper recursive function,
	 * this is a quick and dirty hack to just get the next level
	 * in the object.
	 *
	 * Some thought would be needed around how we treat arrays, objects
	 * etc... as we load this data with no knowledge of its structure.
	 */
	Object.entries( post ).forEach( ( entry ) => {
		if ( typeof entry[1] === 'string' ) {
			metaKeys.push( { label: entry[0], value: entry[0] } );
		}

		if ( typeof entry[1] === 'object' ) {
			Object.entries( entry[1] ).forEach( ( object ) => {
				if ( typeof object[1] === 'string' ) {
					metaKeys.push( { label: entry[0] + '.' + object[0], value: entry[0] + ' ' + object[0] } );
				}
			} );
		}
	} );

	metaKeys.unshift( { label: __( 'Please Select...', 'external-meta-block '), value: '' } );

	console.log( 'metaKey', metaKey );

	let metaValue = '';
	if ( metaKey.includes( ' ' ) ) {
		const metaKeyPath = metaKey.split( ' ' );
		metaValue = get( post, [ ...metaKeyPath ] ) || ''
	} else {
		metaValue = post[ metaKey ] || '';
	}

	const TagName = tagName || 'span';

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				className="external-meta-block-settings"
				title={ __( 'Settings', 'external-meta-block' ) }
			>
				{ /* Not an extensive list of tags, but placed here as an example */ }
				<SelectControl
					help={ __( 'Choose the tag that should wrap the meta value.', 'external-meta-block' ) }
					label={ __( 'Tag', 'external-meta-block' ) }
					options={ [
						{ label: 'div', value: 'div' },
						{ label: 'h1', value: 'h1' },
						{ label: 'h2', value: 'h2' },
						{ label: 'h3', value: 'h3' },
						{ label: 'h4', value: 'h4' },
						{ label: 'h5', value: 'h5' },
						{ label: 'h6', value: 'h6' },
						{ label: 'p', value: 'p' },
						{ label: 'span', value: 'span' },
					] }
					value={ tagName }
					onChange={ ( tagName ) => setAttributes( { tagName } ) }
				/>
				<SelectControl
					help={ __( 'Choose the meta key that you wish to output.', 'external-meta-block' ) }
					label={ __( 'Meta Key', 'external-meta-block' ) }
					options={ metaKeys }
					value={ metaKey }
					onChange={ ( metaKey ) => setAttributes( { metaKey } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);

	// If no metaValue is present we should output a placeholder block.
	return (
		<TagName { ...useBlockProps() }>
			{ inspectorControls }
			{ metaValue !== '' ? metaValue : __( 'Please select a meta key.', 'external-meta-block' ) }
		</TagName>
	);
}
