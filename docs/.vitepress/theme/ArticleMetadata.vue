<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page, theme } = useData()

const wordCount = computed(() => page.value.frontmatter.wordCount)
const readingTime = computed(() => page.value.frontmatter.readingTime)
const lastUpdated = computed(() => {
    // If VitePress default lastUpdated date handling is used, it might be available. 
    // However, VitePress usually shows it at the bottom.
    // We can also format the timestamp if `lastUpdated` timestamp is available.
    // For now, let's focus on wordCount and readingTime as lastUpdated is natively handled by themeConfig, 
    // but the user asked for a "template" to display elements. 
    // Let's show all if possible, or just the custom ones.
    return page.value.lastUpdated
})
</script>

<template>
  <div class="article-metadata" v-if="wordCount || readingTime">
    <span class="meta-item" v-if="wordCount">
      <span class="icon">📝</span>
      <span class="text">字数: {{ wordCount }}</span>
    </span>
    <span class="meta-item" v-if="readingTime">
      <span class="icon">⏱️</span>
      <span class="text">阅读时间: {{ readingTime }} 分钟</span>
    </span>
  </div>
</template>

<style scoped>
.article-metadata {
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 1.1em;
}
</style>
