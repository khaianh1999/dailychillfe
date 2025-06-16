<template>
    <div class="container mx-auto px-4 py-8 mt-8 lg:mt-16">
        <h1 class="text-2xl font-bold mb-2 lg:mb-6 text-center">Danh sách sản phẩm</h1>
        <p class="font-semibold text-gray-500 text-xl text-center mb-6">Hãy tích cực chia sẻ mã giới thiệu để nhận được 🎁 nhé !!</p>
        <div class="text-right mb-6" v-if="IsLogin">
            <router-link to="/list-my-order">
                <button class="bg-main text-white py-2 px-4 rounded-lg shadow transition">
                Đơn hàng của tôi
                </button>
            </router-link>
        </div>
        <!-- Grid sản phẩm -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div v-for="product in products" :key="product.id"
                @click="openBuyPopup(product)"
                class="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border">

                <img :src="DOMAIN+product?.image_urls[0]" alt="product image" class="w-full h-48 object-cover" />
                <div class="p-4">
                    <h3 class="font-semibold text-xl">{{ product?.name }}</h3>
                    <p class="text-gray-500 text-lg">{{ product?.description }}</p>
                    <div class="mt-2 flex items-center space-x-2">
                        <span class="text-main font-bold text-lg">{{ convertMoney(product?.price) }}🪙</span>
                        <span v-if="product?.price_old" class="line-through text-base text-gray-400">
                            {{ convertMoney(product?.price_old) }}🪙
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Popup đặt hàng -->
        <div v-if="showPopup"
            class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
            <div class="bg-white w-full max-w-md rounded-xl p-6 relative shadow-lg">
                <button @click="showPopup = false"
                    class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">&times;</button>

                <h3 class="text-xl font-bold mb-4 text-center">Đặt mua: {{ selectedProduct.name }}</h3>
                <form @submit.prevent="submitBuy" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                        <input v-model="form.name" type="text" required class="form-input w-full focus:ring-main" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="form.email" type="email" required class="form-input w-full focus:ring-main" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">SĐT</label>
                        <input v-model="form.phone" type="tel" required class="form-input w-full focus:ring-main" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ (Hãy ghi rõ xã/huyện/tỉnh)</label>
                        <textarea v-model="form.address" required rows="2"
                            class="form-textarea w-full resize-none focus:ring-main indent-2"></textarea>
                    </div>

                    <button type="submit"
                        class="w-full bg-main text-white font-semibold py-2 px-4 rounded-lg hover:bg-textmain transition">
                        Xác nhận đặt hàng
                    </button>
                </form>
            </div>
        </div>

         <!-- Popup yêu cầu đăng nhập-->
         <div v-if="showPopupConfirmLogin"
            class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
            <div class="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-lg">
                <button @click="showPopupConfirmLogin = false"
                    class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">&times;</button>

                <h3 class="font-bold mb-4 text-center text-main text-2xl">Hãy đăng nhập để đổi quà</h3>
                <div class="font-semibold text-xl">Cách kiếm coin để đổi quà :</div>
                <ul>
                    <li class="py-2">Cách 1: Giới thiệu bạn bè và nhập mã giới thiệu của mình nhé!</li>
                    <li class="py-2">Cách 2: Hãy đăng bài viết hay nhé!</li>
                </ul>
            </div>
        </div>

        <div class=" mx-auto mt-8">
            <h2 class="text-2xl font-semibold mb-4 text-main">💬 Bình luận dễ thương</h2>

            <div v-for="(comment, index) in comments" :key="index" class="mb-4 bg-white rounded-2xl p-4 shadow-md flex space-x-4">
            <img :src="comment.avatar" alt="avatar" class="w-12 h-12 rounded-full object-cover">
            <div>
                <div class="flex items-center space-x-2">
                <h4 class="font-semibold text-gray-800">{{ comment.name }}</h4>
                <span class="text-sm text-gray-400">• {{ comment.time }}</span>
                </div>
                <p class="text-gray-600 mt-1">{{ comment.message }}</p>
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
    name: "BuyNowPage",
    layout: "Main",
    mixins: [main],
    components: {
        Youtube,
    },
    data() {
        return {
            DOMAIN: DOMAIN,
            products: [],
            showPopup: false,
            selectedProduct: null,
            form: {
                name: "",
                email: "",
                phone: "",
                address: ""
            },
            showPopupConfirmLogin: false,
            IsLogin: false,
            comments: [
                {
                    name: "Mai Mai",
                    time: "2 phút trước",
                    avatar: "https://i.pravatar.cc/150?img=28",
                    message: "Mình đã nhận được hàng, quá cuteeeee 🥹💖",
                },
                {
                    name: "Tú Anh",
                    time: "10 phút trước",
                    avatar: "https://i.pravatar.cc/150?img=32",
                    message: "Mình đổi thử quà mà ngờ cũng nhận được hàng nhé mọi người ơiiiii 😍🎁",
                },
                {
                    name: "Khánh Vy",
                    time: "30 phút trước",
                    avatar: "https://i.pravatar.cc/150?img=39",
                    message: "Đã nhận được quà, quá ưng nhaa",
                },
                {
                    name: "Hồng Nhung",
                    time: "1 giờ trước",
                    avatar: "https://i.pravatar.cc/150?img=24",
                    message: "Shop gói hàng siêu cẩn thận, dán sticker xinh xỉu 🥰📦",
                },
                {
                    name: "Thanh Thảo",
                    time: "2 giờ trước",
                    avatar: "https://i.pravatar.cc/150?img=45",
                    message: "Giao hàng siêu nhanh luôn, mới hôm qua mà nay đã tới! 💨📮",
                },
                {
                    name: "Thanh Mai",
                    time: "4 giờ trước",
                    avatar: "https://i.pravatar.cc/150?img=49",
                    message: "Mỗi ngày đăng một bài viết là nhanh nhận quà lắm mn ơi",
                },
                {
                    name: "Bé Na",
                    time: "8 giờ trước",
                    avatar: "https://i.pravatar.cc/150?img=19",
                    message: "Quà bí mật mở ra mà hú hồn vì dễ thương quá chòi đất 😭🌈",
                },
            ],
        };
    },
    methods: {
        async fetchProducts() {
            const res = await fetch(`${DOMAIN}products`);
            this.products = await res.json();
        },
        openBuyPopup(product) {
            // Chưa đăng nhập thì hiện popup đăng nhập để đổi quà
            if (!this.getCookie("token_user")) {
                this.showPopupConfirmLogin = true;
                return;
            }
            

            this.selectedProduct = product;
            this.showPopup = true;
            this.form = {
                name: "",
                email: "",
                phone: "",
                address: ""
            };
        },
        async submitBuy() {
            try {
                const token = this.getCookie("token_user");
                const res = await fetch(`${DOMAIN}users/buynow`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        email: this.form.email,
                        address: this.form.address,
                        phone_number: this.form.phone,
                        product_id: this.selectedProduct.id
                    })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                alert("Mua hàng thành công!");
                this.showPopup = false;
            } catch (err) {
                alert(err.message);
            }
        },
        convertMoney(value) {
            return new Intl.NumberFormat('vi-VN').format(value);
        }
    },
    mounted() {
        this.fetchProducts();

        this.IsLogin = !!this.getCookie("token_user");
    }
};
</script>
