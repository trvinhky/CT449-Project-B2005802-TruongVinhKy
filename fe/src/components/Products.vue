<script>
import { ref, onMounted, watch } from "vue"
import Card from './Card.vue'
import Title from './Title.vue'
import { useStore } from "vuex"
import { computed } from "@vue/reactivity";
import { sachAPI } from "~/services/sachAPI";

export default {
    components: {
        Card,
        Title
    },
    props: {
        title: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false
        },
        page: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const store = useStore()
        const count = ref(0)
        const data = ref([])

        const getData = async () => {
            try {
                switch (props.title) {
                    case 'Sản phẩm mới':
                        await store.dispatch('sach/getAll', { page: props.page, limit: 8 })
                        const res = computed(() => store.state.sach.tatCaSach)
                        data.value = await res.value
                        count.value = (await sachAPI.getCount()).data
                        count.value = Math.ceil(count.value / 8)
                    default:
                        break
                }
            } catch (e) {
                console.log(e)
            }
        }

        onMounted(async () => {
            await getData()
        })

        watch(() => props.page, async () => {
            await getData()
        })

        watch(() => props.title, async () => {
            await getData()
        })

        return {
            count,
            data
        }
    }
}
</script>

<template>
    <section class="products">
        <div class="row pt-3">
            <div class="col-6">
                <Title :title="title" />
            </div>
            <div class="col-6">
                <div class="left">
                    <div class="products-form">
                        <button class="products-form__btn">
                            Sắp xếp:
                        </button>
                        <select class="products-form__select">
                            <option selected value="0">A - Z</option>
                            <option value="1">Z - A</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <p class="products-address" v-if="address">
            <span>Địa chỉ: </span> {{ address }}
        </p>
        <div class="row" v-if="data">
            <div class="col-3 my-3" v-for="item in data" :key="item._id">
                <Card :data="item" />
            </div>
        </div>
        <div class="center mb-2" v-if="count">
            <ul class="products-list">
                <li v-for="i in count" :class="{ 'active': page === i }">
                    <router-link :to="`/books?name=${name}&page=${i}`">
                        {{ i }}
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/products.scss');
</style>