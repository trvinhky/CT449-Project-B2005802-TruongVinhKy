<script>
import { ref, onMounted } from "vue"
import Products from '~/components/Products.vue'
import { useRoute } from "vue-router"

export default {
    setup() {
        const route = useRoute()
        const title = ref(route.query.name)
        const address = ref('')
        const page = ref(route.query.page)

        onMounted(() => {
            address.value = 'HCM'
            document.title = title.value
        })

        return {
            title,
            address,
            page
        }
    },
    components: {
        Products
    }
}
</script>

<template>
    <Products :title="title" :address="address" />
</template>

<style lang="scss" scoped></style>