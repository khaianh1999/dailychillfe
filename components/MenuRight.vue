<template>
        <div>
                <!-- Màn nhỏ: hàng ngang, cuộn -->
                <div class="lg:hidden overflow-x-auto hide-scrollbar py-2">
                        <div class="flex space-x-2 min-w-max lg:px-2">
                                <nuxt-link v-for="item in categories" :key="item.slug" :to="`/category/${item.slug}`"
                                        :class="[
                                                'flex-shrink-0 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition',
                                                $route.path === `/category/${item.slug}`
                                                        ? 'bg-main text-white'
                                                        : 'text-textmain hover:bg-main hover:text-white'
                                        ]">
                                        {{ item.name }}
                                </nuxt-link>
                        </div>
                </div>

                <!-- Màn to: dạng danh sách dọc -->
                <div class="hidden lg:block bg-white rounded-xl shadow-md border border-gray-200 p-4">
                        <h2 class="text-lg font-bold mb-3 text-textmain">🌿Không gian chữa lành</h2>
                        <ul class="space-y-2">
                                <li v-for="item in categories" :key="item.slug">
                                        <nuxt-link :to="`/category/${item.slug}`" :class="[
                                                'block px-3 py-2 rounded-md transition',
                                                $route.path === `/category/${item.slug}`
                                                        ? 'bg-main text-white'
                                                        : 'text-textmain hover:bg-main hover:text-white'
                                        ]">
                                                {{ item.name }}
                                        </nuxt-link>
                                </li>
                        </ul>
                </div>
        </div>
</template>

<script>
export default {
        data() {
                return {
                        categories: [
                                { slug: 'nhe-nhang-thoi', name: 'Nhẹ Nhàng Thôi' },
                                { slug: 'tram-dung-cam-xuc', name: 'Trạm Dừng Cảm Xúc' },
                                { slug: 'may-troi-nhe-nhang', name: 'Mây Trôi Nhẹ Nhàng' },
                                { slug: 'tach-tra-nho', name: 'Tách Trà Nhỏ' },
                                { slug: 'lang-le-chill', name: 'Lặng Lẽ Chill' },
                                { slug: 'la-va-gio', name: 'Lá & Gió' },
                                { slug: 'goc-diu-em', name: 'Một Góc Dịu Êm' },
                                { slug: 'nha-co-may', name: 'Nhà Có Mây' },
                                { slug: 'cham-mot-nhip', name: 'Chậm Một Nhịp' },
                                { slug: 'thanh-thoi', name: 'Thảnh Thơi' },
                        ]
                }
        }
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
        display: none;
}

.hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
}
</style>