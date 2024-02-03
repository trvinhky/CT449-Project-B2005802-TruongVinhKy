<script>
import Fish from './fish/index.vue';
import CarouselHome from './CarouselHome.vue'
import Group from '~/components/Group.vue'
import { onMounted, ref } from 'vue';
import { useStore } from "vuex"
import { computed } from "@vue/reactivity";

export default {
    components: {
        Fish,
        CarouselHome,
        Group
    },
    setup() {
        const store = useStore()
        const newBooks = ref()

        onMounted(async () => {
            document.title = 'Trang chủ'
            await getNewBooks()
        })

        const getNewBooks = async () => {
            try {
                await store.dispatch('sach/getAll', { page: 1 })
                const res = computed(() => store.state.sach.tatCaSach)
                newBooks.value = await res.value
            } catch (err) {
                console.log(err)
            }
        }

        return {
            newBooks
        }
    }
}

</script>

<template>
    <section class="home py-4">
        <CarouselHome />
        <div class="my-2" v-if="newBooks">
            <Group title="Sản phẩm mới" path="/books?name=new&page=1" :data="newBooks" />
        </div>
        <!-- <div class="my-2">
            <Group title="Sản phẩm nổi bật" path="/products/outstanding/1" />
        </div> -->
        <Fish />
    </section>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
