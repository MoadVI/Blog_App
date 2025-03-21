<template>
  <div class="tag-cloud">
    <h3>Tags</h3>
    <div class="tags-container">
      <button
        v-for="tag in uniqueTags"
        :key="tag"
        class="tag-button"
        :class="{ 'selected': tag === selectedTag }"
        @click="$emit('tag-click', tag)"
      >
        {{ tag }}
        <span class="tag-count">({{ getTagCount(tag) }})</span>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
    selectedTag: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const uniqueTags = computed(() => {
      const tags = props.posts.flatMap(post => post.tags)
      return [...new Set(tags)].sort()
    })

    const getTagCount = (tag) => {
      return props.posts.filter(post => post.tags.includes(tag)).length
    }

    return { uniqueTags, getTagCount }
  }
}
</script>

<style scoped>
.tag-cloud {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h3 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-button {
  background: #e9ecef;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: #495057;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tag-button:hover {
  background: #dee2e6;
  transform: translateY(-1px);
}

.tag-button.selected {
  background: #3498db;
  color: white;
}

.tag-count {
  font-size: 0.75rem;
  opacity: 0.8;
}

.tag-button.selected .tag-count {
  opacity: 1;
}
</style>