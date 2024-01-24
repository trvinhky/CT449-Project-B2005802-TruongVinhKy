<script>
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import Title from '~/components/Title.vue'

export default {
    setup() {
        const route = useRoute()
        const isCheck = ref(false)
        const title = ref('Danh sách phiếu mượn')

        const checkPath = (name) => route.query.action === name

        const changeValue = (check, text = '') => {
            title.value = "Danh sách phiếu mượn" + text
            isCheck.value = check
        }

        const updateTitle = () => {
            if (checkPath('out')) {
                changeValue(false, ' quá hạn')
            } else if (checkPath('histories')) {
                changeValue(false, ' đã trả')
            } else {
                changeValue(true)
            }
            document.title = title.value
        }

        // Update title initially
        onMounted(() => {
            updateTitle()
        })

        // Watch for route changes and update title accordingly
        watch(() => route.query.action, () => {
            updateTitle()
        })

        return {
            title,
            isCheck
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
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>
                        <router-link to="/bill/agaga/dd" class="table-btn">
                            <i class="fa-solid fa-eye"></i>
                        </router-link>
                        <button class="table-btn table-btn--add" v-if="isCheck">
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
