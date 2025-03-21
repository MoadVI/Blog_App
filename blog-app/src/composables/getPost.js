import { ref, computed } from 'vue'
import usePosts from './getPosts'

export default function usePost(id) {
  const { posts, initialize } = usePosts()
  const error = ref(null)
  const loading = ref(true)

  const post = computed(() => {
    if (!posts.value) return null
    const foundPost = posts.value.find(p => String(p.id) === String(id))
    if (!foundPost) {
      error.value = `Post with ID ${id} not found`
      console.error('Post not found:', { id, posts: posts.value })
    }
    return foundPost
  })

  const loadPost = async () => {
    try {
      loading.value = true
      error.value = null
      await initialize()
    } catch (err) {
      console.error('Error loading post:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    post,
    error,
    loading,
    loadPost
  }
}

