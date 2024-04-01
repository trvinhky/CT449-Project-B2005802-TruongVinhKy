<script>
import { onMounted, ref } from "vue"
import Title from '~/components/Title.vue'
import { nhaXuatBanAPI } from "~/services/nhaXuatBanAPI"
import { sachAPI } from "~/services/sachAPI"
import loadingState from "~/utils/loadingState"

export default {
    setup() {
        const nxb = ref([])
        const TENSACH = ref()
        const DONGIA = ref()
        const SOQUYEN = ref(0)
        const NAMXUATBAN = ref()
        const MANXB = ref()
        const TACGIA = ref()

        const getData = async () => {
            loadingState.loading = true
            try {
                nxb.value = (await nhaXuatBanAPI.getAll()).data
                if (nxb.value) MANXB.value = nxb.value[0].MANXB
            } catch (err) {
                console.log(err)
            }
            loadingState.loading = false
        }

        const clearInput = () => {
            TENSACH.value = ''
            DONGIA.value = ''
            NAMXUATBAN.value = ''
            SOQUYEN.value = 0
            MANXB.value = ''
            TACGIA.value = ''
        }

        const handleCreateBook = async () => {
            const donGia = +(DONGIA.value.replace('.', ''))
            if (isNaN(donGia)) {
                return alert('Vui lòng nhập đúng định dạng ví dụ: 10.000!')
            }

            if (isNaN(+NAMXUATBAN.value)) {
                return alert('Vui lòng nhập năm xuất bản là số!')
            }

            loadingState.loading = true
            try {
                const { message } = await sachAPI.create({
                    TENSACH: TENSACH.value,
                    DONGIA: donGia,
                    SOQUYEN: +SOQUYEN.value,
                    NAMXUATBAN: +NAMXUATBAN.value,
                    TACGIA: TACGIA.value,
                    MANXB: MANXB.value
                })

                loadingState.loading = false
                alert(message)
                clearInput()
                await getData()
            } catch (err) {
                console.log(err)
            }
            loadingState.loading = false
        }

        onMounted(async () => {
            document.title = 'Thêm sản phẩm mới'
            await getData()
        })

        return {
            nxb,
            TACGIA,
            MANXB,
            SOQUYEN,
            DONGIA,
            TENSACH,
            NAMXUATBAN,
            handleCreateBook
        }
    },
    components: {
        Title
    }
}
</script>
<template>
    <section class="admin">
        <Title title="Thêm sản phẩm mới" root="Admin" />
        <div class="row">
            <div class="col-8">
                <form class="admin-form mt-3" @submit.prevent="handleCreateBook">
                    <div class="admin-form__group mb-4">
                        <label for="name">Tên sản phẩm</label>
                        <input type="text" id="name" required v-model="TENSACH">
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <div class="admin-form__group">
                                <label for="price">Đơn giá</label>
                                <input type="text" id="price" placeholder="10.000" required v-model="DONGIA">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="admin-form__group">
                                <label for="count">Số quyển</label>
                                <input type="number" id="count" min="1" required v-model="SOQUYEN">
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="admin-form__group">
                                <label for="year">Năm xuất bản</label>
                                <input type="text" id="year" required v-model="NAMXUATBAN">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <div class="admin-form__group my-4">
                                <label for="author">Tác giả / Nguồn gốc</label>
                                <input type="text" id="author" required v-model="TACGIA">
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="admin-form__group my-4">
                                <label for="nxb">Nhà xuất bản</label>
                                <select id="nxb" v-if="nxb" v-model="MANXB">
                                    <option :value="el.MANXB" v-for="el in nxb">
                                        {{ el.TENNXB }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="admin-form__btn">
                        <button type="submit">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
@import url('./index.scss');
</style>