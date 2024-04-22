<script>
import { ref, onMounted, watch } from "vue"
import { theoDoiMuonSachAPI } from "~/services/theoDoiMuonSachAPI"
import loadingState from "~/utils/loadingState"

export default {
    props: {
        index: {
            required: false,
            type: Number,
            default: 0
        },
        userId: {
            required: true,
            type: String,
        }
    },
    setup(props) {
        const data = ref([])

        const getData = async () => {
            if (!props.userId || [0, 1, 2, 3].indexOf(props.index) === -1) return
            loadingState.loading = true

            const status = props.index === 3 ? -1 : props.index

            try {
                const res = await theoDoiMuonSachAPI.getAll(status, 1, props.userId)
                if (res.data) {
                    data.value = res.data
                }
            } catch (e) {
                console.log(e)
            }
            loadingState.loading = false
        }

        const convertDate = (time) => {
            const date = new Date(time);
            return date.toISOString().split('T')[0];
        }

        const convertState = (state) => {
            if (state === 1) return 'Đang mượn'
            else if (state === 2) return 'Đã trả'
            else if (state === -1) return 'Đã hủy'
            else return 'Chờ duyệt'
        }

        onMounted(async () => {
            await getData()
        })

        watch(() => props.index, async () => {
            await getData()
        })

        return {
            data,
            convertDate,
            convertState
        }
    }
}
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Ngày mượn</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tình trạng</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody v-if="data">
            <tr v-for="(item, i) in data" :key="item._id">
                <td>{{ i + 1 }}</td>
                <td>{{ convertDate(item.NGAYMUON) }}</td>
                <td>{{ convertDate(item.NGAYTRA) }}</td>
                <td>1</td>
                <td>{{ convertState(item.TRANGTHAI) }}</td>
                <td>
                    <router-link :to="`/bill?user=${userId}&book=${item.MASACH.MASACH}&date=${item.NGAYMUON}`"
                        class="table-btn">
                        <i class="fa-solid fa-eye"></i>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>