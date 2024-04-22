<script>
import { onMounted, ref, watch } from "vue"
import Title from '~/components/Title.vue'
import { useRoute } from "vue-router"
import { sachAPI } from "~/services/sachAPI"
import { nhaXuatBanAPI } from "~/services/nhaXuatBanAPI"
import { useBookStore } from "~/store/bookStore"
import loadingState from "~/utils/loadingState"

export default {
    setup() {
        const bookStore = useBookStore()
        const route = useRoute()
        const MASACH = ref(null)
        const page = ref(parseInt(route.query.page) || 1)
        const count = ref(0)
        const data = ref([])
        const nxb = ref([])
        const TENSACH = ref()
        const DONGIA = ref()
        const SOQUYEN = ref(0)
        const NAMXUATBAN = ref()
        const MANXB = ref('')
        const TACGIA = ref()
        const TENNXB = ref()
        const TENHA = ref('')

        const getData = async () => {
            loadingState.loading = true
            try {
                await bookStore.getAll(page.value)
                data.value = bookStore.bookAll

                nxb.value = (await nhaXuatBanAPI.getAll()).data
            } catch (err) {
                console.log(err)
            }
            loadingState.loading = false
        }

        const getInfo = async (id) => {
            loadingState.loading = true
            try {
                await bookStore.getInformation(id)
                loadingState.loading = false
                return bookStore.book
            } catch (err) {
                console.log(err)
            }
            loadingState.loading = false
        }

        const getCountPage = async () => {
            loadingState.loading = true
            try {
                const { data } = await sachAPI.getCount()
                if (data) {
                    count.value = Math.ceil(data / 6)
                }
            } catch (e) {
                console.log(e)
            }
            loadingState.loading = false
        }

        onMounted(async () => {
            document.title = 'Danh sách sản phẩm'
            await getCountPage()
            await getData()
        })

        watch(() => route.query.page, async () => {
            page.value = parseInt(route.query.page)
            await getData()
        })

        const handleClick = async (id) => {
            const info = await getInfo(id)
            if (info) {
                MASACH.value = info.MASACH
                TENSACH.value = info.TENSACH
                DONGIA.value = info.DONGIA.toLocaleString('vi-VN')
                NAMXUATBAN.value = info.NAMXUATBAN
                SOQUYEN.value = info.SOQUYEN
                if (info.MANXB) {
                    MANXB.value = info.MANXB.MANXB
                    TENNXB.value = info.MANXB.TENNXB
                }
                TACGIA.value = info.TACGIA
                if (info.hinhAnh) {
                    TENHA.value = info?.hinhAnh[0]?.TENHA
                }
            }
        }

        const handleEditBook = async () => {
            const donGia = +(DONGIA.value.replace('.', ''))
            if (isNaN(donGia)) {
                return alert('Vui lòng nhập đúng định dạng ví dụ: 10.000!')
            }

            if (isNaN(+NAMXUATBAN.value)) {
                return alert('Vui lòng nhập năm xuất bản là số!')
            }

            loadingState.loading = true
            try {
                const { message } = await sachAPI.update(MASACH.value, {
                    TENSACH: TENSACH.value,
                    DONGIA: donGia,
                    SOQUYEN: +SOQUYEN.value,
                    NAMXUATBAN: +NAMXUATBAN.value,
                    TACGIA: TACGIA.value,
                    MANXB: MANXB.value
                })

                loadingState.loading = false
                alert(message)
            } catch (err) {
                alert('Cập nhật thông tin sách thất bại!')
            }
            loadingState.loading = false
        }

        return {
            handleClick,
            MASACH,
            page,
            count,
            data,
            nxb,
            TACGIA,
            MANXB,
            SOQUYEN,
            DONGIA,
            TENSACH,
            NAMXUATBAN,
            TENNXB,
            TENHA,
            handleEditBook
        }
    },
    components: {
        Title
    }
}
</script>
<template>
    <section class="admin">
        <div>
            <Title title="Danh sách sản phẩm" root="Admin" />
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Số quyển</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Tác giả</th>
                        <th scope="col" style="width: 20%;"></th>
                    </tr>
                </thead>
                <tbody v-if="data">
                    <tr v-for="(el, i) in data" :key="el._id">
                        <td>{{ i + 1 }}</td>
                        <td>{{ el.TENSACH }}</td>
                        <td>{{ el.SOQUYEN }}</td>
                        <td>{{ el.DONGIA.toLocaleString('vi-VN') }}đ</td>
                        <td>{{ el.TACGIA }}</td>
                        <td>
                            <button class="table-btn" data-bs-toggle="modal" data-bs-target="#view"
                                @click="handleClick(el.MASACH)">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                            <router-link :to="'/admin/images?MSB=' + el.MASACH" class="table-btn table-btn--add">
                                <i class="fa-solid fa-image"></i>
                            </router-link>
                            <button data-bs-toggle="modal" data-bs-target="#edit" class="table-btn table-btn--edit"
                                @click="handleClick(el.MASACH)">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="admin-dots" v-if="count">
            <ul class="admin-dots__list">
                <li v-for="i in count" :class="{ 'active': page === i }">
                    <router-link :to="`/admin/products?page=${i}`">
                        {{ i }}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="modal fade" id="view" tabindex="-1" aria-labelledby="viewLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="viewLabel">
                            {{ TENSACH }}
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="admin-modal">
                            <div class="admin-modal__top">
                                <img :src="`../src/assets/images/books/${TENHA}`">
                                <div>
                                    <span>Đơn giá: <small>{{ DONGIA }}₫</small></span>
                                    <span>Tác giả: <small>{{ TACGIA }}</small></span>
                                    <span>Số lượng: <small>{{ SOQUYEN }}</small></span>
                                    <span>Năm xuất bản: <small>{{ NAMXUATBAN }}</small></span>
                                    <span>Nhà xuất bản: <small>{{ TENNXB }}</small></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editLabel">
                            Chỉnh sửa thông tin sản phẩm
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="admin-form" @submit.prevent="handleEditBook">
                            <div class="admin-form__group mb-4">
                                <label for="name">Tên sản phẩm</label>
                                <input type="text" id="name" v-model="TENSACH">
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="admin-form__group">
                                        <label for="price">Đơn giá</label>
                                        <input type="text" id="price" placeholder="10.000" v-model="DONGIA">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="admin-form__group">
                                        <label for="count">Số quyển</label>
                                        <input type="number" id="count" v-model="SOQUYEN">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="admin-form__group my-4">
                                        <label for="nxb">Nhà xuất bản</label>
                                        <select id="nxb" v-if="nxb" v-model="MANXB">
                                            <option :value="el.MANXB" v-for="el in nxb"
                                                :selected="el.MANXB === MANXB.value">
                                                {{ el.TENNXB }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="admin-form__group my-4">
                                        <label for="year">Năm xuất bản</label>
                                        <input type="text" id="year" required v-model="NAMXUATBAN">
                                    </div>
                                </div>
                            </div>
                            <div class="admin-form__group">
                                <label for="author">Tác giả / Nguồn gốc</label>
                                <input type="text" id="author" v-model="TACGIA">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning text-light" data-bs-dismiss="modal"
                            @click="handleEditBook">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
@import url('./index.scss');
</style>
