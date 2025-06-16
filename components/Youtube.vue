<template>
    <div id="youtube">
        <div class="container mx-auto py-8 xl:py-16">
            <div class="mx-4 xl:mx-0">
                <h2 class="text-2xl font-semibold mb-4 text-main">Có thể bạn sẽ thích</h2>
                <div class="w-full">
                    <client-only>
                        <v-carousel
                            :items="1"
                            :autoplay="false"
                            :nav="false"
                            :loop="false"
                            :dots="true"
                            :margin="16"
                            :autoplay-hover-pause="true"
                            :autoplay-timeout="5000"
                            :responsive="{
                                0: { items: 1 },
                                768: { items: 2 },
                                1024: { items: 3 },
                            }"
                            >
                            <div v-for="(video,index) in videos" :key="index">
                                <div class="w-full overflow-hidden rounded-xl">
                                    <iframe class="w-full h-[200px]" :src="video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </div>
                            </div>
                        </v-carousel>
                    </client-only>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Youtube",
    data() {
        return {
            videos: [
                "https://www.youtube.com/embed/ea1PPmwOVSY?si=xB6nGfuX4wXVFR11",
                "https://www.youtube.com/embed/Q4QUPvM_qxY?si=u_YarbJl1uWhluHt",
                "https://www.youtube.com/embed/7U7__uTfXWc?si=47ERBuCZ23JDqyEI",
            ]
        };
    },

    mounted() {
    },

    methods: {},
}
</script>

<style lang="css" scoped>
    #youtube {
        background: white;
        /* background-size: cover;
        background-position: center;
        background-image: url('~assets/images/bg_section.jpg'); */
    }
</style>