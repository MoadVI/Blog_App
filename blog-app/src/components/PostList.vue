<template>
  <div class="post-list">
    <div v-if="posts.length === 0" class="empty-state">
      No posts found. Create your first post!
    </div>
    <SinglePost 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
    />
  </div>
</template>

<script>
import SinglePost from './SinglePost.vue'

export default {
  props: ['posts'],
  components: { SinglePost }
}
</script>

<style>
.post-list {
  display: grid;
  gap: 25px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #7f8c8d;
}
</style>