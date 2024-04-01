<script>
import Title from '~/components/Title.vue'
import { ref } from "vue"
import { nhanVienAPI } from '~/services/nhanVienAPI'
import router from "~/router";
import loadingState from '~/utils/loadingState';

export default {
    setup() {
        const HoTenNV = ref()
        const Password = ref()
        const ChucVu = ref()
        const DiaChi = ref()
        const SoDienThoai = ref()

        const handleRegister = async () => {
            const regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
            const regexSDT = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
            const pass = Password.value.trim()

            if (!regexSDT.test(SoDienThoai.value)) {
                return alert('Vui lòng nhập số điện thoại!')
            }

            if (HoTenNV.value.length < 4) {
                return alert('Vui lòng nhập tên tối thiểu 4 kí tự!')
            }

            if (!regexPass.test(pass)) {
                return alert('Vui lòng nhập mật khẩu chứa số, chữ thường, chữ in và ít nhất 8 kí tự!')
            }

            loadingState.loading = true
            try {
                const { message } = await nhanVienAPI.register({
                    HoTenNV: HoTenNV.value,
                    Password: Password.value,
                    DiaChi: DiaChi.value,
                    SoDienThoai: SoDienThoai.value,
                    ChucVu: ChucVu.value
                })

                loadingState.loading = false
                alert(message)
                router.push('/admin/account?name=admin')
            } catch (e) {
                alert('Tạo tài khoản thất bại!')
                console.log(e)
            }
            loadingState.loading = false
        }

        return {
            HoTenNV,
            DiaChi,
            ChucVu,
            SoDienThoai,
            Password,
            handleRegister
        }
    },
    data() {
        return {
            isShow: false,
            eyeIcon: '<i class="fa-solid fa-eye"></i>',
            eyeSlashIcon: '<i class="fa-solid fa-eye-slash"></i>'
        };
    },
    methods: {
        handleToggleShow() {
            this.isShow = !this.isShow;
        }
    },
    components: {
        Title
    }
}
</script>

<template>
    <div class="admin">
        <Title title="Thêm tài khoản nhân viên" root="Admin" sup="Danh sách nhân viên" />
        <div class="row">
            <div class="col-8">
                <form class="admin-form mt-3" @submit.prevent="handleRegister">
                    <div class="row">
                        <div class="col-6">
                            <div class="admin-form__group">
                                <label for="name">Họ tên nhân viên</label>
                                <input type="text" id="name" required v-model="HoTenNV">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="admin-form__group">
                                <label for="chucvu">Chức vụ</label>
                                <input type="text" id="chucvu" required v-model="ChucVu">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="admin-form__group my-4">
                                <label for="password">Mật khẩu</label>
                                <div class="admin-password">
                                    <input :type="isShow ? 'text' : 'password'" id="password" required
                                        v-model="Password">
                                    <span class="admin-password__btn" @click="handleToggleShow"
                                        v-html="isShow ? eyeIcon : eyeSlashIcon">
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="admin-form__group my-4">
                                <label for="phone">Số điện thoại</label>
                                <input type="text" id="phone" required v-model="SoDienThoai">
                            </div>
                        </div>
                    </div>
                    <div class="admin-form__group mb-4">
                        <label for="adress">Địa chỉ</label>
                        <input type="text" id="adress" required v-model="DiaChi">
                    </div>
                    <div class="admin-form__btn">
                        <button type="submit">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url('./index.scss');
</style>