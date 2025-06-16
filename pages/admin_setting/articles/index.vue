<template>
  <div class="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quản lý Bài đăng</h1>

      <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 mb-4">
        <div class="w-full md:w-2/3">
          <form @submit.prevent="onSearch" class="flex gap-4 items-center">
            <div class="flex items-center">
              <label for="simple-search" class="sr-only">Tìm kiếm</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                    viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <input v-model="searchQuery" type="text" id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Tìm kiếm theo tiêu đề..." />
              </div>
            </div>
            <div>
              <div class="relative">
                <select v-model="selectedCategory" id="category"
                  class="block w-full px-4 py-3 pr-10 text-base border border-gray-300 focus:outline-none focus:ring-main focus:border-main rounded-lg appearance-none">
                  <option :value="null">-- Chọn thể loại --</option>
                  <option v-for="category in categories" :key="category.id" :value="category.type">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            <div>
              
              <div class="relative">
                <select v-model="selectedStatus" id="status"
                  class="block w-full px-4 py-3 pr-10 text-base border border-gray-300 focus:outline-none focus:ring-main focus:border-main rounded-lg appearance-none">
                  <option :value="null">--Tất cả--</option>
                  <option :value="0">🕒 Chờ Duyệt</option>
                  <option :value="1">✅ Đã Duyệt</option>
                </select>
              </div>
            </div>
            <div
              class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button type="submit"
                class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
        <div
          class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button @click="openAddModal" type="button"
            class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            Thêm bài đăng
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">ID</th>
                <th scope="col" class="px-4 py-3">Hình ảnh</th>
                <th scope="col" class="px-4 py-3">Tiêu đề</th>
                <th scope="col" class="px-4 py-3">Nội dung</th>
                <th scope="col" class="px-4 py-3">Thể loại</th>
                <th scope="col" class="px-4 py-3">Ngày tạo</th>
                <th scope="col" class="px-4 py-3">Ngày cập nhật</th>
                <th scope="col" class="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="allPosts.length === 0">
                <td colspan="8" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                  Không tìm thấy bài đăng nào.
                </td>
              </tr>
              <tr v-for="post in allPosts" :key="post.id" class="border-b dark:border-gray-700">
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">{{ post.id }}</td>
                <td class="px-4 py-3">
                  <img :src="getUrlImage(post.image_url)" :alt="post.title" class="w-20 h-16 object-cover rounded">
                </td>
                <td class="px-4 py-3 max-w-xs truncate">{{ post.title }}</td>
                <td class="px-4 py-3 max-w-sm truncate">{{ post.content }}</td>
                <td class="px-4 py-3">{{ post.category_ids }}</td>
                <td class="px-4 py-3">{{ formatDate(post.created_at) }}</td>
                <td class="px-4 py-3">{{ formatDate(post.updated_at) }}</td>
                <td class="px-4 py-3 flex items-center justify-center space-x-2">
                  <button @click="openEditModal(post)" type="button"
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-900">
                    Sửa
                  </button>
                  <button @click="confirmDelete(post.id)" type="button"
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
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ (currentPage - 1) * itemsPerPage + 1 }} -
              {{ Math.min(currentPage * itemsPerPage, meta.totalItems) }}
            </span>
            trên
            <span class="font-semibold text-gray-900 dark:text-white">{{ meta.totalItems }}</span>
          </span>

          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <button @click="prevPage" :disabled="currentPage === 1"
                class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                <span>Previous</span>
              </button>
            </li>

            <li v-for="page in totalPages" :key="page">
              <button @click="goToPage(page)" :class="{
                'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700': page === currentPage,
                'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700': page !== currentPage
              }" class="flex items-center justify-center text-sm py-2 px-3 leading-tight">
                {{ page }}
              </button>
            </li>

            <li>
              <button @click="nextPage" :disabled="currentPage === totalPages"
                class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                <span>Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Add New Post Modal -->
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
          <form @submit.prevent="addNewPost">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label for="add-title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu
                  đề</label>
                <input v-model="newPost.title" type="text" id="add-title"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required>
              </div>
              <div>
                <label for="add-category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thể
                  loại</label>
                <!-- CẬP NHẬT Ở ĐÂY: Sử dụng select đa lựa chọn -->
                <select multiple v-model="newPost.selectedCategoryIds" id="add-category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <!-- Kích thước để dễ thao tác -->
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">Giữ Ctrl/Cmd để chọn nhiều.</p>
              </div>
              <div class="sm:col-span-2">
                <label for="add-image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn Hình
                  ảnh</label>
                <input @change="onAddFileSelected" type="file" id="add-image"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG, JPEG, GIF (Tối
                  đa 5MB).</p>
              </div>
              <div class="sm:col-span-2">
                <label for="add-content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội
                  dung</label>
                <textarea v-model="newPost.content" id="add-content" rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required></textarea>
              </div>
              <!-- Hidden input for updated_by -->
              <input type="hidden" v-model="newPost.updated_by">
            </div>
            <button type="submit"
              class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Thêm bài đăng
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Post Modal -->
    <div v-if="showEditModal" id="edit-modal" tabindex="-1" aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50">
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Chỉnh Sửa Bài Đăng</h3>
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
          <form @submit.prevent="updatePost">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label for="edit-title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tiêu
                  đề</label>
                <input v-model="editPost.title" type="text" id="edit-title"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required>
              </div>
              <div>
                <label for="edit-category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thể
                  loại</label>
                <!-- CẬP NHẬT Ở ĐÂY: Sử dụng select đa lựa chọn -->
                <select multiple v-model="editPost.selectedCategoryIds" id="edit-category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <!-- Kích thước để dễ thao tác -->
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">Giữ Ctrl/Cmd để chọn nhiều.</p>
              </div>
              <div class="sm:col-span-2">
                <label for="edit-image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn Hình
                  ảnh mới (để thay thế)</label>
                <input @change="onEditFileSelected" type="file" id="edit-image"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG, JPEG, GIF (Tối
                  đa 5MB).</p>
                <div class="mt-2" v-if="editPost.image_url">
                  <p class="text-sm text-gray-600 dark:text-gray-400">Ảnh hiện tại:</p>
                  <img :src="getUrlImage(editPost.image_url)" alt="Current Image"
                    class="w-32 h-32 object-cover rounded-lg mt-1 border border-gray-300">
                  <div class="flex items-center mt-2">
                    <input type="checkbox" id="remove-image" v-model="removeCurrentImage"
                      class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="remove-image" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Xóa ảnh
                      hiện tại</label>
                  </div>
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="edit-content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nội
                  dung</label>
                <textarea v-model="editPost.content" id="edit-content" rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required></textarea>
              </div>
              <!-- Hidden input for updated_by -->
              <input type="hidden" v-model="editPost.updated_by">
            </div>
            <button type="submit"
              class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Cập nhật bài đăng
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
          <p class="mb-4 text-gray-500 dark:text-gray-300">Bạn có chắc chắn muốn xóa bài đăng này không?</p>
          <div class="flex justify-center items-center space-x-4">
            <button @click="cancelDelete" type="button"
              class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600">
              Hủy
            </button>
            <button @click="deletePost" type="submit"
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
const DOMAIN = process.env.DOMAIN_API ?? "https://api.dailychill.vn/";
import main from "~/mixins/main";

export default {
  name: 'ArticlesPage',
  layout: "Admin",
  mixins: [main],
  data() {
    return {
      allPosts: [], // Lưu trữ toàn bộ danh sách bài đăng gốc
      searchQuery: '', // Dữ liệu cho ô tìm kiếm
      currentPage: 1,
      itemsPerPage: 15,
      totalPages: 0,
      meta: {
        totalItems: 0
      },

      showEditModal: false, // Trạng thái hiển thị modal sửa
      showDeleteModal: false, // Trạng thái hiển thị modal xóa
      selectedPost: null, // Bài đăng đang được chọn để sửa/xóa

      // **** THAY ĐỔI 3: Thêm state cho modal "Thêm" ****
      showAddModal: false,
      newPost: {
        title: '',
        category: '',
        image_url: '',
        content: '',
        selectedCategoryIds: [],
        user_id: null,
      },
      editPost: { // Dữ liệu cho bài đăng đang chỉnh sửa
        id: null,
        title: '',
        content: '',
        category_ids: '',
        image_url: null, // Để hiển thị ảnh cũ
        updated_by: 1, // Ví dụ: ID người dùng mặc định
        selectedCategoryIds: [],
        user_id: null,
      },
      selectedAddFile: null, // File được chọn khi thêm mới
      selectedEditFile: null, // File được chọn khi chỉnh sửa
      removeCurrentImage: false, // Cờ để xóa ảnh hiện tại khi chỉnh sửa
      postIdToDelete: null, // ID bài viết cần xóa
      toast: { // Hệ thống thông báo toast
        show: false,
        message: '',
        type: '', // 'success' or 'error'
      },
      categories: [],
      selectedCategory: null,
      selectedStatus: null,
    };
  },
  computed: {
   
  },
  watch: {

  },
  mounted() {
    
  },
  async fetch() {
    // Tải tất cả bài viết khi component được tạo
    await this.fetchArticles();
    await this.getAllCategories();
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
      this.newPost = {
        title: '',
        category: '',
        image_url: 'https://picsum.photos/seed/new/200/150', // Gợi ý một ảnh mẫu
        content: '',
        selectedCategoryIds: [],
        user_id: null,
      };
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
    },

    async fetchArticles() {
      try {
        if (this.searchQuery) { // có search thì về page 1
          this.currentPage = 1;
        }
        let params = {
            searchQuery: this.searchQuery,
            limit: this.itemsPerPage,
            page: this.currentPage,
            isAdmin: 1,
        };
        if (this.selectedCategory != null) { // lọc thể loại
          params.category = this.selectedCategory; 
          params.page = 1; // có search thì về page 1
        }
        if (this.selectedStatus != null) { // lọc trạng thái bài đăng
          params.status = this.selectedStatus;
          params.page = 1; // có search thì về page 1
        }

        const response = await this.$axios.$get('/articles', {
          params
        });
        // Lấy tất cả bài viết và sắp xếp theo ID giảm dần (mới nhất lên đầu)
        // this.allPosts = response.data.sort((a, b) => b.id - a.id);
        this.allPosts = response.data;
        this.meta = response.meta;
        this.totalPages = response.meta.totalPages;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài viết:', error);
        this.showToast('Lỗi khi tải bài viết!', 'error');
      }
    },
    async getAllCategories() {
      try {
        const response = await this.$axios.$get('/categories'); 
        this.categories = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phân loại:', error);
        this.showToast('Lỗi khi tải phân loại!', 'error');
      }
    },


    // --- LOGIC PHÂN TRANG ---
    goToPage(page) {
      if (page === this.currentPage) return;
      this.currentPage = page;
      this.fetchArticles();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchArticles();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchArticles();
      }
    },

    // --- LOGIC MODAL ---
    async openEditModal(post) {
      // Fetch the latest data for the post in case it was updated elsewhere
      try {
        const response = await this.$axios.$get(`/articles/${post.id}`);
        this.editPost = { ...response }; // Copy current post data to editPost
        this.selectedEditFile = null; // Reset selected file for edit
        this.removeCurrentImage = false; // Reset remove image flag
        // Reset input type="file"
        if (document.getElementById('edit-image')) {
          document.getElementById('edit-image').value = '';
        }
        if (response?.category_ids) {
          this.editPost.selectedCategoryIds = response?.category_ids?.split(',').map(Number);
        }
       
        this.showEditModal = true;
      } catch (error) {
        console.error('Lỗi khi tải bài viết để chỉnh sửa:', error);
        this.showToast('Lỗi khi tải thông tin bài viết!', 'error');
      }
    },
    closeEditModal() {
      this.showEditModal = false;
      this.clearEditForm();
    },
    clearEditForm() {
      this.editPost = {
        id: null,
        title: '',
        content: '',
        category_ids: '',
        image_url: null,
        updated_by: 1,
        selectedCategoryIds: [],
        user_id: null,
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
      // Tìm index của bài viết cần cập nhật trong danh sách gốc
      const index = this.allPosts.findIndex(p => p.id === this.selectedPost.id);
      if (index !== -1) {
        // Cập nhật lại ngày `updated_at`
        this.selectedPost.updated_at = new Date().toISOString();
        // Cập nhật bài viết trong danh sách gốc
        this.allPosts.splice(index, 1, this.selectedPost);
      }
      // Đóng modal
      this.closeEditModal();
      console.log('Đã lưu thay đổi cho post ID:', this.selectedPost.id);
    },
    openDeleteModal(post) {
      this.selectedPost = post;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.selectedPost = null;
    },

    // --- UTILITIES ---
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('vi-VN', options);
    },

    createFormData(data, file = null, removeImage = false) {
      const formData = new FormData();

      // Append all text fields from the data object, skipping category_ids and selectedCategoryIds
      for (const key in data) {
        if (key === 'category_ids' || key === 'selectedCategoryIds') {
          continue; // Skip these as they are handled specifically below
        }
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      }

      // Convert selectedCategoryIds array to a comma-separated string and append
      if (data.selectedCategoryIds && data.selectedCategoryIds.length > 0) {
        formData.append('category_ids', data.selectedCategoryIds.join(','));
      } else {
        formData.append('category_ids', ''); // Send an empty string if no categories are selected
      }

      // Append the image file if selected
      if (file) {
        formData.append('image', file); // 'image' must match the field name in your Multer configuration
      } else if (removeImage) {
        // If no new file is selected but the user wants to remove the current image
        formData.append('remove_image', 'true'); // 'remove_image' must match the flag expected by your backend controller
      }
      return formData;
    },

    // --- Add New Post ---
    async addNewPost() {
      try {
        // Create FormData from newPost data and the selected image file
        const formData = this.createFormData(this.newPost, this.selectedAddFile);

        // Call the API POST endpoint to create a new article
        // Ensure the base URL is configured in nuxt.config.js, so /articles is correct
        const token = this.getCookie("token_user");
        const response = await this.$axios.$post(`/articles`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        // Show success toast notification
        this.showToast('Tạo bài viết thành công!', 'success');
        // Close the add post modal
        this.closeAddModal();
        // Reload the article list to display the newly added post
        await this.fetchArticles();
      } catch (error) {
        // Log the error to console for debugging
        console.error('Lỗi khi tạo bài viết:', error.response ? error.response.data : error.message);
        // Show error toast notification with a user-friendly message
        this.showToast('Lỗi khi tạo bài viết: ' + (error.response ? error.response.data.message : error.message), 'error');
      }
    },

    // --- Update Post ---
    async updatePost() {
      try {
        // Create FormData from editPost data, the newly selected image file, and the remove image flag
        const formData = this.createFormData(this.editPost, this.selectedEditFile, this.removeCurrentImage);

        // Call the API PUT endpoint to update the article by its ID
        const response = await this.$axios.$put(`/articles/${this.editPost.id}`, formData);

        // Show success toast notification
        this.showToast('Cập nhật bài viết thành công!', 'success');
        // Close the edit post modal
        this.closeEditModal();
        // Reload the article list to display the updated post
        await this.fetchArticles();
      } catch (error) {
        // Log the error to console for debugging
        console.error('Lỗi khi cập nhật bài viết:', error.response ? error.response.data : error.message);
        // Show error toast notification with a user-friendly message
        this.showToast('Lỗi khi cập nhật bài viết: ' + (error.response ? error.response.data.message : error.message), 'error');
      }
    },

    // --- Delete Post ---
    confirmDelete(postId) {
      this.postIdToDelete = postId;
      this.showDeleteModal = true;
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.postIdToDelete = null;
    },
    async deletePost() {
      try {
        // Đây là ví dụ cho xóa mềm (soft delete) nếu backend của bạn có hỗ trợ.
        // Nếu backend là xóa cứng, bạn sẽ gọi endpoint DELETE.
        // Giả định bạn có một endpoint để cập nhật 'deleted' flag
        // Hoặc bạn sẽ tạo một hàm `softDeleteArticle` trong Article model và route tương ứng.
        // Dưới đây là ví dụ gọi API DELETE.
        const response = await this.$axios.$delete(`/articles/${this.postIdToDelete}`); // Endpoint DELETE
        this.showToast('Xóa bài viết thành công!', 'success');
        this.showDeleteModal = false;
        this.postIdToDelete = null;
        await this.fetchArticles(); // Tải lại danh sách bài viết
      } catch (error) {
        console.error('Lỗi khi xóa bài viết:', error.response ? error.response.data : error.message);
        this.showToast('Lỗi khi xóa bài viết: ' + (error.response ? error.response.data.message : error.message), 'error');
      }
    },
    getUrlImage(img) {
      // nếu là ảnh có https thì lấy luôn, không thì thêm DOMAIN vào 
      if (img && img?.includes('https')) {
        return img;
      }
      return DOMAIN + img;
    },
    onSearch() {
      this.fetchArticles();
    },

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