<script>
import Card from './Card.vue'
import Title from './Title.vue'

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
        data: {
            type: Array,
            required: true
        }
    },
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
    </section>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/products.scss');
</style>