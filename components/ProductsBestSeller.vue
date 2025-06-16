<template>
    <div id="products_best_seller" class="bg-white">
        <div class="container mx-auto py-4 lg:py-8">
            <div class="mx-4 xl:mx-0">
                <div class="relative font-bold text-2xl flex items-center justify-center gap-2 pb-5">
                    <img class="w-40" src="@/assets/images/flashsale.webp" alt="img">
                    <span class="w-[100px] bg-hot h-[2px] rounded-sm absolute bottom-4 left-1/2 -translate-x-1/2"></span>
                </div>
                <client-only>
                    <v-carousel
                        v-if="ProductsBestSeller.length"
                        :items="1"
                        :autoplay="true"
                        :nav="false"
                        :loop="true"
                        :dots="true"
                        :margin="16"
                        :autoplay-hover-pause="true"
                        :autoplay-timeout="5000"
                        :responsive="{
                            0: { items: 2 },
                            768: { items: 3 },
                            1024: { items: 4 },
                        }"
                        >
                        <div v-for="(product,index) in ProductsBestSeller" :key="index">
                            <div class="w-full overflow-hidden rounded-xl relative group">
                            <nuxt-link to="/" class="group relative">
                                <img class="group-hover:brightness-50 group-hover:blur-sm transition rounded-xl" src="https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp15.jpg?v=1629775088790" alt="img">
                                <div class="group-hover:opacity-100 opacity-0 absolute top-6 md:top-1/3 left-1/2 -translate-x-1/2 w-4/5 text-center font-bold text-white text-base lg:text-xl">{{product?.name}}</div>
                            </nuxt-link>
                            <span class="cursor-pointer transition hidden group-hover:flex absolute top-2 right-2 w-7 h-7 rounded bg-hot items-center justify-center">
                                <font-awesome-icon icon="heart" class="text-white" />
                            </span>
                            <div class="bottom-0 absolute left-0 w-full flex items-center justify-around bg-hot">
                                <div class="w-1/2 flex justify-center cursor-pointer text-xl lg:text-2xl font-bold text-white px-1 py-2 lg:px-2 lg:py-2 gap-1">
                                    {{convertMoney(product?.price)}}
                                </div>
                                |
                                <div class="w-1/2 flex justify-center cursor-pointer text-sm px-1 py-2 lg:px-2 lg:py-2 gap-1 line-through">
                                    {{convertMoney(product?.price_old)}}
                                </div>
                            </div>
                        </div>
                        </div>
                    </v-carousel>
                </client-only>
            </div>
        </div>
    </div>
</template>

<script>
import main from "~/mixins/main";
export default {
    name: "ProductsBestSeller",
    mixins: [main],
    data() {
        return {
            ProductsBestSeller: [
                {
                    id: 1,
                    name: 'Sổ tay siêu cute siêu cute siêu cute siêu cute',
                    price: 3000,
                    price_old: 5500,
                    category:'1',
                },
                {
                    id: 1,
                    name: 'Sổ tay siêu cute siêu cute siêu cute siêu cute',
                    price: 3000,
                    price_old: 5500,
                    category:'1',
                },
                {
                    id: 1,
                    name: 'Sổ tay siêu cute siêu cute siêu cute siêu cute',
                    price: 3000,
                    price_old: 5500,
                    category:'1',
                },
                {
                    id: 1,
                    name: 'Sổ tay siêu cute siêu cute siêu cute siêu cute',
                    price: 3000,
                    price_old: 5500,
                    category:'1',
                },
                {
                    id: 1,
                    name: 'Sổ tay siêu cute siêu cute siêu cute siêu cute',
                    price: 3000,
                    price_old: 5500,
                    category:'1',
                },
                {
                    id: 1,
                    name: 'Sổ tay siêu cute siêu cute siêu cute siêu cute',
                    price: 3000,
                    price_old: 5500,
                    category:'1',
                },
                {
                    id: 1,
                    name: 'Sổ tay siêu cute siêu cute siêu cute siêu cute',
                    price: 3000,
                    price_old: 5500,
                    category:'1',
                },
                {
                    id: 1,
                    name: 'Sổ tay siêu cute siêu cute siêu cute siêu cute',
                    price: 3000,
                    price_old: 5500,
                    category:'1',
                },
            ]
        };
    },

    mounted() {
    },

    methods: {},
}
</script>

<style lang="css" scoped>

</style>