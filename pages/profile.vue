<template>
    <div>
        <section class="max-w-3xl mx-auto px-4 py-12 mt-10 lg:mt-16">
            <div
                class="bg-white rounded-2xl shadow-md p-8 flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-10">

                <!-- Avatar -->
                <div class="flex-shrink-0">
                    <img :src="getAvatarUser(user?.avatar)" alt="Avatar"
                        class="w-32 h-32 rounded-full border-4 border-indigo-300 shadow-md object-cover" />
                </div>

                <!-- Thông tin người dùng -->
                <div class="flex-1">
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ user?.full_name ?? "" }}</h2>
                    <p class="text-gray-600 mb-1">📧 {{ user?.email ?? "example@gmail.com" }}</p>
                    <p class="text-gray-600 mb-1">🔐 Mã giới thiệu: <span class="font-semibold text-indigo-600">{{
                        user?.code ?? "" }}</span></p>
                    <p class="text-gray-600 mb-1">🪙 Số coin: <span class="font-semibold text-yellow-500">{{ user?.coin
                        ?? 0
                            }}</span>
                        <i>*Nếu bài viết được duyệt hoặc đã có người dùng mã giới thiệu => hãy đăng nhập lại để cập nhật số coin!</i>  
                        </p>

                    <div class="mt-6" v-if="!user.refer_code">
                        <button @click="showPopup = true"
                            class="bg-main hover:bg-textmain text-white font-medium py-2 px-4 rounded-xl shadow transition">
                            Nhập mã giới thiệu
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <p v-if="!user">Đang xác thực...</p>

        <!-- Popup nhập mã -->
        <div v-if="showPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full space-y-4">
                <h2 class="text-lg font-bold">Nhập mã giới thiệu</h2>
                <input v-model="referralCode" type="text" placeholder="Nhập mã giới thiệu"
                    class="w-full px-4 py-2 border rounded focus:outline-none" />
                <div class="flex justify-end space-x-2">
                    <button @click="showPopup = false" class="px-4 py-2 bg-gray-300 rounded">Hủy</button>
                    <button @click="submitReferralCode" class="px-4 py-2 bg-main text-white rounded">Xác nhận</button>
                </div>
            </div>
        </div>
        <Youtube/>
    </div>
</template>
<script>
const DOMAIN = process.env.DOMAIN_API ?? "https://api.dailychill.vn/";
import Youtube from "../components/Youtube.vue";
import main from "~/mixins/main";
export default {
    name: "ProfilePage",
    layout: "Main",
    mixins: [main],
    components: {
        Youtube,
    },
    data() {
        return {
            user: {
                full_name: "",
                email: "",
                code: "",
                coin: 0,
                avatar: "uploads/avatar.jpg" // Fake avatar
            },
            showPopup: false,
            referralCode: "",
        }
    },
    head() {
        return {
            title: "Hồ sơ cá nhân - Blog Chữa Lành - DailyChill",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Trang hồ sơ của bạn trên DailyChill - Blog Chữa Lành & Truyện Cười."
                }
            ]
        };
    },
    async mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            this.setCookie("token_user", token, 30);
        }
        // ✅ Xóa token khỏi URL sau khi lưu
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        try {
            const res = await fetch(`${DOMAIN}users/profile`, {
                headers: {
                    Authorization: `Bearer ${this.getCookie("token_user")}`
                }
            });
            const data = await res.json();
            this.user = data;
            this.setCookie("user_infor", data, 30);
            // Lưu vào store (giả sử có namespace 'user' và mutation 'setUser')
            this.$store.commit("user/setUser", data);

            if (token) { // nếu là mới đăng nhập thì reload lại
                console.log("chui vào đây");
                window.location.reload();
            }

        } catch (err) {
            console.error("Không thể xác thực:", err);
        }
    },
    methods: {
        async submitReferralCode() {
            try {
                const token = this.getCookie("token_user");

                const res = await fetch(`${DOMAIN}users/addCode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ refer_code: this.referralCode })
                });

                const result = await res.json();

                if (!res.ok) throw new Error(result.message || "Lỗi hệ thống");

                alert("Thêm mã thành công!");

                // ✅ Tạo bản sao user và cập nhật refer_code
                const updatedUser = { ...this.user, refer_code: this.referralCode };

                // ✅ Cập nhật store và cookie
                this.$store.commit("user/setUser", updatedUser);
                this.setCookie("user_infor", JSON.stringify(updatedUser), 30);
                // Tắt nút + popup
                this.showPopup = false;
                this.user.refer_code = this.referralCode
              
            } catch (err) {
                alert(err.message);
            }
        }
    },
}
</script>