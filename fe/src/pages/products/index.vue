<script>
import { ref, onMounted, watch } from "vue"
import Products from '~/components/Products.vue'
import { useRoute } from "vue-router"
import router from "~/router"
import { sachAPI } from "~/services/sachAPI"
import { useBookStore } from "~/store/bookStore"

export default {
    setup() {
        const route = useRoute()
        const bookStore = useBookStore()
        const title = ref('')
        const page = ref(parseInt(route.query.page) || 1)
        const name = ref(route.query.name)
        const data = ref([])
        const count = ref(0)

        const getData = async () => {
            try {
                switch (name.value) {
                    case 'new':
                        title.value = 'Sản phẩm mới'
                        await bookStore.getAll(page.value, 8)
                        data.value = bookStore.bookAll
                        count.value = (await sachAPI.getCount()).data
                        count.value = Math.ceil(count.value / 8)
                        break
                    case 'random':
                        title.value = 'Sản phẩm đề xuất'
                        await bookStore.getRandom()
                        data.value = bookStore.random
                        break
                    default:
                        router.push('/')
                }
                document.title = title.value
            } catch (e) {
                console.log(e)
            }
        }

        onMounted(async () => {
            await getData()
        })

        watch(() => route.query.page, () => {
            page.value = parseInt(route.query.page)
        })

        watch(() => route.query.name, async () => {
            name.value = route.query.name
            await getData()
        })

        return {
            title,
            page,
            name,
            count,
            data
        }
    },
    components: {
        Products
    }
}
</script>

<template>
    <Products :title="title" :name="name" :data="data" v-if="data" />
    <div class="center mb-2" v-if="count">
        <ul class="products-list">
            <li v-for="i in count" :class="{ 'active': page === i }">
                <router-link :to="`/books?name=${name}&page=${i}`">
                    {{ i }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>