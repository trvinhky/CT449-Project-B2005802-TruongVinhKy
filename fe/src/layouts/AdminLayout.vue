<script>
import { ref, onMounted } from "vue";
import Logo from '../components/Logo.vue';
import router from '~/router';
import { useAdminStore } from "~/store/adminStore";

export default {
    setup() {
        const adminStore = useAdminStore()
        const TenNV = ref('')

        const handleLoggout = async () => {
            adminStore.logout()
            router.push('/login/admin')
        }

        const getData = async () => {
            const MSNV = adminStore.admin.MSNV;
            if (MSNV) {
                try {
                    await adminStore.setInfo(MSNV)

                    if (adminStore.admin) {
                        TenNV.value = adminStore.admin.HoTenNV
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }

        onMounted(async () => {
            await getData()
        })

        return {
            handleLoggout,
            TenNV
        }
    },
    components: {
        Logo
    }
}
</script>

<template>
    <header>
        <div class="container py-1">
            <Logo />
        </div>
    </header>
    <main class="container pt-3" style="margin-top: 53px;">
        <div class="row">
            <div class="col-2">
                <div class="admin-top">
                    <span class="admin-top__avatar">
                        <i class="fa-solid fa-user-tie"></i>
                    </span>
                    <div class="admin-top__info">
                        <span v-if="TenNV">{{ TenNV }}</span>
                        <span @click="handleLoggout">Đăng xuất</span>
                    </div>
                </div>
                <nav class="admin-bottom py-3">
                    <h4 class="admin-bottom__title">
                        Chung
                    </h4>
                    <router-link to="/admin" class="admin-bottom__link">
                        <i class="fa-solid fa-house"></i> Thống kê
                    </router-link>
                    <h4 class="admin-bottom__title mt-3">
                        Tài khoản
                    </h4>
                    <router-link to="/admin/account?name=admin" class="admin-bottom__link">
                        <i class="fa-solid fa-users-gear"></i> Nhân viên
                    </router-link>
                    <router-link to="/admin/account?name=user" class="admin-bottom__link">
                        <i class="fa-solid fa-users"></i> Đọc giả
                    </router-link>
                    <h4 class="admin-bottom__title mt-3">
                        Sản phẩm
                    </h4>
                    <router-link to="/admin/products" class="admin-bottom__link">
                        <i class="fa-solid fa-book"></i> Danh sách
                    </router-link>
                    <router-link to="/admin/createBook" class="admin-bottom__link">
                        <i class="fa-solid fa-plus"></i> Thêm mới
                    </router-link>
                    <h4 class="admin-bottom__title mt-3">
                        Nhà xuất bản
                    </h4>
                    <router-link to="/admin/producer" class="admin-bottom__link">
                        <i class="fa-solid fa-bookmark"></i> Danh sách
                    </router-link>
                    <h4 class="admin-bottom__title mt-3">
                        Phiếu mượn
                    </h4>
                    <router-link to="/admin/bills?action=check" class="admin-bottom__link">
                        <i class="fa-solid fa-list-check"></i> Chờ duyệt
                    </router-link>
                    <router-link to="/admin/bills?action=pending" class="admin-bottom__link">
                        <i class="fa-solid fa-user-clock"></i> Đang mượn
                    </router-link>
                    <router-link to="/admin/bills?action=histories" class="admin-bottom__link">
                        <i class="fa-solid fa-book-bookmark"></i> Lịch sử
                    </router-link>
                </nav>
            </div>
            <div class="col-10">
                <router-view />
            </div>
        </div>

    </main>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/admin.scss');
</style>