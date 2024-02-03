<script>
import { ref, onMounted, watch } from "vue"
import Products from '~/components/Products.vue'
import { useRoute } from "vue-router"
import router from "~/router"


export default {
    setup() {
        const route = useRoute()
        const title = ref('')
        const address = ref('')
        const page = ref(parseInt(route.query.page) || 1)
        const name = ref(route.query.name)

        const getData = () => {
            try {
                switch (name.value) {
                    case 'new':
                        title.value = 'Sản phẩm mới'
                        break
                    default:
                        router.push('/')
                }
            } catch (e) {
                console.log(e)
            }
        }

        onMounted(() => {
            getData()
            document.title = title.value
        })

        watch(() => route.query.page, async () => {
            page.value = parseInt(route.query.page)
        })

        return {
            title,
            address,
            page,
            name
        }
    },
    components: {
        Products
    }
}
</script>

<template>
    <Products :title="title" :address="address" :page="page" :name="name" />
</template>

<style lang="scss" scoped></style>