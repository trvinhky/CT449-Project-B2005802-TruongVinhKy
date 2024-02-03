<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <div class="card" style="width: 100%;" v-if="data">
        <img :src="`/src/assets/images/books/${data?.hinhAnh[0]?.TENHA}`" class="card-img-top" :alt="data.TENSACH">
        <div class="card-body">
            <h5 class="card-title">
                <router-link :to="`/detail?MSB=${data.MASACH}`" class="card-link">
                    {{ data.TENSACH }}
                </router-link>
            </h5>
            <p class="card-text">
                <span>Số quyển: </span>{{ data.SOQUYEN }}
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/card.scss');
</style>
