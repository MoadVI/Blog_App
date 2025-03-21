<template>
  <div class="tag-view">
    <h2>Posts tagged with "{{ $route.params.tag }}"</h2>
    <PostList :posts="filteredPosts" />
  </div>
</template>

<script>
import { computed } from 'vue'
import PostList from '@/components/PostList.vue'
import usePosts from '@/composables/getPosts'

export default {
  components: { PostList },
  setup() {
    const { posts } = usePosts()
    const filteredPosts = computed(() => 
      posts.value.filter(post => 
        post.tags.includes(route.params.tag))
    )

    return { filteredPosts }
  }
}
</script>