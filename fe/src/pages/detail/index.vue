<script>
import { ref, onMounted, watch } from "vue"
import { Carousel, Slide } from 'vue3-carousel'
import Card from '~/components/Card.vue'
import Title from "~/components/Title.vue"
import { useRoute } from "vue-router"
import { theoDoiMuonSachAPI } from "~/services/theoDoiMuonSachAPI"
import router from "~/router";
import { useBookStore } from "~/store/bookStore"
import { useUserStore } from "~/store/userStore"

export default {
    setup() {
        const bookStore = useBookStore()
        const userStore = useUserStore()
        const route = useRoute()
        const title = ref(null)
        const currentDate = ref(null)
        const endDate = ref(null)
        const MSB = ref(route.query.MSB)
        const data = ref(null)

        const getData = async () => {
            try {
                await bookStore.getInformation(MSB.value)
                data.value = bookStore.book
                if (data.value) {
                    title.value = data.value.TENSACH
                }
            } catch (e) {
                console.log(e)
            }
        }

        onMounted(async () => {
            await getData()
            document.title = title.value
            currentDate.value = getDate()
        })

        watch(() => route.query.MSB, async () => {
            MSB.value = route.query.MSB
            await getData()
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

        const handleSubmit = async () => {
            const start = new Date(currentDate.value)
            const end = new Date(endDate.value)
            const msg = userStore?.user?.MADOCGIA

            if (start.getTime() > end.getTime()) return

            if (!msg) {
                router.push('/login')
                return
            }

            try {
                const res = await theoDoiMuonSachAPI.create({
                    MADOCGIA: msg,
                    MASACH: MSB.value,
                    NGAYMUON: start,
                    NGAYTRA: end
                })
                alert(res.message)
            } catch (e) {
                console.log(e)
            }
        }

        return {
            title,
            data,
            currentDate,
            handleSubmit,
            endDate
        }
    },
    components: {
        Carousel,
        Slide,
        Card,
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
    <section class="detail pt-3 pb-2" v-if="data">
        <Title :title="title" :sup="data.MANXB?.TENNXB" v-if="title" />
        <div class="detail-content mt-4">
            <div class="row">
                <div class="col-5" v-if="data.hinhAnh">
                    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                        <Slide v-for="slide in data.hinhAnh" :key="slide">
                            <div class="carousel__item">
                                <img :src="`/src/assets/images/books/${slide?.TENHA}`" :alt="slide?.MAHA"
                                    class="detail-content__img">
                            </div>
                        </Slide>
                    </Carousel>

                    <Carousel id="thumbnails" :items-to-show="4" snap-align="start" v-model="currentSlide"
                        ref="carousel">
                        <Slide v-for="slide in data.hinhAnh" :key="slide">
                            <div class="carousel__item" @click="slideTo(slide - 1)" style="margin: 0 5px;">
                                <img :src="`/src/assets/images/books/${slide?.TENHA}`" :alt="slide?.MAHA"
                                    class="detail-content__img">
                            </div>
                        </Slide>
                    </Carousel>
                </div>
                <div class="col-7">
                    <h3 class="detail-content__title">
                        {{ title }}
                    </h3>
                    <div class="row">
                        <div class="col-6">
                            <p class="detail-content__more">
                                Nhà xuất bản: <span>{{ data.MANXB?.TENNXB }}</span>
                            </p>
                        </div>
                        <div class="col-6">
                            <p class="detail-content__more">
                                Tác giả: <span>{{ data.TACGIA }}</span>
                            </p>
                        </div>
                    </div>
                    <p class="detail-content__price">
                        {{ data.DONGIA.toLocaleString('vi-VN') }}₫
                    </p>
                    <p class="detail-content__box">
                        Số lượng: <span>{{ data.SOQUYEN }}</span>
                    </p>
                    <p class="detail-content__box">
                        Năm xuất bản: <span>{{ data.NAMXUATBAN }}</span>
                    </p>
                    <form class="detail-content__form" @submit.prevent="handleSubmit">
                        <span class="form-title">
                            Phiếu mượn
                        </span>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="ngaymuon">Ngày mượn: </label>
                                    <input type="date" name="ngaymuon" id="ngaymuon" v-model="currentDate" required>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="ngaytra">Ngày trả: </label>
                                    <input type="date" name="ngaytra" id="ngaytra" required v-model="endDate">
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
    </section>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>