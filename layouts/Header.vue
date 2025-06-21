<template>
    <header class="bg-main text-white shadow-md fixed top-0 left-0 w-full z-50">
        <nav class="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
            <!-- Logo -->
            <NuxtLink to="/" class="flex items-center space-x-3">
                <!-- <img src="@/assets/images/logo.png" alt="Logo" class="h-8" /> -->
                <span class="text-xl font-semibold text-yellow-300">DailyChill</span>
            </NuxtLink>

            <!-- Desktop menu -->
            <ul class="hidden md:flex space-x-6 text-sm lg:text-base font-medium">
                <li v-for="item in navItems" :key="item.path">
                    <NuxtLink
                        :to="item.path"
                        :class="[
                        'transition hover:text-hover',
                        isActive(item.path) ? 'text-yellow-300 font-semibold' : ''
                        ]"
                    >
                        {{ item.label }}
                    </NuxtLink>
                </li>
            </ul>

            <!-- Login + Mobile toggle -->
            <div class="flex items-center space-x-2">
                <div class="relative">
                    <div v-if="$store.getters['user/isAuthenticated']" class="relative">
                    <div @click="toggleDropdown" ref="toggleInfor" class="cursor-pointer px-3 py-1 rounded-md text-sm text-white hover:text-yellow-300 transition">
                        {{ $store.getters['user/user'].full_name }}
                    </div>

                    <div v-if="dropdownOpen" ref="dropdownInfor" class="overflow-hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                        <nuxt-link @click.native="dropdownOpen = false" to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hồ sơ</nuxt-link>
                        <nuxt-link @click.native="dropdownOpen = false" to="/my-articles" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Danh sách bài viết</nuxt-link>
                        <nuxt-link @click.native="dropdownOpen = false" to="/buynow" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đổi quà</nuxt-link>
                        <div @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Đăng xuất</div>
                    </div>
                    </div>

                    <!-- Nếu chưa đăng nhập -->
                    <div v-else @click="loginWithGoogle"
                        class="cursor-pointer border border-white px-3 py-1 rounded-md text-sm text-white hover:text-yellow-300 hover:border-yellow-300 transition">
                    Đăng nhập
                    </div>
                </div>

                <!-- Mobile menu button -->
                <button @click="toggleMenu" ref="toggleMenu" class="md:hidden text-white focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>

        <!-- Mobile menu -->
        <div v-if="isOpen" ref="menuMobile" class="md:hidden px-4 pb-4">
            <ul class="space-y-2 text-sm font-medium">
                <li v-for="item in navItems" :key="item.path">
                    <NuxtLink  @click.native="isOpen = false" :to="item.path" class="block py-1 hover:text-hover">{{item.label}}</NuxtLink>
                </li>
              
            </ul>
        </div>
    </header>
</template>

<script>
import main from "~/mixins/main";
const DOMAIN = process.env.DOMAIN_API ?? "https://api.dailychill.vn/";
export default {
    mixins: [main],
    computed: {
        navItems() {
            return [
                { path: '/', label: 'Trang chủ' },
                { path: '/category/bai-viet', label: 'Bài viết' },
                { path: '/category/review', label: 'Review sách' },
                { path: '/category/joke', label: 'Truyện cười' },
                { path: '/category/fanfic', label: 'Fanfic' },
                { path: '/buynow', label: 'Đổi quà🎁' },
                { path: '/about', label: 'Về tôi' },
                { path: '/contact', label: 'Liên hệ' },
                // { path: '/admin_setting', label: 'Quản trị' }
            ]
        }
    },
    data() {
        return {
            isOpen: false,
            dropdownOpen: false,
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        handleClickOutside(event) {
            const dropdown = this.$refs.dropdownInfor;
            const toggle = this.$refs.toggleInfor;
            if (
                dropdown &&
                !dropdown.contains(event.target) &&
                toggle &&
                !toggle.contains(event.target)
            ) {
                this.dropdownOpen = false;
            }

            const menuMobile = this.$refs.menuMobile;
            const toggleMenu = this.$refs.toggleMenu; // Nút mở menu mobile, ví dụ hamburger button
            if (
                menuMobile &&
                !menuMobile.contains(event.target) &&
                toggleMenu &&
                !toggleMenu.contains(event.target)
            ) {
                this.isOpen = false;
            }
        },
        logout() {
            // ✅ Dùng setCookie của mixin để xóa cookie (set ngày hết hạn trong quá khứ)
            this.setCookie("token_user", "", -1);
            this.setCookie("user_infor", "", -1);

            // ✅ Optionally reset user trong Vuex nếu có
            this.$store.commit("user/setUser", null);

            // ✅ Delay nhẹ để cookie được ghi rồi mới reload
            setTimeout(() => {
                window.location.href = "/";
            }, 100); // 100ms là đủ an toàn
        },
        toggleMenu() {
            this.isOpen = !this.isOpen;
        },
        isActive(path) {
            return this.$route.path === path
        },
        loginWithFacebook() {
            // Điều hướng sang backend
            window.location.href = `${DOMAIN}auth/facebook`;
        },
        loginWithGoogle() {
            window.location.href = `${DOMAIN}auth/google`;
        },
    }
}
</script>

<style scoped>
.bg-main {
    /* @apply bg-[#FF6B81]; */
    /* Chọn màu chủ đạo theo phong cách blog */
}

.text-hover {
    @apply text-yellow-200;
}
</style>