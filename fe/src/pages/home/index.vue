<script>
import Fish from './fish/index.vue';
import CarouselHome from './CarouselHome.vue'
import Group from '~/components/Group.vue'
import { onMounted, ref } from 'vue';
import { useBookStore } from '~/store/bookStore';
import loadingState from '~/utils/loadingState';

export default {
    components: {
        Fish,
        CarouselHome,
        Group
    },
    setup() {
        const bookStore = useBookStore()
        const newBooks = ref([])
        const randomBooks = ref([])

        onMounted(async () => {
            document.title = 'Trang chủ'
            await getNewBooks()
            await getRandomBooks()
        })

        const getNewBooks = async () => {
            loadingState.loading = true
            try {
                await bookStore.getAll(1)
                newBooks.value = bookStore.bookAll
            } catch (err) {
                console.log(err)
            }
            loadingState.loading = false
        }

        const getRandomBooks = async () => {
            loadingState.loading = true
            try {
                await bookStore.getRandom()
                randomBooks.value = bookStore.random
            } catch (err) {
                console.log(err)
            }
            loadingState.loading = false
        }

        return {
            newBooks,
            randomBooks
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
        <div class="my-2">
            <Group title="Sản phẩm đề xuất" path="/books?name=random" :data="randomBooks" />
        </div>
        <Fish />
    </section>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
