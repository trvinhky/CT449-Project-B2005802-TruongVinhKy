<script>
import { ref, onMounted } from "vue";
import router from "~/router";
import { useAdminStore } from "~/store/adminStore";
import { useUserStore } from "~/store/userStore";

export default {
    setup() {
        const userStore = useUserStore()
        const adminStore = useAdminStore()
        const SoDienThoai = ref('');
        const Password = ref('');
        const isUser = ref(window.location.href.indexOf('admin') === -1)

        onMounted(() => {
            document.title = 'Đăng Nhập'
        })

        const loginUser = async (pass, phone) => {
            try {
                await userStore.login(pass, phone)
                router.push('/')
            } catch (err) {
                console.log(err)
            }
        }

        const loginAdmin = async (pass, phone) => {
            try {
                await adminStore.login(pass, phone)
                router.push('/admin')
            } catch (err) {
                console.log(err)
            }
        }

        const handleLogin = async () => {
            const regexPass = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
            const regexSDT = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
            const pass = Password.value.trim()

            if (!regexSDT.test(SoDienThoai.value)) {
                return alert('Vui lòng nhập số điện thoại!')
            }

            if (!regexPass.test(pass)) {
                return alert('Vui lòng nhập mật khẩu chứa số, chữ thường, chữ in và ít nhất 8 kí tự!')
            }

            if (isUser.value) {
                await loginUser(pass, SoDienThoai.value)
            } else {
                await loginAdmin(pass, SoDienThoai.value)
            }
        }

        return {
            SoDienThoai,
            Password,
            handleLogin
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
}
</script>
<template>
    <div class="form">
        <h2 class="form-title">Đăng Nhập</h2>
        <form @submit.prevent="handleLogin" class="form-content">
            <div class="form-content__group">
                <label>SĐT</label>
                <input type="text" required v-model="SoDienThoai" name="SoDienThoai" />
            </div>
            <div class="form-content__group">
                <label>Password</label>
                <div class="form-password">
                    <input :type="isShow ? 'text' : 'password'" id="password" required v-model="Password">
                    <span class="form-password__btn" @click="handleToggleShow" v-html="isShow ? eyeIcon : eyeSlashIcon">
                    </span>
                </div>
            </div>
            <div class="form-content__btn">
                <button type="submit">
                    Đăng Nhập
                </button>
            </div>
        </form>
        <router-link to="/register" class="form-link">Đăng Ký <i class="fa-solid fa-right-long"></i></router-link>
    </div>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
