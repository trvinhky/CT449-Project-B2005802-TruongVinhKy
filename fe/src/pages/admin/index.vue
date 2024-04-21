<script>
import { onMounted, ref } from "vue"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { docGiaAPI } from "~/services/docGiaAPI"
import { nhanVienAPI } from "~/services/nhanVienAPI"
import { sachAPI } from "~/services/sachAPI"
import { theoDoiMuonSachAPI } from "~/services/theoDoiMuonSachAPI"
import loadingState from "~/utils/loadingState"

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    setup() {
        const countUser = ref(0)
        const countAdmin = ref(0)
        const countBook = ref(0)
        const countLoan = ref(0)

        const data = {
            labels: ['Chờ duyệt', 'Đã trả', 'Đang mượn'],
            datasets: [
                {
                    backgroundColor: ['#00a8ff', '#4cd137', '#f9ca24'],
                    data: [100, 80, 50]
                }
            ]
        }
        onMounted(async () => {
            document.title = 'Trang quản trị'
            loadingState.loading = true
            try {
                countUser.value = (await docGiaAPI.getCount()).data
                countAdmin.value = (await nhanVienAPI.getCount()).data
                countBook.value = (await sachAPI.getCount()).data
                countLoan.value = (await theoDoiMuonSachAPI.getCount()).data
            } catch (err) {
                console.log(err)
            }
            loadingState.loading = false
        })
        return {
            data,
            countAdmin,
            countBook,
            countLoan,
            countUser
        }
    },
    components: {
        Pie
    }
}
</script>

<template>
    <section class="admin">
        <h2 class="admin-title">
            Xin chào, mừng bạn trở lại!
        </h2>
        <p class="admin-sub">
            Sau đây là thông tin chung về website.
        </p>
        <div class="row mt-3">
            <div class="col-4">
                <Pie :data="data" />
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-6">
                        <div class="admin-card">
                            <span class="admin-card__icon">
                                <i class="fa-solid fa-book-open-reader"></i>
                            </span>
                            <span class="admin-card__number">
                                {{ countUser }}
                            </span>
                            <span class="admin-card__text">
                                Đọc giả
                            </span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="admin-card">
                            <span class="admin-card__icon">
                                <i class="fa-solid fa-user-gear"></i>
                            </span>
                            <span class="admin-card__number">
                                {{ countAdmin }}
                            </span>
                            <span class="admin-card__text">
                                Nhân viên
                            </span>
                        </div>
                    </div>
                    <div class="col-6 mt-4">
                        <div class="admin-card">
                            <span class="admin-card__icon">
                                <i class="fa-solid fa-book-bookmark"></i>
                            </span>
                            <span class="admin-card__number">
                                {{ countLoan }}
                            </span>
                            <span class="admin-card__text">
                                Tổng phiếu mượn
                            </span>
                        </div>
                    </div>
                    <div class="col-6 mt-4">
                        <div class="admin-card">
                            <span class="admin-card__icon">
                                <i class="fa-solid fa-book"></i>
                            </span>
                            <span class="admin-card__number">
                                {{ countBook }}
                            </span>
                            <span class="admin-card__text">
                                Tổng quyển sách
                            </span>
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
