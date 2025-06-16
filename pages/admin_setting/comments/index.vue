<template>
    <div>
      <div class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quản lý Phân Loại</h1>
    
          <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 mb-4">
            <button @click="openAddModal" type="button"
              class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
              <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              Thêm loại
            </button>
          </div>
        </div>
    
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">ID</th>
                  <th scope="col" class="px-4 py-3">Nội dung</th>
                  <th scope="col" class="px-4 py-3">Người tạo</th>
                  <th scope="col" class="px-4 py-3">Trả lời bình luận</th>
                  <th scope="col" class="px-4 py-3">Ngày tạo</th>
                  <th scope="col" class="px-4 py-3">Ngày cập nhật</th>
                  <th scope="col" class="px-4 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="paginatedComments.length === 0">
                  <td colspan="8" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                    Không tìm thấy phân loại nào.
                  </td>
                </tr>
                <tr v-for="comment in paginatedComments" :key="comment.id" class="border-b dark:border-gray-700">
                  <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ comment.id }}</td>
                  <td class="px-4 py-3 max-w-xs truncate">{{ comment.content }}</td>
                  <td class="px-4 py-3 max-w-sm truncate">{{ comment.user_full_name }}</td>
                  <td class="px-4 py-3 max-w-sm truncate">{{ comment.parent_full_name }}</td>
                  <td class="px-4 py-3">{{ formatDate(comment.created_at) }}</td>
                  <td class="px-4 py-3">{{ formatDate(comment.updated_at) }}</td>
                  <td class="px-4 py-3 flex items-center justify-center space-x-2">
                    <button @click="openEditModal(comment)" type="button"
                      class="py-2 px-3 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-900">
                      Sửa
                    </button>
                    <button @click="confirmDelete(comment.id)" type="button"
                      class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-900">
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    
          <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Hiển thị
              <span class="font-semibold text-gray-900 dark:text-white">{{ (currentPage - 1) * itemsPerPage + 1 }}-{{
                Math.min(currentPage * itemsPerPage, filteredComments.length) }}</span>
              trên
              <span class="font-semibold text-gray-900 dark:text-white">{{ filteredComments.length }}</span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li>
                <button @click="prevPage" :disabled="currentPage === 1"
                  class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                  <span>Previous</span>
                </button>
              </li>
              <li v-for="page in totalPages" :key="page">
                <button @click="goToPage(page)"
                  :class="{ 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': page === currentPage, 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== currentPage }"
                  class="flex items-center justify-center text-sm py-2 px-3 leading-tight">
                  {{ page }}
                </button>
              </li>
              <li>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                  class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                  <span>Next</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    
      <!-- Add New Comment Modal -->
      <div v-if="showAddModal" id="add-modal" tabindex="-1" aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50">
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Thêm Bài Đăng Mới</h3>
              <button @click="closeAddModal" type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <form @submit.prevent="addNewComment">
              <div class="grid gap-4 mb-4 sm:grid-cols-1">
                <div>
                  <label for="add-content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội dung
                    </label>
                  <input v-model="newComment.content" type="text" id="add-content"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required>
                </div>
                
                <!-- Hidden input for updated_by -->
                <input type="hidden" v-model="newComment.updated_by">
              </div>
              <button type="submit"
                class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Thêm bình luận
              </button>
            </form>
          </div>
        </div>
      </div>
    
     
      <div v-if="showEditModal" id="edit-modal" tabindex="-1" aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50">
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Chỉnh Sửa Bình Luận</h3>
              <button @click="closeEditModal" type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <form @submit.prevent="updateComment">
              <div class="grid gap-4 mb-4 sm:grid-cols-1">
                <div>
                  <label for="edit-content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội dung
                    </label>
                  <input v-model="editComment.content" type="text" id="edit-content"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required>
                </div>
                
                <!-- Hidden input for updated_by -->
                <input type="hidden" v-model="editComment.updated_by">
              </div>
              <button type="submit"
                class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Cập nhật bình luận
              </button>
            </form>
          </div>
        </div>
      </div>
    
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50">
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
          <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <svg class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor"
              viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 4a1 1 0 100 2h4a1 1 0 100-2H8a1 1 0 00-1-1z"
                clip-rule="evenodd"></path>
            </svg>
            <p class="mb-4 text-gray-500 dark:text-gray-300">Bạn có chắc chắn muốn xóa phân loại này không?</p>
            <div class="flex justify-center items-center space-x-4">
              <button @click="cancelDelete" type="button"
                class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600">
                Hủy
              </button>
              <button @click="deleteComment" type="submit"
                class="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    
    
      <!-- Toast/Notification System -->
      <div v-if="toast.show" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white"
        :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'">
        {{ toast.message }}
      </div>
    </div>
    </template>
    
    <script>
    export default {
      name: 'CommentsPage',
      layout: "Admin",
      data() {
        return {
          allComments: [], // Lưu trữ toàn bộ danh sách phân loại gốc
          searchQuery: '', // Dữ liệu cho ô tìm kiếm
          currentPage: 1, // Trang hiện tại
          itemsPerPage: 5, // Số mục trên mỗi trang
    
          showEditModal: false, // Trạng thái hiển thị modal sửa
          showDeleteModal: false, // Trạng thái hiển thị modal xóa
          selectedComment: null, // Bài đăng đang được chọn để sửa/xóa
    
          // **** THAY ĐỔI 3: Thêm state cho modal "Thêm" ****
          showAddModal: false,
          newComment: {
            content: '',
          },
          editComment: { // Dữ liệu cho phân loại đang chỉnh sửa
            id: null,
            content: '',
            image_url: null, // Để hiển thị ảnh cũ
            updated_by: 1, // Ví dụ: ID người dùng mặc định
          },
          selectedAddFile: null, // File được chọn khi thêm mới
          selectedEditFile: null, // File được chọn khi chỉnh sửa
          removeCurrentImage: false, // Cờ để xóa ảnh hiện tại khi chỉnh sửa
          commentIdToDelete: null, // ID phân loại cần xóa
          toast: { // Hệ thống thông báo toast
            show: false,
            message: '',
            type: '', // 'success' or 'error'
          }
          // ---- Hết phần thay đổi ----
        };
      },
      computed: {
        // Lọc danh sách phân loại dựa trên `searchQuery`
        filteredComments() {
          if (!this.searchQuery) {
            return this.allComments;
          }
          const lowerCaseQuery = this.searchQuery.toLowerCase();
          return this.allComments.filter(comment =>
            comment.content.toLowerCase().includes(lowerCaseQuery)
          );
        },
        // Tính tổng số trang
        totalPages() {
          return Math.ceil(this.filteredComments.length / this.itemsPerPage);
        },
        // Lấy danh sách phân loại cho trang hiện tại
        paginatedComments() {
          const start = (this.currentPage - 1) * this.itemsPerPage;
          const end = start + this.itemsPerPage;
          return this.filteredComments.slice(start, end);
        },
      },
      watch: {
        // Khi người dùng tìm kiếm, quay về trang 1
        searchQuery() {
          this.currentPage = 1;
        }
      },
      mounted() {
        // Giả lập việc call API để lấy dữ liệu khi component được tạo
        // this.fetchComments();
      },
      async fetch() {
        // Tải tất cả phân loại khi component được tạo
        await this.fetchComments();
      },
      methods: {
        onAddFileSelected(event) {
          this.selectedAddFile = event.target.files[0];
        },
        showToast(message, type) {
          this.toast.message = message;
          this.toast.type = type;
          this.toast.show = true;
          setTimeout(() => {
            this.toast.show = false;
          }, 3000); // Tự động ẩn sau 3 giây
        },
    
        // **** THAY ĐỔI 4: Thêm các method cho chức năng "Thêm" ****
        openAddModal() {
          // Reset form mỗi khi mở
          this.newComment = {
            content: '',
          };
          this.showAddModal = true;
        },
        closeAddModal() {
          this.showAddModal = false;
        },
        addNewComment() {
          // Tìm ID lớn nhất hiện có và +1 để tạo ID mới (cách làm đơn giản)
          const maxId = Math.max(0, ...this.allComments.map(p => p.id));
          const newCommentData = {
            ...this.newComment,
            id: maxId + 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
    
          // Thêm phân loại mới vào đầu danh sách để dễ thấy nhất
          this.allComments.unshift(newCommentData);
    
          // Đóng modal sau khi thêm
          this.closeAddModal();
          console.log('Đã thêm phân loại mới:', newCommentData);
        },
        // ---- Hết phần thay đổi ----
        // --- FAKE API ---
        fetchComments() {
          console.log('Đang giả lập fetch API...');
          // Dữ liệu mẫu
          const sampleData = Array.from({ length: 23 }, (_, i) => ({
            id: i + 1,
            title: `Tiêu đề phân loại số ${i + 1} về công nghệ mới`,
            image_url: `https://picsum.photos/seed/${i + 1}/200/150`,
            content: `Đây là nội dung chi tiết của phân loại số ${i + 1}. Nội dung này mô tả về các xu hướng công nghệ, lập trình và những cập nhật mới nhất trong ngành.`,
            comment: i % 3 === 0 ? 'Công nghệ' : (i % 3 === 1 ? 'Lập trình' : 'Cuộc sống'),
            created_at: new Date(2023, 10, i + 1).toISOString(),
            updated_at: new Date(2023, 11, i + 1).toISOString(),
          }));
    
          // Gán dữ liệu vào state
          this.allComments = sampleData;
          console.log('Lấy dữ liệu thành công!');
        },
        async fetchComments() {
          try {
            const response = await this.$axios.$get('/comments'); // Thay đổi endpoint nếu cần
            // Lấy tất cả phân loại và sắp xếp theo ID giảm dần (mới nhất lên đầu)
            this.allComments = response.data.sort((a, b) => b.id - a.id);
          } catch (error) {
            console.error('Lỗi khi lấy danh sách phân loại:', error);
            this.showToast('Lỗi khi tải phân loại!', 'error');
          }
        },
    
        // --- LOGIC PHÂN TRANG ---
        goToPage(page) {
          this.currentPage = page;
        },
        nextPage() {
          if (this.currentPage < this.totalPages) {
            this.currentPage++;
          }
        },
        prevPage() {
          if (this.currentPage > 1) {
            this.currentPage--;
          }
        },
    
        // --- LOGIC MODAL ---
        async openEditModal(comment) {
          // Fetch the latest data for the comment in case it was updated elsewhere
          try {
            const response = await this.$axios.$get(`/comments/${comment.id}`);
            this.editComment = { ...response?.data }; // Copy current comment data to editComment
            this.selectedEditFile = null; // Reset selected file for edit
            this.removeCurrentImage = false; // Reset remove image flag
            // Reset input type="file"
            if (document.getElementById('edit-image')) {
              document.getElementById('edit-image').value = '';
            }
            this.showEditModal = true;
          } catch (error) {
            console.error('Lỗi khi tải phân loại để chỉnh sửa:', error);
            this.showToast('Lỗi khi tải thông tin phân loại!', 'error');
          }
        },
        closeEditModal() {
          this.showEditModal = false;
          this.clearEditForm();
        },
        clearEditForm() {
          this.editComment = {
            id: null,
            content: '',
            image_url: null,
            updated_by: 1,
          };
          this.selectedEditFile = null;
          this.removeCurrentImage = false;
          // Reset input type="file"
          if (document.getElementById('edit-image')) {
            document.getElementById('edit-image').value = '';
          }
        },
        onEditFileSelected(event) {
          this.selectedEditFile = event.target.files[0];
          // Nếu có file mới, hủy chọn xóa ảnh hiện tại
          if (this.selectedEditFile) {
            this.removeCurrentImage = false;
          }
        },
        saveChanges() {
          // Tìm index của phân loại cần cập nhật trong danh sách gốc
          const index = this.allComments.findIndex(p => p.id === this.selectedComment.id);
          if (index !== -1) {
            // Cập nhật lại ngày `updated_at`
            this.selectedComment.updated_at = new Date().toISOString();
            // Cập nhật phân loại trong danh sách gốc
            this.allComments.splice(index, 1, this.selectedComment);
          }
          // Đóng modal
          this.closeEditModal();
          console.log('Đã lưu thay đổi cho comment ID:', this.selectedComment.id);
        },
        openDeleteModal(comment) {
          this.selectedComment = comment;
          this.showDeleteModal = true;
        },
        closeDeleteModal() {
          this.showDeleteModal = false;
          this.selectedComment = null;
        },
    
        // --- UTILITIES ---
        formatDate(dateString) {
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
          return new Date(dateString).toLocaleDateString('vi-VN', options);
        },
    
        createFormData(data, file = null, removeImage = false) {
          const formData = new FormData();
          for (const key in data) {
            // Chỉ thêm các trường có giá trị, trừ image_url sẽ được xử lý riêng
            if (data[key] !== null && data[key] !== undefined && key !== 'image_url') {
              formData.append(key, data[key]);
            }
          }
    
          if (file) {
            formData.append('image', file); // Tên field 'image' phải khớp với Multer config
          } else if (removeImage) {
            // Nếu không có file mới nhưng yêu cầu xóa ảnh cũ
            formData.append('remove_image', 'true'); // Tên field 'remove_image' phải khớp với controller
          } else if (data.image_url && !file) {
            // Nếu không có file mới và không yêu cầu xóa, và có ảnh cũ, gửi lại URL ảnh cũ
            // Điều này có thể không cần thiết nếu backend chỉ xử lý file và remove_image flag
            // nhưng để đảm bảo, có thể gửi lại đường dẫn ảnh cũ nếu không muốn thay đổi.
            // Tuy nhiên, với logic backend đã viết, chỉ cần không gửi 'image' và 'remove_image'
            // là backend sẽ giữ nguyên ảnh cũ.
          }
          return formData;
        },
    
        // --- Add New Comment ---
        async addNewComment() {
          try {
            const formData = this.createFormData(this.newComment, this.selectedAddFile);
    
            // Gọi API POST
            const response = await this.$axios.$comment('/comments', formData);
    
            this.showToast('Tạo phân loại thành công!', 'success');
            this.closeAddModal();
            await this.fetchComments(); // Tải lại danh sách phân loại
          } catch (error) {
            console.error('Lỗi khi tạo phân loại:', error.response ? error.response.data : error.message);
            this.showToast('Lỗi khi tạo phân loại: ' + (error.response ? error.response.data.message : error.message), 'error');
          }
        },
    
        // --- Update Comment ---
        async updateComment() {
          try {
            const formData = this.createFormData(this.editComment, this.selectedEditFile, this.removeCurrentImage);
    
            // Gọi API PUT
            const response = await this.$axios.$put(`/comments/${this.editComment.id}`, formData);
    
            this.showToast('Cập nhật phân loại thành công!', 'success');
            this.closeEditModal();
            await this.fetchComments(); // Tải lại danh sách phân loại
          } catch (error) {
            console.error('Lỗi khi cập nhật phân loại:', error.response ? error.response.data : error.message);
            this.showToast('Lỗi khi cập nhật phân loại: ' + (error.response ? error.response.data.message : error.message), 'error');
          }
        },
    
        // --- Delete Comment ---
        confirmDelete(commentId) {
          this.commentIdToDelete = commentId;
          this.showDeleteModal = true;
        },
        cancelDelete() {
          this.showDeleteModal = false;
          this.commentIdToDelete = null;
        },
        async deleteComment() {
          try {
            // Đây là ví dụ cho xóa mềm (soft delete) nếu backend của bạn có hỗ trợ.
            // Nếu backend là xóa cứng, bạn sẽ gọi endpoint DELETE.
            // Giả định bạn có một endpoint để cập nhật 'deleted' flag
            // Hoặc bạn sẽ tạo một hàm `softDeleteComment` trong Comment model và route tương ứng.
            // Dưới đây là ví dụ gọi API DELETE.
            const response = await this.$axios.$delete(`/comments/${this.commentIdToDelete}`); // Endpoint DELETE
            this.showToast('Xóa phân loại thành công!', 'success');
            this.showDeleteModal = false;
            this.commentIdToDelete = null;
            await this.fetchComments(); // Tải lại danh sách phân loại
          } catch (error) {
            console.error('Lỗi khi xóa phân loại:', error.response ? error.response.data : error.message);
            this.showToast('Lỗi khi xóa phân loại: ' + (error.response ? error.response.data.message : error.message), 'error');
          }
        }
      }
    };
    </script>
    
    <style>
    /* Thêm màu cho theme primary của Tailwind để giống Flowbite */
    /* Bạn có thể thêm đoạn này vào file tailwind.config.js hoặc file css chính */
    :root {
      --color-primary-50: #eff6ff;
      --color-primary-100: #dbeafe;
      --color-primary-200: #bfdbfe;
      --color-primary-300: #93c5fd;
      --color-primary-400: #60a5fa;
      --color-primary-500: #3b82f6;
      --color-primary-600: #2563eb;
      --color-primary-700: #1d4ed8;
      --color-primary-800: #1e40af;
      --color-primary-900: #1e3a8a;
      --color-primary-950: #172554;
    }
    
    .bg-primary-50 {
      background-color: var(--color-primary-50);
    }
    
    .bg-primary-100 {
      background-color: var(--color-primary-100);
    }
    
    /* ... thêm các class khác nếu cần ... */
    .bg-primary-600 {
      background-color: var(--color-primary-600);
    }
    
    .bg-primary-700 {
      background-color: var(--color-primary-700);
    }
    
    .hover\:bg-primary-800:hover {
      background-color: var(--color-primary-800);
    }
    
    .focus\:ring-primary-300:focus {
      --tw-ring-color: var(--color-primary-300);
    }
    
    .dark\:bg-primary-600 {
      background-color: var(--color-primary-600);
    }
    
    .dark\:hover\:bg-primary-700:hover {
      background-color: var(--color-primary-700);
    }
    
    .dark\:focus\:ring-primary-800:focus {
      --tw-ring-color: var(--color-primary-800);
    }
    </style>