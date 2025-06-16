<template>
    <div>
        <button type="button" @click="verifyArticleForUser"
            class="btn py-3 whitespace-nowrap w-fit inline-block bg-main hover:bg-hover text-white font-semibold px-4 rounded transition">
            Duyệt bài đăng cho người dùng
        </button>
        <div class="min-h-screen bg-gray-50 pt-16 lg:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <img :src="getUrlImage(dataRender?.image_url)" alt="Outdoor cooking hacks"
                    class="w-full h-64 object-cover" />

                <div class="p-6 sm:p-8">
                    <!-- Title -->
                    <h1 class="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
                        {{ dataRender?.title }}
                    </h1>

                    <!-- Meta -->
                    <div class="text-sm text-gray-500 mb-6 flex flex-wrap gap-2">
                        <span>By <strong class="text-gray-700">{{ dataRender?.full_name ?? 'Admin' }}</strong></span>
                        <span>•</span>
                        <span>{{ new Date(dataRender?.created_at).toLocaleString() }}</span>
                        <span>•</span>
                        <span>2 min read</span>
                    </div>

                    <!-- Content -->
                    <div class="text-gray-700 leading-relaxed space-y-4" v-html="dataRender?.content">

                    </div>

                    <!-- Back link -->
                    <div class="mt-10">
                        <nuxt-link to="/"
                            class="inline-block bg-main hover:bg-hover text-white font-semibold py-2 px-4 rounded transition">
                            ← Về trang chủ
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <!-- Toast/Notification System -->
            <div v-if="toast.show" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white"
                :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'">
                {{ toast.message }}
            </div>
        </div>
    </div>
</template>

<script>
const DOMAIN = process.env.DOMAIN_API ?? "http://103.159.51.131:3001/";
import main from "~/mixins/main";
export default {
    layout: 'Admin',
    mixins: [main],
    components: {
    },
    async fetch() {
        await this.getDetailArticle();
    },
    data() {
        return {
            dataRender: null,
            idDetail: null,
            toast: { // Hệ thống thông báo toast
                show: false,
                message: '',
                type: '', // 'success' or 'error'
            },
        }
    },
    methods: {
        async getDetailArticle() {
            try {
                this.idDetail = this.$route.params.id;
                const response = await this.$axios.$get('/articles/api/' + this.idDetail); // Thay đổi endpoint nếu cần
                this.dataRender = response.data;

            } catch (error) {
                console.error('Lỗi khi lấy chi tiết bài viết:', error);
                this.showToast('Lỗi khi tải bài viết!', 'error');
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
        getUrlImage(img) {
            // nếu là ảnh có https thì lấy luôn, không thì thêm DOMAIN vào 
            if (img && img?.includes('https')) {
                return img;
            }
            return DOMAIN + img;
        },
        async verifyArticleForUser() {
            const payload = {
                article_id: parseInt(this.$route.params.id), // Lấy article_id từ URL
            };
            
            const token = this.getCookie("token_user");
            const response = await this.$axios.$post(`/articles/put-article`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("response", response);
            this.showToast('Duyệt bài thành công!', 'success');
        },
    },
}
</script>
