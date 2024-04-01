<script>
import { ref, onMounted, watch } from "vue"
import Products from '~/components/Products.vue'
import { useRoute } from "vue-router"
import router from "~/router"
import { nhaXuatBanAPI } from '~/services/nhaXuatBanAPI'
import { useBookStore } from "~/store/bookStore"
import loadingState from "~/utils/loadingState"

export default {
    setup() {
        const route = useRoute()
        const bookStore = useBookStore()
        const title = ref('')
        const MNXB = ref(route.query.nxb)
        const data = ref([])
        const address = ref(null)

        const getInfo = async () => {
            try {
                const info = (await nhaXuatBanAPI.getOne(MNXB.value)).data
                if (info) {
                    title.value = info?.TENNXB
                    address.value = info?.DIACHI
                }
            } catch (e) {
                console.log(e)
            }
        }

        const getData = async () => {
            loadingState.loading = true
            try {
                if (!MNXB.value) {
                    router.push('/')
                }
                await getInfo()
                await bookStore.getAllByNXB(MNXB.value, 1, 8)
                data.value = bookStore.bookBy
                document.title = title.value
            } catch (e) {
                console.log(e)
            }
            loadingState.loading = false
        }

        onMounted(async () => {
            await getData()
        })

        watch(() => route.query.nxb, async () => {
            MNXB.value = route.query.nxb
            await getData()
        })

        return {
            title,
            data,
            address
        }
    },
    components: {
        Products
    }
}
</script>

<template>
    <Products :title="title" :data="data" v-if="data" :address="address" />
</template>
