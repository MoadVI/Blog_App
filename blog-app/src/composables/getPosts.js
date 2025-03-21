import { ref } from 'vue'
import postsData from '../assets/posts.json'

export default function usePosts() {
  const posts = ref([])
  const error = ref(null)

  const initialize = async () => {
    try {
      const initialPosts = postsData || []
      
      const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]')
      
      const savedPostsMap = new Map(savedPosts.map(post => [String(post.id), post]))
      
      posts.value = initialPosts.map(post => {
        const postId = String(post.id)
        return savedPostsMap.has(postId) ? savedPostsMap.get(postId) : post
      })
      
      savedPosts.forEach(post => {
        const postId = String(post.id)
        if (!posts.value.find(p => String(p.id) === postId)) {
          posts.value.push(post)
        }
      })
      
      localStorage.setItem('posts', JSON.stringify(posts.value))
      
      console.log('Posts loaded successfully:', posts.value)
    } catch (err) {
      console.error('Error loading posts:', err)
      error.value = err.message
    }
  }

  const addPost = (newPost) => {
    try {
      const postWithId = { 
        ...newPost, 
        id: Date.now(),
        tags: newPost.tags.map(tag => tag.trim())
      }
      posts.value = [postWithId, ...posts.value]
      localStorage.setItem('posts', JSON.stringify(posts.value))
      return postWithId
    } catch (err) {
      console.error('Error adding post:', err)
      error.value = err.message
      throw err
    }
  }

  const deletePost = (id) => {
    try {
      const postId = String(id)
      posts.value = posts.value.filter(post => String(post.id) !== postId)
      localStorage.setItem('posts', JSON.stringify(posts.value))
    } catch (err) {
      console.error('Error deleting post:', err)
      error.value = err.message
      throw err
    }
  }

  const updatePost = (id, updatedPost) => {
    try {
      const postId = String(id)
      console.log('Attempting to update post:', { id: postId, updatedPost, currentPosts: posts.value })
      
      const postIndex = posts.value.findIndex(post => String(post.id) === postId)
      console.log('Found post at index:', postIndex)
      
      if (postIndex === -1) {
        throw new Error(`Post with ID ${postId} not found`)
      }

      const updatedPostWithId = {
        ...posts.value[postIndex],
        ...updatedPost,
        id: posts.value[postIndex].id
      }

      posts.value[postIndex] = updatedPostWithId

      localStorage.setItem('posts', JSON.stringify(posts.value))
      
      console.log('Post updated successfully:', updatedPostWithId)
      return updatedPostWithId
    } catch (err) {
      console.error('Error updating post:', err)
      error.value = err.message
      throw err
    }
  }

  return { 
    posts,
    error,
    initialize,
    addPost,
    deletePost,
    updatePost
  }
}
