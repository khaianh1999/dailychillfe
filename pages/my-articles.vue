<template>
    <div class="mt-[66px]">
        <div class="container mx-auto px-4 py-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Bài viết của tôi</h1>

            <div v-if="dataRender.length === 0" class="text-gray-600 text-center">
                Bạn chưa có bài viết nào.
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(item, index) in dataRender" :key="index"
                    class="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <!-- Nếu đã duyệt, dùng nuxt-link. Nếu chưa duyệt thì dùng div tĩnh -->
                    <component :is="item.status == 1 ? 'nuxt-link' : 'div'"
                        :to="item.status == 1 ? `/detail/${item.id}` : null" class="block cursor-pointer"
                        :class="{ 'opacity-60 pointer-events-none': item.status == 0 }">
                        <img :src="getUrlImage(item)" alt="dailychill" class="rounded-lg w-full mb-4" loading="lazy"/>
                        <h2 class="text-xl font-semibold text-gray-800">{{ item.title }}</h2>
                        <p class="text-sm text-gray-600 clamp-5-lines" v-html="item.content"></p>
                        <div class="mt-2 text-sm text-gray-500 flex justify-between">
                            <span>{{ new Date(item.created_at).toLocaleString() }}</span>
                            <span>
                                <span v-if="item.status == 0" class="text-yellow-500">Chờ duyệt</span>
                                <span v-else class="text-green-600">Đã duyệt</span>
                            </span>
                        </div>
                    </component>
                </div>
            </div>

            <!-- Phân trang -->
            <div class="flex justify-center mt-6">
                <nav class="inline-flex -space-x-px text-sm">
                    <button
                        class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                        :disabled="meta.currentPage === 1" @click="changePage(meta.currentPage - 1)">
                        Trước
                    </button>

                    <button v-for="page in meta.totalPages" :key="page"
                        class="px-3 py-2 leading-tight border border-gray-300 hover:bg-yellow-300" :class="{
                            'bg-main text-white': meta.currentPage === page,
                            'text-gray-500 bg-white': meta.currentPage !== page
                        }" @click="changePage(page)">
                        {{ page }}
                    </button>

                    <button
                        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                        :disabled="meta.currentPage === meta.totalPages" @click="changePage(meta.currentPage + 1)">
                        Sau
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
const DOMAIN = process.env.DOMAIN_API ?? "https://api.dailychill.vn/";
import main from "~/mixins/main";

export default {
    layout: 'Main',
    mixins: [main],
    data() {
        return {
            dataRender: [],
            meta: {
                totalItems: 0,
                itemsPerPage: 10,
                currentPage: 1,
                totalPages: 1,
            },
        };
    },
    async mounted() {
        await this.fetchMyArticles();
    },
    methods: {
        async fetchMyArticles(page = 1) {
            try {
                const token = this.getCookie("token_user"); // Lấy token từ mixin
                const res = await this.$axios.$get(`/articles/my-articles?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.dataRender = res.data ?? [];
                this.meta = res.meta ?? {};
            } catch (err) {
                console.error("Lỗi khi tải bài viết của tôi:", err);
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.meta.totalPages) {
                this.meta.currentPage = page;
                this.fetchMyArticles(page);
            }
        },
        getUrlImage(item) {
            if (item?.image_url?.includes("https")) {
                return item.image_url;
            }
            return DOMAIN + item.image_url;
        },
    },
};
</script>

<style scoped>
.clamp-5-lines {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>