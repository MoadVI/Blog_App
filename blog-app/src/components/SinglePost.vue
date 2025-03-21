<template>
  <article class="post-card">
    <h3>{{ post.title }}</h3>
    <div class="tags">
      <span 
        v-for="tag in post.tags" 
        :key="tag" 
        class="tag"
      >
        {{ tag }}
      </span>
    </div>
    <p class="snippet">{{ snippet }}</p>
    <router-link 
      :to="`/posts/${post.id}`" 
      class="read-more"
    >
      Read more →
    </router-link>
  </article>
</template>

<script>
export default {
  props: ['post'],
  computed: {
    snippet() {
      return this.post.body.substring(0, 150) + '...'
    }
  }
}
</script>

<style scoped>
.post-card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.post-card:hover {
  transform: translateY(-2px);
}

h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.tags {
  margin-bottom: 15px;
}

.tag {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.85em;
  margin-right: 8px;
}

.snippet {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 15px;
}

.read-more {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
}

.read-more:hover {
  text-decoration: underline;
}
</style>