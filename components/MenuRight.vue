<template>
        <div class="sticky top-4 space-y-4 min-h-screen">
                <div class="bg-white rounded-xl shadow-md border border-gray-200 p-4">
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
                        ],
                };
        },
};
</script>