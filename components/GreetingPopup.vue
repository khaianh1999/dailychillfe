<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center animate-fadeIn">
            <h2 class="text-xl font-bold mb-2">{{ greeting.title }}</h2>
            <p class="text-gray-700">{{ greeting.message }}</p>
            <button @click="closePopup" class="mt-4 px-4 py-2 bg-main text-white rounded-full hover:bg-texthover">
                Hihi, cảm ơn 🥰
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            greeting: {
                title: '',
                message: ''
            }
        };
    },
    mounted() {
        const now = new Date();
        const hour = now.getHours();
        const todayKey = now.toISOString().split('T')[0]; // YYYY-MM-DD

        let period = '';
        if (hour >= 5 && hour < 11) period = 'morning';
        else if (hour >= 11 && hour < 14) period = 'noon';
        else if (hour >= 14 && hour < 18) period = 'afternoon';
        else period = 'evening';

        const storageKey = `dailychill_greeted_${todayKey}_${period}`;
        const greeted = localStorage.getItem(storageKey);

        if (!greeted) {
            this.setGreeting(period);
            this.show = true;
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
        closePopup() {
            this.show = false;
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