<script>
import { ref, onMounted } from "vue"
import Title from "~/components/Title.vue"
import Table from "./Table.vue"
import { useRoute } from "vue-router"
import { docGiaAPI } from "~/services/docGiaAPI"
import router from "~/router";

export default {
    setup() {
        const route = useRoute()
        const tenKH = ref('')
        const hoKH = ref('')
        const diaChi = ref('')
        const phone = ref('')
        const changeTab = ref(0)
        const isAction = ref(true)
        const ngaySinh = ref('')
        const gioiTinh = ref(1)
        const isDisabled = ref(true)
        const MSDG = ref(route.query.MSDG)

        const convertDate = (date) => {
            const dateObject = new Date(date);
            const year = dateObject.getFullYear();
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
            const day = dateObject.getDate().toString().padStart(2, '0');

            ngaySinh.value = `${year}-${month}-${day}`;
        }

        const getData = async () => {
            try {
                if (!MSDG) {
                    router.push('/')
                }
                const { data } = await docGiaAPI.getInfo(MSDG.value)
                if (data) {
                    tenKH.value = data.TEN
                    hoKH.value = data.HOLOT
                    convertDate(data.NGAYSINH)
                    gioiTinh.value = data.PHAI
                    diaChi.value = data.DIACHI
                    phone.value = data.DIENTHOAI
                } else {
                    router.push('/')
                }
            } catch (err) {
                console.log(err)
            }
        }


        const updateData = async () => {
            try {
                console.log(MSDG.value)
                const { data, message } = await docGiaAPI.update(MSDG.value, {
                    HOLOT: hoKH.value,
                    TEN: tenKH.value,
                    DIACHI: diaChi.value,
                    NGAYSINH: ngaySinh.value,
                    PHAI: +gioiTinh.value
                })
                alert(message)

                if (data) {
                    await getData()
                } else {
                    route.push('/')
                }
            } catch (err) {
                console.log(err)
            }
        }

        onMounted(async () => {
            await getData()
            document.title = 'Trang cá nhân'
        })

        const handleChangeTab = async (id) => {
            changeTab.value = id
            if (id === 0) isAction.value = true
            else isAction.value = false
        }

        const checkActive = async (id) => changeTab.value === id

        const toggleEdit = async () => {
            isDisabled.value = !isDisabled.value
        }

        const handleLoggout = async () => {
            localStorage.removeItem('MADG')
            router.push('/login')
        }

        return {
            tenKH,
            diaChi,
            phone,
            changeTab,
            handleChangeTab,
            isAction,
            checkActive,
            hoKH,
            ngaySinh,
            gioiTinh,
            isDisabled,
            toggleEdit,
            updateData,
            handleLoggout
        }
    },
    components: {
        Title,
        Table
    }
}
</script>

<template>
    <section class="user py-3">
        <Title title="Trang cá nhân" />
        <div class="row">
            <div class="col-4">
                <div class="user-avatar">
                    <span class="user-avatar__icon">
                        <i class="fa-regular fa-user"></i>
                    </span>
                </div>
            </div>
            <div class="col-8">
                <form class="user-info" @submit.prevent="async () => await updateData()">
                    <fieldset :disabled="isDisabled" class="py-3">
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="hoLot">Họ</label>
                                <input type="text" id="hoLot" class="form-control" v-model="hoKH">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="ten">Tên</label>
                                <input type="text" id="ten" class="form-control" v-model="tenKH">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="gioiTinh">Giới tính</label>
                                <select id="gioiTinh" class="form-control" v-model="gioiTinh">
                                    <option value="1" :selected="+gioiTinh.value === 1">Nam</option>
                                    <option value="0" :selected="+gioiTinh.value === 0">Nữ</option>
                                    <option value="2" :selected="+gioiTinh.value === 2">Khác</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row pt-2">
                            <div class="form-group col-md-6">
                                <label for="soDT">Số điện thoại</label>
                                <input type="text" id="soDT" class="form-control" v-model="phone" readonly>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="ngaySinh">Ngày sinh</label>
                                <input type="date" id="ngaySinh" class="form-control" v-model="ngaySinh">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="diaChi">Dịa chỉ</label>
                            <input type="text" id="diaChi" class="form-control" v-model="diaChi">
                        </div>
                    </fieldset>
                    <div class="user-info__change">
                        <button @click="handleLoggout">
                            Đăng Xuất
                        </button>
                        <button type="submit" :class="{ hide: isDisabled }">
                            Cập Nhật
                        </button>
                        <button @click="toggleEdit" type="button">
                            <i class="fa-solid fa-user-pen"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="user-tab">
            <ul class="user-tab__list">
                <li :class="{ 'active': changeTab === 0 }" @click="handleChangeTab(0)">
                    Chờ xác nhận
                </li>
                <li :class="{ 'active': changeTab === 1 }" @click="handleChangeTab(1)">
                    Sách đang mượn
                </li>
                <li :class="{ 'active': changeTab === 2 }" @click="handleChangeTab(2)">
                    Lịch sử
                </li>
            </ul>
            <div class="user-tab__content">
                <Table :isAction="isAction" />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>