<template>
    <div class="container mx-auto px-4 py-8 mt-16">
        <h1 class="text-2xl font-bold mb-6 text-center">Đơn hàng của bạn</h1>

        <div v-if="orders.length === 0" class="text-center text-gray-500 mb-72 text-xl">Bạn chưa có đơn hàng nào. Hãy tích cực đăng bài hoặc chia sẻ mã giới thiệu nhé!!</div>

        <div class="space-y-4">
            <div class="flex flex-col gap-4">
                <div v-for="(order, index) in orders" :key="index"
                    class="bg-white border border-gray-200 rounded-lg shadow border-main p-5">
                    <h5 class="text-lg font-bold tracking-tight text-main mb-1">
                        {{ order.name }}
                    </h5>
                    <p class="font-normal text-texthover mb-1">
                        💰 <strong>Coin:</strong> {{ order.total_amount }}🪙
                    </p>
                    <p class="font-normal text-texthover mb-1">
                        📌 <strong>Trạng thái:</strong>
                        <span :class="order.status === 0 ? 'text-yellow-500' : 'text-green-500 font-medium'">
                            {{ order.status === 0 ? 'Đang xử lý' : 'Đã xác nhận' }}
                        </span>
                    </p>
                    <p class="text-sm text-texthover italic mb-2">
                        🕒 {{ formatDate(order.created_at) }}
                    </p>
                    <div v-if="order.status === 1"
                        class="text-main bg-blue-50 p-3 rounded-lg text-sm">
                        📦 Đơn hàng đã xác nhận! Vui lòng đợi 3 - 4 ngày để nhận hàng nhanh như gió nhé ✨
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
const DOMAIN = process.env.DOMAIN_API ?? "http://localhost:3001/";
import main from "~/mixins/main";

export default {
    name: "MyOrderList",
    layout: "Main",
    mixins: [main],
    data() {
        return {
            orders: []
        };
    },
    methods: {
        async fetchOrders() {
            try {
                const token = this.getCookie("token_user");
                const res = await fetch(`${DOMAIN}users/list_my_order`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                this.orders = data;
            } catch (err) {
                alert(err.message);
            }
        },
        formatDate(dateStr) {
            const d = new Date(dateStr);
            return d.toLocaleString("vi-VN");
        }
    },
    mounted() {
        this.fetchOrders();
    }
};
</script>