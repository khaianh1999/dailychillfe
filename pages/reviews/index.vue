<template>
    <div class="mt-14">
        <div class="container mx-auto px-4 lg:py-8">
            <div class="flex items-center gap-1">DailyChill > 
                <h1>Review sách</h1>
            </div>
            <div class="py-4">
                <form @submit.prevent="onSearch" class="w-full max-w-xl">
                    <div class="relative flex items-center gap-2">
                        <input
                            type="text"
                            v-model="query"
                            placeholder="Tìm kiếm bài viết..."
                            class="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-main shadow-sm text-gray-800"
                        />
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                            class="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                            />
                            </svg>
                        </div>
                        <button type="submit" class="btn py-3 whitespace-nowrap w-fit inline-block bg-main hover:bg-hover text-white font-semibold py-2 px-4 rounded transition">Tìm kiếm</button>
                    </div>
                </form>
            </div>
            <div class="columns-1 md:columns-3 gap-4">
                <div v-for="i in 9" :key="i" class="break-inside-avoid bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                <div class="blog-card">
                    <a href="https://www.wix.com/demone2/travel-blog/post/outdoor-cooking-hacks" class="block">
                    <img src="https://static.wixstatic.com/media/b9129a16fc024475a5f969c9bc538a63.jpg"
                        alt="Outdoor cooking hacks" class="w-full h-auto rounded-lg" />
                    <div class="p-4">
                        <h2 class="text-xl font-bold mb-2">Outdoor cooking hacks</h2>
                        <p class="text-gray-600 mb-2">Create a blog post subtitle that summarizes your post in a few short,
                        punchy sentences and entices your audience to continue reading Create a blog post subtitle that
                        summarizes your post in a few short,
                        punchy sentences and entices your audience to continue reading...</p>
                        <div class="text-sm text-gray-500 flex justify-between items-center">
                        <span>By Admin</span> •
                        <span>Mar 22, 2023</span> •
                        <span>2 min read</span>
                        </div>
                    </div>
                    </a>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ReviewPage',
    layout: 'Main',
    head() {
      return {
        title: 'Review sách hay',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'Review sách, tóm tắt sách, bình phẩm sách hay',
          },
        ],
      };
    },
    components: {
    },
    data() {
        return {
            dataRender: [],
            query: '',
        }
    },
    methods: {
        onSearch() {
            // Thực hiện xử lý tìm kiếm, ví dụ:
            this.$router.push({ path: '/search', query: { q: this.query } });
        },
    },
  }
</script>