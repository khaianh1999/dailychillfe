<template>
    <div>
        <HeaderPage />
        <Nuxt />
        <FooterPage />

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
  
    methods: {},
};
</script>
<style scoped lang="scss"></style>
