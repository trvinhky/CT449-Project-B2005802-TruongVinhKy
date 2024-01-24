<script>
import { ref, onMounted } from "vue"
import Card from '~/components/Card.vue'
import { useRoute } from "vue-router"

export default {
    setup() {
        const route = useRoute()
        const title = ref(route.query.key)
        const address = ref('')
        const option = ref(null)

        onMounted(() => {
            document.title = title.value
        })

        return {
            title,
            address,
            option
        }
    },
    components: {
        Card
    }
}

</script>

<template>
    <section class="row">
        <nav class="col-2">
            <div class="home-nav">
                <h4 class="title" data-bs-toggle="collapse" data-bs-target="#author" aria-expanded="false"
                    aria-controls="author">
                    <span>Tác giả</span>
                    <span>10</span>
                </h4>
                <div class="collapse" id="author">
                    <ul class="list">
                        <li class="list-item">
                            <router-link to="/" class="list-item__link">
                                <i class="fa-solid fa-tag"></i>
                                <span>Truyện tranh</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <h4 class="title" data-bs-toggle="collapse" data-bs-target="#src" aria-expanded="false" aria-controls="src">
                    <span>Nhà xuất bản</span>
                    <span>10</span>
                </h4>
                <div class="collapse" id="src">
                    <ul class="list">
                        <li class="list-item">
                            <router-link to="/" class="list-item__link">
                                <i class="fa-solid fa-tag"></i>
                                <span>Truyện tranh</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="col-10">
            <div class="home">
                <div class="row home-top">
                    <div class="col-7">
                        <form action="" class="home-form" method="get">
                            <div class="home-search">
                                <input type="search" name="search" placeholder="Nhập từ khóa tìm kiếm..." />
                                <button type="submit">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                            <div class="home-form__group">
                                <div class="home-check">
                                    <input type="radio" name="search_type" id="name_book" checked>
                                    <label for="name_book">Tên sách</label>
                                </div>
                                <div class="home-check">
                                    <input type="radio" name="search_type" id="author_book">
                                    <label for="author_book">Tác giả</label>
                                </div>
                                <div class="home-check">
                                    <input type="radio" name="search_type" id="src_book">
                                    <label for="src_book">NXB</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-5">
                        <form class="filter" method="get">
                            <button type="submit" class="filter__btn">
                                Sắp xếp:
                            </button>
                            <select class="filter__select">
                                <option selected value="0">A - Z</option>
                                <option value="1">Z - A</option>
                            </select>
                        </form>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-3">
                                <Card />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
