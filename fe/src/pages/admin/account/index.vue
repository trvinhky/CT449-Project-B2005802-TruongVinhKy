<script>
import { ref, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import Title from '~/components/Title.vue'
import { docGiaAPI } from "~/services/docGiaAPI"
import { nhanVienAPI } from "~/services/nhanVienAPI"
import loadingState from "~/utils/loadingState"

export default {
    setup() {
        const route = useRoute()
        const title = ref('Danh sách nhân viên')
        const isUser = ref(false)
        const data = ref([])

        const updateTitle = async () => {
            loadingState.loading = true
            try {
                if (route.query.name === 'user') {
                    title.value = 'Danh sách độc giả'
                    isUser.value = true
                    data.value = (await docGiaAPI.getAll()).data
                } else {
                    title.value = 'Danh sách nhân viên'
                    isUser.value = false
                    data.value = (await nhanVienAPI.getAll()).data
                }
                document.title = title.value
            } catch (err) {
                console.log(err)
            }
            loadingState.loading = false
        }

        // Update title initially
        onMounted(async () => {
            await updateTitle()
        })

        // Watch for route changes and update title accordingly
        watch(() => route.query.name, async () => {
            await updateTitle()
        })

        return {
            title,
            isUser,
            data
        }
    },
    components: {
        Title
    }
}
</script>
<template>
    <section class="admin">
        <div class="group">
            <div class="group-left">
                <Title :title="title" root="Admin" />
            </div>
            <router-link to="/admin/createAdmin" class="group-btn" v-if="!isUser">
                <i class="fa-solid fa-plus"></i>
            </router-link>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên tài khoản</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col" v-if="!isUser">Chức vụ</th>
                </tr>
            </thead>
            <tbody v-if="data">
                <tr v-for="(h, i) in data" :key="h._id">
                    <td>{{ i + 1 }}</td>
                    <td>{{ isUser ? h.HOLOT + h.TEN : h.HoTenNV }}</td>
                    <td>{{ isUser ? h.DIENTHOAI : h.SoDienThoai }}</td>
                    <td>{{ isUser ? h.DIACHI : h.DiaChi }}</td>
                    <td v-if="!isUser">{{ h.ChucVu }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
<style lang="scss" scoped>
.admin {
    th {
        font-weight: 600;
    }

    .group {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-btn {
            border: 1px solid #000;
            background-color: transparent;
            color: #000;
            text-decoration: none;
            padding: 4px 15px;
            border-radius: 5px;
            transition: 0.3s;

            &:hover {
                background-color: #000;
                color: #fff;
            }
        }
    }
}
</style>