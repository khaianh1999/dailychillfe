<template>
    <div>
        <!-- Popup Chào hỏi -->
        <div v-if="showGreeting" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center animate-fadeIn">
                <h2 class="text-xl font-bold text-main mb-2">{{ greeting.title }}</h2>
                <p class="text-gray-700">{{ greeting.message }}</p>
                <button @click="closeGreeting"
                    class="mt-4 px-5 py-2 rounded-full bg-main text-white hover:brightness-110 transition">
                    Hihi, cảm ơn 🥰
                </button>
            </div>
        </div>

        <!-- Popup Nhận 1 coin -->
        <div v-if="showCoinPopup" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full text-center animate-fadeIn">
                <h2 class="text-2xl font-bold text-main mb-2">🎉 Chúc mừng bạn nhận được 1🪙</h2>
                <p class="text-gray-700 mb-2 text-base">
                    Hãy kiếm thật nhiều 🪙 để đổi quà nhé 🎁<br />
                    <div class="text-left w-4/5 mx-auto">
                        👉 Cách 1: Mời bạn bè nhập mã giới thiệu của bạn
                    </div>
                    <div class="text-left w-4/5 mx-auto">👉 Cách 2: Đăng những bài viết thật hay!</div>
                    
                </p>
                <div class="flex justify-center gap-4 mt-4">
                    <button @click="goLogin"
                        class="px-5 py-2 rounded-full bg-main text-white font-semibold hover:bg-main transition">
                        Nhận coin
                    </button>
                    <button @click="closeCoinPopup"
                        class="px-5 py-2 rounded-full text-white bg-texthover transition">
                        Đã hiểu
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const DOMAIN = process.env.DOMAIN_API ?? "https://api.dailychill.vn";
import main from "~/mixins/main";
export default {
    mixins: [main],
    data() {
        return {
            showGreeting: false,
            showCoinPopup: false,
            greeting: {
                title: '',
                message: ''
            }
        };
    },
    mounted() {
        const now = new Date();
        const hour = now.getHours();
        const todayKey = now.toISOString().split('T')[0];

        let period = '';
        if (hour >= 5 && hour < 11) period = 'morning';
        else if (hour >= 11 && hour < 14) period = 'noon';
        else if (hour >= 14 && hour < 18) period = 'afternoon';
        else period = 'evening';

        const storageKey = `dailychill_greeted_${todayKey}_${period}`;
        const greeted = localStorage.getItem(storageKey);

        if (!greeted) {
            this.setGreeting(period);
            this.showGreeting = true;
            localStorage.setItem(storageKey, 'true');
        }
    },
    methods: {
        setGreeting(period) {
            const greetings = {
                morning: {
                    title: '☀️ Chào buổi sáng!',
                    message: 'Chúc bạn một ngày tràn đầy năng lượng và niềm vui nha! 💖'
                },
                noon: {
                    title: '🍱 Hello buổi trưa!',
                    message: 'Nghỉ ngơi xíu, ăn gì ngon và tiếp tục chill nhé bạn iu! 😋'
                },
                afternoon: {
                    title: '🌤️ Buổi chiều an yên!',
                    message: 'Uống tí trà chiều, thả lỏng rồi đọc vài bài viết nhẹ nhàng nha~ 🍵📖'
                },
                evening: {
                    title: '🌙 Tối an lành!',
                    message: 'Cùng thư giãn với Daily Chill và sạc lại năng lượng sau một ngày dài nhé~ 🛏️✨'
                }
            };
            this.greeting = greetings[period] || {};
        },
        closeGreeting() {
            this.showGreeting = false;
            const token = this.getCookie('token_user');
            if (!token) {
                const coinPopupSeen = localStorage.getItem('dailychill_seen_coin_popup');
                if (!coinPopupSeen) {
                    this.showCoinPopup = true;
                }
            }
        },
        goLogin() {
            window.location.href = `${DOMAIN || 'https://api.dailychill.vn'}/auth/google`;
        },
        closeCoinPopup() {
            this.showCoinPopup = false;
            localStorage.setItem('dailychill_seen_coin_popup', 'true');
        }
    }
};
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
}
</style>