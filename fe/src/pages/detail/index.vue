<script>
import { ref, onMounted } from "vue"
import { Carousel, Slide } from 'vue3-carousel'
import Card from '~/components/Card.vue'
import Group from "~/components/Group.vue"
import Title from "~/components/Title.vue"
import { useRoute } from "vue-router"

export default {
    setup() {
        const route = useRoute()
        const title = ref(null)
        const currentDate = ref(null)
        const MSB = ref(route.query.MSB)

        onMounted(() => {
            title.value = 'Thám Tử Lừng Danh Conan - Tập 102'

            document.title = title.value

            currentDate.value = getDate()
        })

        const getDate = () => {
            const today = new Date();
            const year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;

            return `${year}-${month}-${day}`;
        }

        return {
            title,
            currentDate
        }
    },
    components: {
        Carousel,
        Slide,
        Card,
        Group,
        Title
    },
    data: () => ({
        currentSlide: 0,
    }),
    methods: {
        slideTo(val) {
            this.currentSlide = val
        },
    },
}
</script>

<template>
    <section class="detail pt-3 pb-2">
        <Title :title="title" sup="Tân Việt" />
        <div class="detail-content mt-4">
            <div class="row">
                <div class="col-5">
                    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                        <Slide v-for="slide in 10" :key="slide">
                            <div class="carousel__item">
                                <img src="../../assets/images/products/gio-profumo.jpg" alt="" class="detail-content__img">
                            </div>
                        </Slide>
                    </Carousel>

                    <Carousel id="thumbnails" :items-to-show="4" snap-align="center" v-model="currentSlide" ref="carousel">
                        <Slide v-for="slide in 10" :key="slide">
                            <div class="carousel__item" @click="slideTo(slide - 1)" style="margin: 0 5px;">
                                <img src="../../assets/images/products/gio-profumo.jpg" alt="" class="detail-content__img">
                            </div>
                        </Slide>
                    </Carousel>
                </div>
                <div class="col-7">
                    <h3 class="detail-content__title">
                        Thám Tử Lừng Danh Conan - Tập 102
                    </h3>
                    <div class="row">
                        <div class="col-6">
                            <p class="detail-content__more">
                                Nhà xuất bản: <span>Kim Đồng</span>
                            </p>
                        </div>
                        <div class="col-6">
                            <p class="detail-content__more">
                                Tác giả: <span>Gosho Aoyama</span>
                            </p>
                        </div>
                    </div>
                    <p class="detail-content__price">
                        1.850.000₫
                    </p>
                    <p class="detail-content__box">
                        Số lượng: <span>100</span>
                    </p>
                    <p class="detail-content__box">
                        Năm xuất bản: <span>2023</span>
                    </p>
                    <form class="detail-content__form">
                        <span class="form-title">
                            Phiếu mượn
                        </span>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="ngaymuon">Ngày mượn: </label>
                                    <input type="date" name="ngaymuon" id="ngaymuon" :value="currentDate" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="ngaytra">Ngày trả: </label>
                                    <input type="date" name="ngaytra" id="ngaytra" required>
                                </div>
                            </div>
                        </div>
                        <div class="row pt-3">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="soluong">Số lượng: </label>
                                    <input type="number" name="soluong" id="soluong" min="1" value="1" readonly>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="flex-end">
                                    <button type="submit" class="form-btn">Mượn sách</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ul class="detail-content__commit">
                        <li>Lưu ý khi mượn - trả sách</li>
                        <li>- Kiểm tra sách kỹ càng khi mượn. </li>
                        <li>- Thời gian mượn sách tối đa là 1 đến 2 tuần.</li>
                        <li>- Đảm bảo tình trạng sách khi trả như lúc mượn. </li>
                        <li>- Đảm bảo trả sách theo đúng thời gian quy định.</li>
                        <li>- Khi làm mất hoặc hư hao gì thì người mượn phải chịu trách nhiệm hoàn toàn.</li>
                    </ul>
                </div>
            </div>
        </div>
        <Group title="Sản phẩm liên quan" path="/products/related/1" />
    </section>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>