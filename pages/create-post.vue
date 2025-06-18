<template>
    <div class="container mx-auto bg-yellow-50">
        <section class="max-w-4xl mx-auto px-4 py-16 ">
            <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">📝 Tạo Bài Viết Mới</h1>
            <p class="text-center mb-6">Hãy tích cực tạo bài viết hay để nhận được 🪙 nhé !!!</p>
            <div class="bg-white p-6 rounded-xl shadow-md">
                <form @submit.prevent="addNewPost" class="space-y-6">
                    <div>
                        <label for="title" class="block mb-2 text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input v-model="newPost.title" type="text" id="title" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main" />
                    </div>

                    <div>
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-700">Thể loại</label>
                        <select multiple v-model="newPost.selectedCategoryIds" id="category"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main">
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                        <p class="text-sm text-gray-500 mt-1">Giữ Ctrl/Cmd để chọn nhiều thể loại.</p>
                    </div>

                    <div>
                        <label for="image" class="block mb-2 text-sm font-medium text-gray-700">Hình ảnh</label>
                        <input @change="onAddFileSelected" type="file" id="image" accept="image/*"
                            class="w-full text-sm border border-gray-300 rounded-lg file:bg-main file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg cursor-pointer" />
                        <p class="text-sm text-gray-500 mt-1">Chấp nhận PNG, JPG, JPEG, GIF. Tối đa 5MB.</p>
                    </div>

                    <div>
                        <label for="content" class="block mb-2 text-sm font-medium text-gray-700">Nội dung</label>
                        <client-only>
                        <ckeditor
                            v-if="editor"
                            :editor="editor"
                            v-model="newPost.content"
                            :config="editorConfig"
                        />
                        </client-only>
                        <!-- <textarea v-model="newPost.content" id="content" rows="6" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"></textarea> -->
                    </div>

                    <input type="hidden" v-model="newPost.updated_by" />

                    <div class="text-center">
                        <button type="submit"
                        :disabled="isSubmitting"
                        :class="[
                            'bg-main hover:bg-hover text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200',
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        ]">
                            {{ isSubmitting ? 'Đang gửi...' : 'Tạo Bài Viết' }}
                        </button>
                    </div>
                </form>
            </div>
            <!-- Toast/Notification System -->
            <div v-if="toast.show" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white"
                :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'">
            {{ toast.message }}
            </div>
        </section>
        <Youtube/>
    </div>
</template>

<script>
const DOMAIN = process.env.DOMAIN_API ?? "https://api.dailychill.vn/";
import main from "~/mixins/main";
import Youtube from "../components/Youtube.vue";
// import CKEditor from '@ckeditor/ckeditor5-vue2';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    name: "CreatePostPage",
    layout: "Main",
    mixins: [main],
    components: {
        Youtube,
        // ckeditor: CKEditor.component,
    },
    data() {
        return {
            toast: { // Hệ thống thông báo toast
                show: false,
                message: '',
                type: '', // 'success' or 'error'
            },
            newPost: {
                title: '',
                content: '',
                selectedCategoryIds: [],
                updated_by: this.$auth?.user?.id || null
            },
            selectedAddFile: null,
            categories: [], // Assume fetched from API
            isSubmitting: false,
            editor: null,
            editorConfig: {
                toolbar: [
                    'heading', '|',
                    'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                    'blockQuote', 'insertTable', 'undo', 'redo'
                ]
            },
        };
    },
    async mounted() {
        await this.fetchCategories();

        // 👇 Lazy load ClassicEditor khi mounted (client-side only)
        if (process.client) {
            const ClassicEditor = (await import('@ckeditor/ckeditor5-build-classic')).default
            this.editor = ClassicEditor
        }
    },
    methods: {
        showToast(message, type) {
          this.toast.message = message;
          this.toast.type = type;
          this.toast.show = true;
          setTimeout(() => {
            this.toast.show = false;
          }, 5000); // Tự động ẩn sau 5 giây
        },
        async fetchCategories() {
            try {
                const res = await this.$axios.$get('/categories');
                this.categories = res?.data ?? [];
            } catch (err) {
                console.error("Lỗi tải thể loại:", err);
            }
        },
        onAddFileSelected(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedAddFile = file;
            }
        },
        createFormData(data, file) {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('updated_by', data.updated_by);
            // formData.append('category_ids', JSON.stringify(data.selectedCategoryIds));
            // Chuyển mảng ID sang chuỗi, ví dụ: [1, 3, 4] → "1,3,4"
            const categoryIdsString = (data.selectedCategoryIds || []).join(',');
            formData.append('category_ids', categoryIdsString);
            if (file) formData.append('image', file);
            return formData;
        },
        async addNewPost() {
            if (this.isSubmitting) return; // Tránh nhấn nhiều lần
            this.isSubmitting = true;

            // ✅ Kiểm tra số bài viết hôm nay
            if (this.getPostCountToday() >= 5) {
                this.showToast('Bạn đã đăng tối đa 5 bài viết hôm nay. Hãy quay lại vào ngày mai nhé!', 'error');
                this.isSubmitting = false;
                return;
            }

            // Kiểm tra dữ liệu trước khi gửi
            if (!this.newPost.title.trim()) {
                this.showToast('Vui lòng nhập tiêu đề.', 'error');
                this.isSubmitting = false;
                return;
            }

            if (!this.newPost.content.trim()) {
                this.showToast('Vui lòng nhập nội dung.', 'error');
                this.isSubmitting = false;
                return;
            }

            if (!this.newPost.selectedCategoryIds || this.newPost.selectedCategoryIds.length === 0) {
                this.showToast('Vui lòng chọn ít nhất 1 thể loại.', 'error');
                return;
            }

            if (!this.selectedAddFile) {
                this.showToast('Vui lòng chọn hình ảnh.', 'error');
                this.isSubmitting = false;
                return;
            }

            try {
                const formData = this.createFormData(this.newPost, this.selectedAddFile);
                const token = this.getCookie("token_user");

                if (!token) {
                    this.showToast('Vui lòng Đăng nhập để tích coin!.', 'error');
                    this.isSubmitting = false;
                    return;
                }

                const response = await this.$axios.$post(`${DOMAIN}articles/api`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                this.showToast('Tạo bài viết thành công! Vui lòng chờ duyệt!', 'success');

                // Reset form
                this.newPost = {
                    title: '',
                    content: '',
                    selectedCategoryIds: [],
                    updated_by: this.$auth?.user?.id || null
                };
                this.selectedAddFile = null;
            } catch (error) {
                console.error('Lỗi khi tạo bài viết:', error);
                this.showToast('Lỗi tạo bài viết!', 'error');
            } finally {
                this.isSubmitting = false;
            }
        },
        getTodayKey() {
            const today = new Date();
            return today.toISOString().split('T')[0]; // Ví dụ: "2025-06-15"
        },

        getPostCountToday() {
            const key = this.getTodayKey();
            const raw = localStorage.getItem('dailyPostLimits') || '{}';
            const limits = JSON.parse(raw);
            return limits[key] || 0;
        },

        increasePostCountToday() {
            const key = this.getTodayKey();
            const raw = localStorage.getItem('dailyPostLimits') || '{}';
            const limits = JSON.parse(raw);
            limits[key] = (limits[key] || 0) + 1;
            localStorage.setItem('dailyPostLimits', JSON.stringify(limits));
        },
    }
};
</script>

<style scoped>
/* Tailwind được sử dụng nên style chỉ cần bổ sung rất ít */
</style>