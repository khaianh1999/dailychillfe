<template>
    <div id="products_new">
        <div class="container mx-auto py-4 lg:py-8">
            <div class="mx-4 xl:mx-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <div class="col-span-2 md:col-span-3 lg:col-span-4 font-bold text-2xl">
                    Sản phẩm mới <span class="text-main animate-ping">new</span>
                </div>
                <div class="col-span-1" v-for="(product,index) in productsNew" :key="index">
                    <div class="w-full overflow-hidden relative group rounded-xl">
                        <nuxt-link to="/" class="group">
                            <img class="group-hover:scale-110 transition rounded-xl" src="https://bizweb.dktcdn.net/thumb/large/100/434/558/products/sp15.jpg?v=1629775088790" alt="img">
                        </nuxt-link>
                        <span class="cursor-pointer transition hidden group-hover:flex absolute top-2 right-2 w-7 h-7 rounded bg-main items-center justify-center">
                            <font-awesome-icon icon="heart" class="text-white" />
                        </span>
                        <div class="transition group-hover:bottom-0 absolute -bottom-full left-0 w-full flex items-center justify-around bg-main">
                            <div class="w-1/2 flex justify-center cursor-pointer text-sm text-white transition hover:scale-105 px-1 py-2 md:px-2 md:py-4 items-center gap-1">
                                <font-awesome-icon icon="bag-shopping" class="text-white" transition/> <span class="hidden md:inline-block">Thêm vào giỏ</span>
                            </div>
                            |
                            <div class="w-1/2 flex justify-center cursor-pointer text-sm text-white transition hover:scale-105 px-1 py-2 md:px-2 md:py-4 items-center gap-1">
                                <font-awesome-icon icon="money-bill" class="text-white" transition/> <span class="hidden md:inline-block">Thanh toán</span>
                            </div>
                        </div>
                    </div>
                    <a class="hover:text-hover text-sm lg:text-base transition min-h-[44px]">{{product?.name}}</a>
                    <div class="flex items-end gap-2">
                        <span class="text-xl lg:text-2xl font-bold">{{convertMoney(product?.price)}}</span>
                        <span class="line-through">{{convertMoney(product?.price_old)}}</span>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import main from "~/mixins/main";
export default {
    name: "ProductsNew",
    mixins: [main],
    data() {
        return {
            productsNew: [
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
                }

            ]
        };
    },

    mounted() {
    },

    methods: {},
}
</script>

<style lang="css" scoped>
    #products_new {
        background-size: cover;
        background-position: center;
        background-image: url('~assets/images/bg_section.webp');
    }
</style>