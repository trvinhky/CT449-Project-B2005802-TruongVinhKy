<script>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { hinhAnhAPI } from "~/services/hinhAnhAPI"
import { theoDoiMuonSachAPI } from "~/services/theoDoiMuonSachAPI"
import loadingState from "~/utils/loadingState"

export default {
    setup() {
        const route = useRoute()
        const MADG = ref(route.query.user)
        const MAB = ref(route.query.book)
        const NM = ref(route.query.date)
        const data = ref(null)
        const image = ref(null)

        const getData = async () => {
            if (!MADG.value || !MAB.value || !NM.value) return

            loadingState.loading = true
            try {

                const res = await theoDoiMuonSachAPI.getOne(MADG.value, MAB.value, NM.value)
                if (res.data) {
                    data.value = res.data
                    const MASACH = res.data?.MASACH?.MASACH

                    if (MASACH) {
                        const resHA = await hinhAnhAPI.getByBook(MASACH)
                        if (resHA.data) image.value = resHA.data[0]
                    }
                }
            } catch (e) {
                console.log(e)
            }
            loadingState.loading = false
        }

        onMounted(async () => {
            document.title = 'Thông Tin Thẻ Mượn'
            await getData()
        })

        const convertDate = (time) => time && new Date(time).toISOString().split('T')[0];

        const convertState = (state) => state === 1 ? 'Đang mượn' : state === 2 ? 'Đã trả' : 'Chờ duyệt'

        return {
            data,
            convertDate,
            convertState,
            image
        }
    }
}
</script>
<template>
    <section class="bill pt-4 pb-3" v-if="data">
        <h3 class="bill-title">Thông Tin Thẻ Mượn</h3>
        <div class="book pb-3">
            <div class="row">
                <div class="col-5">
                    <div class="book-left">
                        <h4 class="book-left__title">
                            {{ data?.MASACH?.TENSACH }}
                        </h4>
                        <img v-if="image" :src="`/src/assets/images/books/${image?.TENHA}`" class="book-left__img" />
                    </div>
                </div>
                <div class="col-7">
                    <div class="book-right pt-4">
                        <div class="row">
                            <div class="col-6">
                                <p class="bill-text">Ngày đặt: <span>{{ convertDate(data?.NGAYMUON) }}</span></p>
                            </div>
                            <div class="col-6">
                                <p class="bill-text">Ngày trả: <span>{{ convertDate(data?.NGAYTRA) }}</span></p>
                            </div>
                            <div class="col-6">
                                <p class="bill-text">Tổng giá trị: <span>{{ data?.MASACH?.DONGIA.toLocaleString('vi-VN')
                                        }}₫</span></p>
                            </div>
                            <div class="col-6">
                                <p class="bill-text">Trạng thái: <span>{{ convertState(data?.TRANGTHAI) }}</span>
                                </p>
                            </div>
                            <div class="col-12">
                                <p class="bill-text">Tên độc giả: <span>{{ `${data?.MADOCGIA?.HOLOT}
                                        ${data?.MADOCGIA?.TEN}`
                                        }}</span></p>
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