<script>
import { ref, onMounted } from "vue";
import router from "~/router";
import { docGiaAPI } from "~/services/docGiaAPI";
import loadingState from "~/utils/loadingState";

export default {
    setup() {
        const DIENTHOAI = ref('');
        const TEN = ref('');
        const DIACHI = ref('');
        const MATKHAU = ref('');
        const passwordSub = ref('');
        const HOLOT = ref('')

        onMounted(() => {
            document.title = 'Đăng Ký'
        })

        const handleRegister = async () => {
            const regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
            const regexSDT = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
            const pass = MATKHAU.value.trim()

            if (!regexSDT.test(DIENTHOAI.value)) {
                return alert('Vui lòng nhập số điện thoại!')
            }

            if (!regexPass.test(pass)) {
                return alert('Vui lòng nhập mật khẩu chứa số, chữ thường, chữ in và ít nhất 8 kí tự!')
            }

            if (passwordSub.value.trim() !== pass) {
                return alert('Mật khẩu không khớp nhau!')
            }

            loadingState.loading = true
            try {
                const { message } = await docGiaAPI.register({
                    HOLOT: HOLOT.value,
                    TEN: TEN.value,
                    DIACHI: DIACHI.value,
                    MATKHAU: pass,
                    DIENTHOAI: DIENTHOAI.value
                })
                loadingState.loading = false
                alert(message)
                router.push('/login')
            } catch (err) {
                console.log(err)
            }
            loadingState.loading = false
        }

        return {
            DIENTHOAI,
            MATKHAU,
            TEN,
            DIACHI,
            passwordSub,
            handleRegister,
            HOLOT
        }
    }
}
</script>

<template>
    <div class="form">
        <h2 class="form-title">Đăng Ký</h2>
        <form @submit.prevent="handleRegister" class="form-content">
            <div class="form-content__group">
                <label>SĐT</label>
                <input type="text" required v-model="DIENTHOAI" />
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-content__group">
                        <label>Họ</label>
                        <input type="text" required v-model="HOLOT" />
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-content__group">
                        <label>Tên</label>
                        <input type="text" required v-model="TEN" />
                    </div>
                </div>
            </div>
            <div class="form-content__group">
                <label>Địa Chỉ</label>
                <input type="text" required v-model="DIACHI" />
            </div>
            <div class="form-content__group">
                <label>Password</label>
                <input type="password" required v-model="MATKHAU" />
            </div>
            <div class="form-content__group">
                <label>Nhập Lại Password</label>
                <input type="password" required v-model="passwordSub" />
            </div>
            <div class="form-content__btn">
                <button type="submit">
                    Đăng Ký
                </button>
            </div>
        </form>
        <router-link to="/login" class="form-link">Đăng Nhập <i class="fa-solid fa-right-long"></i></router-link>
    </div>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
