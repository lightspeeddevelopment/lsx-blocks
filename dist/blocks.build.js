!function(e){function t(l){if(n[l])return n[l].exports;var r=n[l]={i:l,l:!1,exports:{}};return e[l].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,l){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:l})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(1)},function(e,t,n){"use strict";var l=n(2),r=n(3),o=n(4),c=wp.i18n.__,i=wp.plugins.registerPlugin,a=wp.editPost.PluginDocumentSettingPanel,u=wp.data.useSelect;i("lsx-page-title-panel",{render:function(){var e=u(function(e){return e("core/editor").getCurrentPostType()});return"post"!==e&&"page"!==e?null:wp.element.createElement(a,{name:"lsx_page_title_panel",title:c("Page Title","lsx-blocks"),className:"lsx-page-title-panel"},wp.element.createElement("div",null,wp.element.createElement(l.a,null)),wp.element.createElement("div",null,wp.element.createElement(r.a,null)),wp.element.createElement("div",null,wp.element.createElement(o.a,null)))},icon:!1})},function(e,t,n){"use strict";var l=(wp.i18n.__,wp.compose.withState),r=wp.components.FormToggle,o=wp.data,c=o.useSelect,i=o.useDispatch,a=l({checked:!1})(function(e){var t=e.checked,n=e.setState;t="yes"===c(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_disable_title},[]);var l=i("core/editor"),o=l.editPost;return wp.element.createElement(r,{id:"lsx-page-title-disable",value:"yes",checked:t,onChange:function(){return n(function(e){var t="no";return!1===e.checked&&(t="yes"),o({meta:{lsx_disable_title:t}}),{checked:!e.checked}})}})});t.a=a},function(e,t,n){"use strict";var l=wp.i18n.__,r=wp.components.RadioControl,o=wp.compose.withState,c=wp.data,i=c.useSelect,a=c.useDispatch,u=o({option:"center"})(function(e){var t=e.option,n=e.setState,o=a("core/editor"),c=o.editPost,u=i(function(e){return e("core/editor").getEditedPostAttribute("meta").lsx_title_alignment},[]);return""!==u&&void 0!==u&&(t=u),wp.element.createElement(r,{selected:t,options:[{label:l("Left","lsx-blocks"),value:"left"},{label:l("Center","lsx-blocks"),value:"center"},{label:l("Right","lsx-blocks"),value:"right"}],onChange:function(e){return n(function(){return c({meta:{lsx_title_alignment:e}}),{selected:e}})}})});t.a=u},function(e,t,n){"use strict";var l=(wp.i18n.__,wp.components.ColorPicker),r=wp.compose.withState,o=wp.data,c=(o.useSelect,o.useDispatch),i=r({color:"#000"})(function(e){var t=e.color,n=e.setState,r=c("core/editor"),o=r.editPost;return console.log(t),wp.element.createElement(l,{color:t,onClick:function(e){return n(function(){return console.log(e),o({meta:{lsx_title_bg_colour:e.hex}}),{value:e}})}})});t.a=i}]);