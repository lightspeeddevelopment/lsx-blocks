/**
 * Get registerPlugin.
 */
const { __ } = wp.i18n;
const { registerPlugin } = wp.plugins;
const { PluginDocumentSettingPanel } = wp.editPost;
const { useSelect } = wp.data;
const { PostFeaturedImage } = wp.editor;

import DisableBanner from './components/disable-banner';
import BannerWidth from './components/banner-width';
import TextColour from './components/text-colour';
import BackgroundColour from './components/background-colour';
import LSXImageUploadPanel from './components/media-upload';

const lsxHeaderPanel = () => {
	// Return the output of the Plugin Setting Panel.
	return (
		<PluginDocumentSettingPanel
			name={ 'lsx_header_panel' }
			title={ __( 'Header', 'lsx-blocks' ) }
			className={ 'lsx-page-banner-panel lsx-header-panel' }
		>
			<div className={ 'lsx-panel-row' }
			>
				<div className={ 'lsx-col-2' }
				>
					<DisableBanner />
				</div>
				<div className={ 'lsx-col-2' }
				>
					<BannerWidth />
				</div>
			</div>
			<div className={ 'lsx-panel-row background-colour' }
			>
				<BackgroundColour />
			</div>
			<div className={ 'lsx-panel-row' }
			>
				<LSXImageUploadPanel />
			</div>
		</PluginDocumentSettingPanel>
	);
};

/**
 * register the plugin.
 */
registerPlugin( 'lsx-header-panel', { render: lsxHeaderPanel, icon: false } );
