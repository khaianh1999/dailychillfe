<template>
    <div class="mt-8 space-y-6">
      <h2 class="text-lg font-semibold text-gray-800">Bình luận ({{ comments.length }})</h2>
  
      <div v-if="comments.length == 0" class="text-gray-500">Hãy bình luận về bài viết nhé!</div>
  
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="bg-gray-100 rounded-lg p-4"
      >
        <div class="font-semibold text-gray-700">{{ comment.user_full_name }}</div>
        <div class="text-gray-600 text-sm mb-1">
          {{ new Date(comment.created_at).toLocaleString() }}
        </div>
        <p class="text-gray-800">{{ comment.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      comments: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  