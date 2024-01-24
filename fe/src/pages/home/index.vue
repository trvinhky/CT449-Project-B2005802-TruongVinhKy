<script>
import Fish from './fish/index.vue';
import CarouselHome from './CarouselHome.vue'
import Group from '~/components/Group.vue'

export default {
    mounted() {
        document.title = 'Trang chủ'
    },
    components: {
        Fish,
        CarouselHome,
        Group
    },
    setup() {
    }
}

</script>

<template>
    <section class="home py-4">
        <CarouselHome />
        <div class="my-2">
            <Group title="Sản phẩm nổi bật" path="/products/outstanding/1" />
        </div>
        <div class="my-2">
            <Group title="Sản phẩm nổi bật" path="/products/outstanding/1" />
        </div>
        <Fish />
    </section>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
