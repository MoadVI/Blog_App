<template>
  <div class="home">
    <div class="container">
      <div v-if="loading" class="loading">
        <div class="loader"></div>
        <p>Loading posts...</p>
      </div>
      <div v-else class="content">
        <PostList :posts="posts" :error="error" />
        <TagCloud :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import TagCloud from '../components/TagCloud.vue'
import { getPosts } from '../composables/getPosts'

export default {
  name: 'HomeView',
  components: {
    PostList,
    TagCloud
  },
  setup() {
    const { posts, error, loading, refresh } = getPosts()

    if (error.value) {
      console.error('Error in HomeView:', error.value)
    }

    return {
      posts,
      error,
      loading,
      refresh
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style> 