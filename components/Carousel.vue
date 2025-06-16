<template>
    <div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-1 lg:gap-[10px] mb-4 lg:mb-8">
        <div class="col-span-1 md:col-span-4 lg:col-span-6">
            <div class="_banner _banner_1 h-[220px] md:h-[300px] lg:h-[500px] w-full">
            </div>
        </div>
        <div class="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-1 lg:gap-[10px]">
            <div class="_banner _banner_2 h-[100px] md:h-[148px] lg:h-[245px] w-full">
            </div>
            <div class="_banner _banner_3 h-[100px] md:h-[148px] lg:h-[245px] w-full">
            </div>
        </div>
    </div>


</template>

<script>
export default {

}
</script>
<style lang="css" scoped>
._banner{
    background-size: cover;
    background-position: center;
}
._banner_1 {
    background-image: url('~assets/images/banner1.jpeg');
}
._banner_2 {
    background-image: url('~assets/images/banner2.jpeg');
}
._banner_3 {
    background-image: url('~assets/images/banner2.jpeg');
}
</style>

