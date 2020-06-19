!function(e){function t(o){if(n[o])return n[o].exports;var l=n[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(1),n(7)},function(e,t,n){"use strict";var o=n(2),l=n(3),r=(n(4),n(5)),a=n(6),i=wp.i18n.__,c=wp.plugins.registerPlugin,s=wp.editPost.PluginDocumentSettingPanel,u=wp.data.useSelect;wp.editor.PostFeaturedImage;c("lsx-page-banner-panel",{render:function(){var e=u(function(e){return e("core/editor").getCurrentPostType()});return"post"!==e&&"page"!==e?null:wp.element.createElement(s,{name:"lsx_page_banner_panel",title:i("Page Banner","lsx-blocks"),className:"lsx-page-banner-panel"},wp.element.createElement("div",{className:"lsx-panel-row"},wp.element.createElement("div",{className:"lsx-col-2"},wp.element.createElement(o.a,null)),wp.element.createElement("div",{className:"lsx-col-2"},wp.element.createElement(l.a,null))),wp.element.createElement("div",{className:"lsx-panel-row background-colour"},wp.element.createElement(r.a,null)),wp.element.createElement("div",{className:"lsx-panel-row"},wp.element.createElement(a.a,null)))},icon:!1})},function(e,t,n){"use strict";var o=wp.i18n.__,l=wp.components.FormToggle,r=wp.compose.withState,a=wp.data,i=a.useSelect,c=a.useDispatch,s=r({checked:!1})(function(e){var t=e.checked,n=e.setState;t="yes"===i(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_disable_banner},[]);var r=c("core/editor"),a=r.editPost;return wp.element.createElement(l,{id:"lsx-page-banner-disable",help:o("Stop the banner from showing, you will need to add it manually.","lsx-blocks"),value:"yes",checked:t,onChange:function(){return n(function(e){var t="no";return!1===e.checked&&(t="yes"),a({meta:{lsx_disable_banner:t}}),{checked:!e.checked}})}})});t.a=s},function(e,t,n){"use strict";var o=(wp.i18n.__,wp.blockEditor.BlockAlignmentToolbar),l=wp.compose.withState,r=wp.data,a=r.useSelect,i=r.useDispatch,c=l({alignment:void 0})(function(e){var t=e.option,n=(e.setState,i("core/editor")),l=n.editPost,r=a(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_banner_width},[]);t=""===r||"content"===r?void 0:r;var c=function(e){var t=e;void 0===e&&(t="content"),l({meta:{lsx_banner_width:t}})},s=["wide","full"];return wp.element.createElement(o,{value:t,onChange:c,controls:s,wideControlsEnabled:!0})});t.a=c},function(e,t,n){"use strict";var o=wp.i18n.__,l=wp.blockEditor.PanelColorSettings,r=wp.compose.withState,a=wp.data,i=a.useSelect,c=a.useDispatch;r({color:void 0})(function(e){var t=e.color,n=(e.setState,c("core/editor")),r=n.editPost,a=i(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_banner_colour},[]);return t=""===a||"transparent"===a?void 0:a,wp.element.createElement(l,{title:o("Text Color"),initialOpen:!0,colorSettings:[{value:t,label:o("Text Color"),onChange:function(e){var t=e;return void 0===e&&(t="inherit"),r({meta:{lsx_banner_colour:t}}),{selectedTextColour:e}}}]})})},function(e,t,n){"use strict";var o=wp.i18n.__,l=wp.blockEditor.PanelColorSettings,r=wp.compose.withState,a=wp.data,i=a.useSelect,c=a.useDispatch,s=r({color:void 0})(function(e){var t=e.color,n=(e.setState,c("core/editor")),r=n.editPost,a=i(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_banner_bg_colour},[]);return t=""===a||"transparent"===a?void 0:a,wp.element.createElement(l,{title:o("Background Color"),initialOpen:!0,colorSettings:[{value:t,label:o("Background Color"),onChange:function(e){var t=e;return void 0===e&&(t="transparent"),r({meta:{lsx_banner_bg_colour:t}}),{selectedBgColour:e}}}]})});t.a=s},function(e,t,n){"use strict";var o=wp.i18n.__,l=wp.components.Button,r=wp.blockEditor,a=r.MediaUpload,i=r.MediaUploadCheck,c=["image"],s=wp.compose.withState,u=wp.data,d=u.useSelect,p=u.useDispatch,m=s({media:void 0})(function(e){var t=e.media,n=(e.setState,p("core/editor")),r=n.editPost;console.log("MEDIA"),console.log(t);var s=d(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_banner_image},[]);return t=""===s||"transparent"===s?void 0:s,wp.element.createElement(i,null,wp.element.createElement(a,{onSelect:function(e){var t="";return void 0===e&&(t=e.id),console.log("MEDIASELECTED"),console.log(e),console.log(e.id),r({meta:{lsx_banner_image:t}}),{mediaSelected:e}},allowedTypes:c,value:t,render:function(e){var t=e.open;return wp.element.createElement(l,{onClick:t},o("Select and Image","lsx-blocks"))}}))});t.a=m},function(e,t,n){"use strict";var o=n(8),l=n(9),r=n(10),a=n(11),i=n(12),c=n(13),s=wp.i18n.__,u=wp.plugins.registerPlugin,d=wp.editPost.PluginDocumentSettingPanel,p=wp.data.useSelect;u("lsx-page-title-panel",{render:function(){var e=p(function(e){return e("core/editor").getCurrentPostType()});return"post"!==e&&"page"!==e?null:wp.element.createElement(d,{name:"lsx_page_title_panel",title:s("Page Title","lsx-blocks"),className:"lsx-page-title-panel"},wp.element.createElement("div",{className:"lsx-panel-row"},wp.element.createElement("div",{className:"lsx-col-3"},wp.element.createElement(o.a,null)),wp.element.createElement("div",{className:"lsx-col-3"},wp.element.createElement(l.a,null)),wp.element.createElement("div",{className:"lsx-col-3"},wp.element.createElement(r.a,null))),wp.element.createElement("div",{className:"lsx-panel-row is-list"},wp.element.createElement(a.a,null)),wp.element.createElement("div",{className:"lsx-panel-row background-colour"},wp.element.createElement(i.a,null)),wp.element.createElement("div",{className:"lsx-panel-row background-colour"},wp.element.createElement(c.a,null)))},icon:!1})},function(e,t,n){"use strict";var o=wp.i18n.__,l=wp.components.FormToggle,r=wp.compose.withState,a=wp.data,i=a.useSelect,c=a.useDispatch,s=r({checked:!1})(function(e){var t=e.checked,n=e.setState;t="yes"===i(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_disable_title},[]);var r=c("core/editor"),a=r.editPost;return wp.element.createElement(l,{id:"lsx-page-title-disable",help:o("Stop the title from showing, you will need to add it manually.","lsx-blocks"),value:"yes",checked:t,onChange:function(){return n(function(e){var t="no";return!1===e.checked&&(t="yes"),a({meta:{lsx_disable_title:t}}),{checked:!e.checked}})}})});t.a=s},function(e,t,n){"use strict";var o=(wp.i18n.__,wp.editor.AlignmentToolbar),l=wp.compose.withState,r=wp.data,a=r.useSelect,i=r.useDispatch,c=l({alignment:"center"})(function(e){var t=e.option,n=i("core/editor"),l=n.editPost,r=a(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_title_alignment},[]);""!==r&&void 0!==r&&(t=r);var c=function(e){l({meta:{lsx_title_alignment:e}})};return wp.element.createElement(o,{value:t,onChange:c})});t.a=c},function(e,t,n){"use strict";var o=(wp.i18n.__,wp.blockEditor.BlockAlignmentToolbar),l=wp.compose.withState,r=wp.data,a=r.useSelect,i=r.useDispatch,c=l({alignment:void 0})(function(e){var t=e.option,n=(e.setState,i("core/editor")),l=n.editPost,r=a(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_title_width},[]);t=""===r||"content"===r?void 0:r;var c=function(e){var t=e;void 0===e&&(t="content"),l({meta:{lsx_title_width:t}})},s=["wide","full"];return wp.element.createElement(o,{value:t,onChange:c,controls:s,wideControlsEnabled:!0})});t.a=c},function(e,t,n){"use strict";var o=wp.i18n.__,l=wp.components.RadioControl,r=wp.compose.withState,a=wp.data,i=a.useSelect,c=a.useDispatch,s=r({option:"in-banner"})(function(e){var t=e.option,n=e.setState,r=c("core/editor"),a=r.editPost,s=i(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_title_position},[]);return console.log("alignment 3 "+s),t=""!==s&&void 0!==s?s:"in-banner",wp.element.createElement(l,{selected:t,options:[{value:o("in-banner","lsx-blocks"),label:o("In Hero Banner","lsx-blocks")},{value:o("below-banner","lsx-blocks"),label:o("Below Hero Banner","lsx-blocks")}],onChange:function(e){return n(function(){return a({meta:{lsx_title_position:e}}),{selected:e}})}})});t.a=s},function(e,t,n){"use strict";var o=wp.i18n.__,l=wp.blockEditor.PanelColorSettings,r=wp.compose.withState,a=wp.data,i=a.useSelect,c=a.useDispatch,s=r({color:void 0})(function(e){var t=e.color,n=(e.setState,c("core/editor")),r=n.editPost,a=i(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_title_colour},[]);return t=""===a||"transparent"===a?void 0:a,wp.element.createElement(l,{title:o("Text Color"),initialOpen:!0,colorSettings:[{value:t,label:o("Text Color"),onChange:function(e){var t=e;return void 0===e&&(t="inherit"),r({meta:{lsx_title_colour:t}}),{selectedTextColour:e}}}]})});t.a=s},function(e,t,n){"use strict";var o=wp.i18n.__,l=wp.blockEditor.PanelColorSettings,r=wp.compose.withState,a=wp.data,i=a.useSelect,c=a.useDispatch,s=r({color:void 0})(function(e){var t=e.color,n=(e.setState,c("core/editor")),r=n.editPost,a=i(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_title_bg_colour},[]);return t=""===a||"transparent"===a?void 0:a,wp.element.createElement(l,{title:o("Background Color"),initialOpen:!0,colorSettings:[{value:t,label:o("Background Color"),onChange:function(e){var t=e;return void 0===e&&(t="transparent"),r({meta:{lsx_title_bg_colour:t}}),{selectedBgColour:e}}}]})});t.a=s}]);