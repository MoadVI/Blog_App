<template>
    <div class="edit-post">
      <div class="edit-post-container">
        <div class="header">
          <h1>Edit Post</h1>
          <router-link :to="`/posts/${post?.id}`" class="cancel-btn">
            <i class="fas fa-times"></i> Cancel
          </router-link>
        </div>
  
        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>
  
        <form v-if="post" @submit.prevent="handleSubmit" class="edit-form">
          <div class="form-group">
            <label>Title</label>
            <input 
              v-model="title" 
              type="text" 
              required
              placeholder="Enter post title"
              class="form-input"
            >
          </div>
  
          <div class="form-group">
            <label>Content</label>
            <textarea
              v-model="body"
              required
              placeholder="Write your post content here..."
              rows="10"
              class="form-textarea"
            ></textarea>
          </div>
  
          <div class="form-group">
            <label>Tags</label>
            <div class="tags-container">
              <div class="tags-list">
                <span 
                  v-for="tag in tags" 
                  :key="tag" 
                  class="tag"
                >
                  {{ tag }}
                  <button 
                    type="button" 
                    @click="removeTag(tag)" 
                    class="remove-tag"
                  >×</button>
                </span>
              </div>
              <div class="tag-input-container">
                <input
                  v-model="newTag"
                  type="text"
                  placeholder="Add a tag"
                  @keyup.enter.prevent="addTag"
                  class="tag-input"
                >
                <button 
                  type="button" 
                  @click="addTag" 
                  class="add-tag-btn"
                >
                  <i class="fas fa-plus"></i> Add
                </button>
              </div>
            </div>
          </div>
  
          <div class="form-actions">
            <button type="submit" class="submit-btn">
              <i class="fas fa-save"></i> Save Changes
            </button>
          </div>
        </form>
  
        <div v-else-if="loading" class="loading-message">
          <i class="fas fa-spinner fa-spin"></i>
          Loading post...
        </div>
  
        <div v-else class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          Post not found
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import usePost from '@/composables/getPost'
  import usePosts from '@/composables/getPosts'
  
  export default {
    setup() {
      const route = useRoute()
      const router = useRouter()
      const { updatePost } = usePosts()
      
      // Convert route ID to string to ensure consistent comparison
      const postId = String(route.params.id)
      console.log('Editing post with ID:', postId)
      
      const { post, error: postError, loading, loadPost } = usePost(postId)
      
      const title = ref('')
      const body = ref('')
      const tags = ref([])
      const newTag = ref('')
      const error = ref(null)
      
      // Load post data
      onMounted(async () => {
        await loadPost()
        if (post.value) {
          title.value = post.value.title
          body.value = post.value.body
          tags.value = post.value.tags || []
          console.log('Post loaded successfully:', post.value)
        } else {
          error.value = `Post with ID ${postId} not found`
          console.error('Failed to load post:', postId)
        }
      })
      
      const addTag = () => {
        if (newTag.value.trim() && !tags.value.includes(newTag.value.trim())) {
          tags.value.push(newTag.value.trim())
          newTag.value = ''
        }
      }
      
      const removeTag = (tag) => {
        tags.value = tags.value.filter(t => t !== tag)
      }
      
      const handleSubmit = async () => {
        try {
          if (!post.value) {
            throw new Error(`Post with ID ${postId} not found`)
          }
          
          console.log('Submitting update for post:', postId)
          
          const updatedPost = {
            title: title.value,
            body: body.value,
            tags: tags.value
          }
          
          await updatePost(postId, updatedPost)
          console.log('Post updated successfully')
          router.push(`/posts/${postId}`)
        } catch (err) {
          console.error('Error updating post:', err)
          error.value = err.message
        }
      }
      
      return {
        post,
        title,
        body,
        tags,
        newTag,
        error: computed(() => error.value || postError.value),
        loading,
        addTag,
        removeTag,
        handleSubmit
      }
    }
  }
  </script>
  
  <style scoped>
  .edit-post {
    min-height: 100vh;
    background: linear-gradient(135deg, #f0f4f8 0%, #e6eef7 100%);
    padding: 2rem 0;
  }
  
  .edit-post-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    background: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  h1 {
    color: white;
    font-weight: bold;
    font-size: 2rem;
    margin: 0;
    font-weight: 600;
    background: linear-gradient(45deg, #0c73e9, #00ffdd);
    -webkit-text-fill-color: transparent;
  }
  
  .cancel-btn {
    color: #64748b;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .cancel-btn:hover {
    color: #ef4444;
    background-color: #fef2f2;
  }
  
  .edit-form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #ffffff;
    font-weight: 500;
    font-size: 1.1rem;
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: #f8fafc;
  }
  
  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
    background: white;
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 200px;
  }
  
  .tags-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    display: inline-flex;
    align-items: center;
    background: #e0f2fe;
    color: #0369a1;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.875rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  .remove-tag {
    background: none;
    border: none;
    color: #0369a1;
    margin-left: 0.5rem;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    padding: 0;
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }
  
  .remove-tag:hover {
    opacity: 1;
    color: #ef4444;
  }
  
  .tag-input-container {
    display: flex;
    gap: 0.5rem;
  }
  
  .tag-input {
    flex: 1;
    padding: 0.5rem 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }
  
  .tag-input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
  
  .add-tag-btn {
    background: #4a90e2;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .add-tag-btn:hover {
    background: #357abd;
    transform: translateY(-1px);
  }
  
  .form-actions {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }
  
  .submit-btn {
    background: linear-gradient(45deg, #0c73e9, #00ffdd);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(74, 144, 226, 0.2);
  }
  
  .error-message {
    background: #fef2f2;
    color: #ef4444;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid #fee2e2;
  }
  
  .loading-message {
    text-align: center;
    color: #64748b;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 768px) {
    .edit-post {
      padding: 1rem 0;
    }
  
    .edit-form {
      padding: 1.5rem;
    }
  
    h1 {
      font-size: 1.75rem;
    }
  
    .header {
      padding: 1rem;
    }
  }
  </style>
  