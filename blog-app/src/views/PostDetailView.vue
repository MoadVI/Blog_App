<template>
  <div class="post-detail">
    <div v-if="loading" class="loading">
      <p>Loading post...</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="loadPost">Try again</button>
    </div>
    <div v-else-if="post" class="post-content">
      <h2>{{ post.title }}</h2>
      <div class="tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
      <p>{{ post.body }}</p>
      <div class="actions">
        <router-link :to="`/edit/${post.id}`" class="edit-link">Edit Post</router-link>
      </div>
    </div>
    <div v-else class="not-found">
      <p>Post not found</p>
    </div>
    <TagCloud :posts="posts" />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import usePost from '@/composables/getPost'
import usePosts from '@/composables/getPosts'
import TagCloud from '@/components/TagCloud.vue'

export default {
  components: { TagCloud },
  setup() {
    const route = useRoute()
    const id = route.params.id
    const { post, error, loading, loadPost } = usePost(id)
    const { posts } = usePosts()

    onMounted(async () => {
      await loadPost()
    })

    return { 
      post, 
      posts, 
      error, 
      loading, 
      loadPost 
    }
  }
}
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error, .not-found {
  text-align: center;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.error {
  color: #e74c3c;
}

.post-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

h2 {
  margin-top: 0;
  color: #2c3e50;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  background: #e9ecef;
  color: #495057;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 14px;
}

.actions {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.edit-link {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.3s ease;
}

.edit-link:hover {
  background: #3ba576;
}
</style>