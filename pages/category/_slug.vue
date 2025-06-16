<template>
    <div class="mt-[56px]">
        <div class="container mx-auto px-4 lg:py-8">
            <div class="py-4 w-full max-w-6xl mx-auto">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <!-- Nút Tạo bài viết -->
                    <nuxt-link to="/create-post"
                        class="bg-main hover:bg-hover text-white font-semibold px-6 py-3 rounded-lg shadow text-sm sm:text-base transition">
                        ✍️ Tạo bài viết
                    </nuxt-link>

                    <!-- Form tìm kiếm -->
                    <form @submit.prevent="onSearch" class="w-full lg:w-2/5 sm:w-auto">
                        <div class="relative flex items-center gap-2">
                            <input type="text" v-model="searchQuery" placeholder="Tìm kiếm bài viết..."
                                class="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main shadow-sm text-gray-800" />
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                                </svg>
                            </div>
                            <button type="submit"
                                class="btn py-3 whitespace-nowrap w-fit inline-block bg-main hover:bg-hover text-white font-semibold px-4 rounded transition">
                                Tìm kiếm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12">
                <div class="col-span-1 lg:col-span-9">
                    <!-- Wrapper masonry -->
                    <div class="columns-1 md:columns-2 gap-4">


                        <!-- Bài viết -->
                        <div v-for="(item, index) in dataRender" :key="index"
                            class="break-inside-avoid bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                            <div class="blog-card">
                                <nuxt-link :to="/detail/ + item.id" class="block">
                                    <img :src="getUrlImage(item)" alt="Outdoor cooking hacks"
                                        class="w-full h-auto rounded-lg" />
                                    <div class="p-4">
                                        <h2 class="text-xl font-bold mb-2">{{ item?.title }}</h2>
                                        <p class="text-gray-600 mb-2" v-html="item?.content"></p>
                                        <div class="text-sm text-gray-500 flex justify-between items-center">
                                            <span>By Admin</span> •
                                            <span>{{ new Date(item.created_at).toLocaleString() }}</span> •
                                            <span>2 min read</span>
                                        </div>
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Danh mục nằm trong cột phải (col-span-4) -->
                <div class="col-span-1 lg:col-span-3 ml-0 lg:ml-4">
                    <MenuRight />
                </div>

            </div>
        </div>

        <div class="flex justify-center mt-6">
            <nav class="inline-flex -space-x-px text-sm">
                <button
                    class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                    :disabled="meta.currentPage === 1" @click="changePage(meta.currentPage - 1)">
                    Trước
                </button>

                <button v-for="page in meta.totalPages" :key="page"
                    class="px-3 py-2 leading-tight border border-gray-300 hover:bg-pink-100" :class="{
                        'bg-pink-500 text-white': meta.currentPage === page,
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
</template>

<script>
const DOMAIN = process.env.DOMAIN_API ?? "https://api.dailychill.vn/";
import MenuRight from "../../components/MenuRight.vue";

export default {
    name: 'CategoryPage',
    layout: "Main",
    components: {
        MenuRight,
    },
    data() {
        return {
            dataRender: [],
            searchQuery: '',
            slug: "",
            meta: {
                totalItems: 0,
                itemsPerPage: 10,
                currentPage: 1,
                totalPages: 1,
            },
        }
    },
    async fetch() {
        // Tải tất cả bài viết khi component được tạo
        await this.fetchArticles();
    },
    mounted() {
        this.fetchArticles(this.meta.currentPage);
    },
    methods: {
        changePage(page) {
            if (page >= 1 && page <= this.meta.totalPages) {
            this.meta.currentPage = page;
            this.fetchArticles(page);
            }
        },
        async fetchArticles(page = 1) {
            try {
                this.slug = this.$route.params.slug;
                const response = await this.$axios.$get(`/articles?category=${this.slug}&searchQuery=${this.searchQuery}&limit=50&page=${page}`);
                this.dataRender = response.data ?? [];
                this.meta = response.meta ?? {};
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài viết:', error);
                // this.showToast('Lỗi khi tải bài viết!', 'error');
            }
        },
        getUrlImage(item) {
            // nếu là ảnh có https thì lấy luôn, không thì thêm DOMAIN vào 
            if (item?.image_url?.includes('https')) {
                return item.image_url;
            }
            return DOMAIN + item?.image_url;
        },
        onSearch() {
            this.fetchArticles();
        },

    }
}
</script>