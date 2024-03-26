<script>
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import Title from '~/components/Title.vue'
import { theoDoiMuonSachAPI } from "~/services/theoDoiMuonSachAPI"

export default {
    setup() {
        const route = useRoute()
        const isCheck = ref(false)
        const title = ref('Danh sách phiếu mượn')
        const status = ref(0)
        const data = ref([])

        const checkPath = (name) => route.query.action === name

        const changeValue = (check, text = '') => {
            title.value = "Danh sách phiếu mượn" + text
            isCheck.value = check
        }

        const getData = async () => {
            try {
                const res = await theoDoiMuonSachAPI.getAll(status.value, 1)
                if (res.data) {
                    data.value = res.data
                }
            } catch (e) {
                console.log(e)
            }
        }

        const updateTitle = () => {
            if (checkPath('pending')) {
                changeValue(true, ' đang mượn')
                status.value = 1
            } else if (checkPath('histories')) {
                changeValue(false, ' đã trả')
                status.value = 2
            } else {
                status.value = 0
                changeValue(true)
            }
            document.title = title.value
        }

        // Update title initially
        onMounted(async () => {
            updateTitle()
            await getData()
        })

        // Watch for route changes and update title accordingly
        watch(() => route.query.action, async () => {
            updateTitle()
            await getData()
        })

        const convertDate = (time) => {
            const date = new Date(time);
            return date.toISOString().split('T')[0];
        }

        const convertState = (state) => state === 1 ? 'Đang mượn' : state === 2 ? 'Đã trả' : 'Chờ duyệt'

        const handleCheck = async (MADOCGIA, MASACH, NGAYMUON) => {
            try {
                if (MADOCGIA || MASACH || NGAYMUON) {
                    let message
                    if (status.value === 0) {
                        const res = await theoDoiMuonSachAPI.update(MADOCGIA, MASACH, NGAYMUON, 1)
                        message = res.message
                    }

                    if (status.value === 1) {
                        const res = await theoDoiMuonSachAPI.update(MADOCGIA, MASACH, NGAYMUON, 2)
                        message = res.message
                    }

                    alert(message)
                    await getData()
                }
            } catch (e) {
                console.log(e)
            }
        }

        return {
            title,
            isCheck,
            data,
            convertDate,
            convertState,
            handleCheck
        }
    },
    components: {
        Title
    }
}
</script>
<template>
    <section class="admin">
        <Title :title="title" root="Admin" />
        <div class="admin-info">
            <p class="admin-info__number">
                <span>Số phiếu mượn:</span> 1
            </p>
            <p class="admin-info__number">
                <span>Tổng giá trị:</span> 1.850.000₫
            </p>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên độc giả</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Ngày mượn</th>
                    <th scope="col">Ngày trả</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody v-if="data">
                <tr v-for="(item, i) in data" :key="item._id">
                    <td>{{ i + 1 }}</td>
                    <td>
                        {{ `${item?.MADOCGIA?.HOLOT}
                        ${item?.MADOCGIA?.TEN}`
                        }}
                    </td>
                    <td>{{ item?.MADOCGIA?.DIACHI }}</td>
                    <td>{{ convertDate(item.NGAYMUON) }}</td>
                    <td>{{ convertDate(item.NGAYTRA) }}</td>
                    <td>{{ convertState(item.TRANGTHAI) }}</td>
                    <td>
                        <router-link
                            :to="`/bill?user=${item?.MADOCGIA?._id}&book=${item.MASACH.MASACH}&date=${item.NGAYMUON}`"
                            class="table-btn">
                            <i class="fa-solid fa-eye"></i>
                        </router-link>
                        <button class="table-btn table-btn--add" v-if="isCheck"
                            @click="() => handleCheck(item?.MADOCGIA?._id, item.MASACH.MASACH, item.NGAYMUON)">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
<style lang="scss" scoped>
@import url('./index.scss');
</style>
