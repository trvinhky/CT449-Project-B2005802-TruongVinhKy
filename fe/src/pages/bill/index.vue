<script>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

export default {
    setup() {
        const route = useRoute()
        const MADG = ref(route.query.user)
        const MAB = ref(route.query.book)
        const Date = ref(route.query.date)

        onMounted(() => {
            document.title = 'Thông Tin Thẻ Mượn'
        })

        return {
            MADG,
            MAB,
            Date
        }
    }
}
</script>
<template>
    <section class="bill pt-4 pb-3">
        <h3 class="bill-title">Thông Tin Thẻ Mượn</h3>
        <div class="book pb-3">
            <div class="row">
                <div class="col-5">
                    <div class="book-left">
                        <h4 class="book-left__title">
                            Montblanc Explorer Platinum EDP
                        </h4>
                        <img src="../../assets/images/products/gio-profumo.jpg" class="book-left__img" />
                    </div>
                </div>
                <div class="col-7">
                    <div class="book-right pt-4">
                        <div class="row">
                            <div class="col-6">
                                <p class="bill-text">Ngày đặt: <span>Peter</span></p>
                            </div>
                            <div class="col-6">
                                <p class="bill-text">Ngày trả: <span>Peter</span></p>
                            </div>
                            <div class="col-6">
                                <p class="bill-text">Tổng giá trị: <span>2.150.000₫</span></p>
                            </div>
                            <div class="col-6">
                                <p class="bill-text">Trạng thái: <span>Peter</span></p>
                            </div>
                            <div class="col-12">
                                <p class="bill-text">Tên độc giả: <span>Peter</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped lang="scss">
@import url('./index.scss');
</style>