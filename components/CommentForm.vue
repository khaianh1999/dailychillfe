<template>
  <div>
    <form @submit.prevent="submitComment" class="space-y-4">
      <h2 class="text-lg font-semibold text-gray-800">Để lại một bình luận</h2>
  
      <input
        v-model="full_name"
        type="text"
        placeholder="Tên của bạn"
        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-main"
        required
      />
  
      <textarea
        v-model="content"
        placeholder="Nội dung"
        rows="4"
        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-main"
        required
      ></textarea>
  
      <button
        type="submit"
        class="bg-main hover:bg-hover text-white px-4 py-2 rounded transition"
      >
        Gửi bình luận
      </button>
    </form>
    <!-- Toast/Notification System -->
    <div v-if="toast.show" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white"
         :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'">
      {{ toast.message }}
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        toast: { // Hệ thống thông báo toast
          show: false,
          message: '',
          type: '', // 'success' or 'error'
        },
        full_name: '',
        content: '',
      };
    },
    methods: {
      async submitComment() {
        if (this.full_name && this.content) {
          this.$emit('add-comment', {
            id: Date.now(),
            user_full_name: this.full_name,
            content: this.content,
            created_at: new Date(),
          });
          // call insert comment
          await this.postComment();
        }
      },
      async postComment() {
        try {
          if (!this.content) {
              this.showToast('Vui lòng nhập nội dung cho bình luận.', 'error');
            return;
          }
          if (!this.$route.params.id) {
            this.showToast('Không tìm thấy ID bài viết.', 'error');
            return;
          }

          const commentPayload = {
              content: this.content,
              article_id: parseInt(this.$route.params.id), // Lấy article_id từ URL
              user_id: 1, // FAKE: Trong thực tế, user_id nên lấy từ thông tin người dùng đã đăng nhập (JWT, session, v.v.)
              parent_id: null, // Nếu có parent_id (khi trả lời comment khác)
          };
          // Gửi yêu cầu POST đến endpoint tạo bình luận
          const response = await this.$axios.$post('/comments', commentPayload); 
          
          this.showToast('Bình luận thành công!', 'success');
          this.content ="";
          this.full_name ="";

        } catch (error) {
          console.error('Lỗi khi bình luận:', error.response ? error.response.data : error.message);
          this.showToast('Lỗi khi bình luận: ' + (error.response ? error.response.data.message : error.message), 'error');
        }
      },
      showToast(message, type) {
        this.toast.message = message;
        this.toast.type = type;
        this.toast.show = true;
        setTimeout(() => {
          this.toast.show = false;
        }, 3000); // Tự động ẩn sau 3 giây
      },
    },
  };
  </script>
  