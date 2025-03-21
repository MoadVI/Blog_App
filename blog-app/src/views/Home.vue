<template>
  <div class="home">
    <div class="posts-container">
      <PostList :posts="filteredPosts" />
    </div>
    <div class="sidebar">
      <TagCloud 
        :posts="posts" 
        :selectedTag="selectedTag"
        @tag-click="handleTagClick"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import PostList from '@/components/PostList.vue'
import TagCloud from '@/components/TagCloud.vue'
import usePosts from '@/composables/getPosts'

export default {
  components: { PostList, TagCloud },
  setup() {
    const { posts, initialize, error } = usePosts()
    const selectedTag = ref(null)

    const filteredPosts = computed(() => {
      if (!selectedTag.value) {
        return posts.value
      }
      return posts.value.filter(post => 
        post.tags.includes(selectedTag.value)
      )
    })

    const handleTagClick = (tag) => {
      selectedTag.value = selectedTag.value === tag ? null : tag
    }

    onMounted(async () => {
      await initialize()
      if (error.value) {
        console.error('Error loading posts:', error.value)
      }
    })

    return { 
      posts,
      filteredPosts,
      selectedTag,
      handleTagClick
    }
  }
}
</script>

<style>
.home {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 40px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.posts-container {
  min-width: 0; 
}

.sidebar {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 20px;
}
</style>