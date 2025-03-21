<template>
  <div class="create-post">
    <h1>Create New Post</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Title:</label>
        <input 
          v-model="title" 
          type="text" 
          required
          placeholder="Enter post title"
        >
      </div>

      <div class="form-group">
        <label>Content:</label>
        <textarea
          v-model="body"
          required
          placeholder="Write your post content here..."
          rows="10"
        ></textarea>
      </div>

      <div class="form-group">
        <label>Tags (comma-separated):</label>
        <input
          v-model="tagsInput"
          type="text"
          placeholder="e.g., vue, javascript, web"
        >
      </div>

      <button type="submit" class="submit-btn">
        Publish Post
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import usePosts from '@/composables/getPosts'

export default {
  setup() {
    const title = ref('')
    const body = ref('')
    const tagsInput = ref('')
    const router = useRouter()
    const { addPost } = usePosts()

    const handleSubmit = () => {
      const tags = tagsInput.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      addPost({
        title: title.value,
        body: body.value,
        tags
      })

      router.push('/')
    }

    return { 
      title,
      body,
      tagsInput,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.create-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #34495e;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #42b983;
  outline: none;
}

.submit-btn {
  background: #42b983;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  margin-top: 20px;
}

.submit-btn:hover {
  background: #3ba576;
}
</style>