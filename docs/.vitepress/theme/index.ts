import DefaultTheme from 'vitepress/theme'
import ArticleMetadata from './ArticleMetadata.vue'
import { h } from 'vue'
import './custom.css'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // Use the doc-before slot to insert metadata before the content
            'doc-before': () => h(ArticleMetadata)
        })
    }
}
