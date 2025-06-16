<template>
    <div>
        <HeaderPage />
        <div
            class="bg-white py-8 sm:py-[110px] flex flex-col items-center justify-center gap-[24px]"
        >
            <p class="max-w-[387px] text-center text-[#2A2C3C] font-medium">
                Xin lỗi, trang bạn kìm kiếm không tồn tại. Về trang chủ để tiếp
                tục khám phá bạn nhé!
            </p>
            <a
                class="text-white bg-main h-[48px] leading-[48px] text-center rounded-[4px] w-4/5 sm:w-[343px] font-medium cursor-pointer"
                href="/"
                >Về trang chủ ngay</a
            >
        </div>
        <FooterPage />
    </div>
</template>

<script>
import HeaderPage from "./Header";
import FooterPage from "./Footer";

export default {
    name: "Error",
    components: {
        HeaderPage,
        FooterPage,
    },
};
</script>
<style scoped lang="scss"></style>
