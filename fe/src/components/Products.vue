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
        <p class="products-address">
            <span>Địa chỉ: </span> {{ address }}
        </p>
        <div class="row">
            <div class="col-3 my-3">
                <Card />
            </div>
        </div>
        <div class="center mb-2">
            <ul class="products-list">
                <li class="products-list__item active">
                    1
                </li>
                <li class="products-list__item">
                    2
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/products.scss');
</style>