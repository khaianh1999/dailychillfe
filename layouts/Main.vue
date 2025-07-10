<template>
    <div>
        <HeaderPage />
        <Nuxt />
        <FooterPage />
        <template>
        <button
            @click="goToShop"
            class="fixed bottom-6 right-6 z-50 bg-main text-white font-bold py-3 px-6 rounded-full shadow-lg animate-shake hover:bg-main transition-all"
        >
            🎁 Đổi quà
        </button>
        </template>
    </div>
</template>

<script>
import HeaderPage from "./Header";
import FooterPage from "./Footer";
import main from "~/mixins/main";

export default {
    name: "Main",
    components: {
        HeaderPage,
        FooterPage,
    },
    mixins: [main],
    data() {
        return {
        };
    },
    computed: {
    },
    created() {
    },
    mounted() {
        initFlowbite();
    },
  
    methods: {
        goToShop() {
            this.$router.push("/buynow");
        }
    },
};
</script>
<style scoped lang="css">
@keyframes shake {
  0% { transform: translate(0px, 0px) rotate(0deg); }
  10% { transform: translate(-1px, 1px) rotate(-1deg); }
  20% { transform: translate(-2px, -1px) rotate(1deg); }
  30% { transform: translate(1px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-2px, 1px) rotate(0deg); }
  70% { transform: translate(2px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(2px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.animate-shake {
  animation: shake 1s infinite;
}
</style>
