<script>
import { onMounted, ref } from "vue"
import Title from '~/components/Title.vue'
import { useRoute } from "vue-router"
import { hinhAnhAPI } from "~/services/hinhAnhAPI"
import loadingState from "~/utils/loadingState"

export default {
    setup() {
        const route = useRoute()
        const titleModal = ref('Chỉnh sửa')
        const MSB = ref(route.query.MSB)
        const TENHA = ref()
        const data = ref([])
        const MAHA = ref()

        const getData = async () => {
            loadingState.loading = true
            try {
                if (MSB) {
                    data.value = (await hinhAnhAPI.getByBook(MSB.value)).data
                }
            } catch (err) {
                console.log(err)
            }
            loadingState.loading = false
        }

        onMounted(async () => {
            document.title = 'Danh sách hình ảnh'
            await getData()
        })

        const updateHinhAnh = async () => {
            loadingState.loading = true
            try {
                const { message } = await hinhAnhAPI.update(MAHA.value, {
                    TENHA: TENHA.value.trim(),
                    MASACH: MSB.value
                })
                loadingState.loading = false
                alert(message)
            } catch (err) {
                alert('Cập nhật thất bại!')
            }
            loadingState.loading = false
        }

        const createHinhAnh = async () => {
            loadingState.loading = true
            try {
                const { message } = await hinhAnhAPI.create({
                    TENHA: TENHA.value.trim(),
                    MASACH: MSB.value
                })
                loadingState.loading = false
                alert(message)
            } catch (err) {
                alert('Thêm hình ảnh thất bại!')
            }
            loadingState.loading = false
        }

        const handleClick = async (data = null) => {
            if (data) {
                titleModal.value = 'Chỉnh sửa'
                MAHA.value = data.MAHA
                TENHA.value = data.TENHA
                MSB.value = data.MASACH
            } else {
                titleModal.value = 'Thêm'
                TENHA.value = ''
            }
        }

        const handleSubmit = async () => {
            if (titleModal.value == 'Chỉnh sửa') {
                await updateHinhAnh()
            } else {
                await createHinhAnh()
            }

            TENHA.value = ''
            await getData()
        }

        const handleDelete = async (id) => {
            const check = confirm("Bạn có muốn xóa hình ảnh này")
            loadingState.loading = true
            if (check) {
                try {
                    const { message } = await hinhAnhAPI.delete(id)
                    loadingState.loading = false
                    alert(message)
                    await getData()
                }
                catch (err) {
                    alert('Xóa hình ảnh thất bại!')
                }
            }
            loadingState.loading = false
        }

        return {
            handleClick,
            MSB,
            titleModal,
            TENHA,
            data,
            MAHA,
            handleSubmit,
            handleDelete
        }
    },
    components: {
        Title
    }
}
</script>
<template>
    <section class="admin">
        <div class="admin-top">
            <div>
                <Title title="Danh sách hình ảnh" root="Admin" sup="Danh sách sản phẩm" />
            </div>
            <button data-bs-toggle="modal" data-bs-target="#action" class="admin-top__btn" @click="handleClick()">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên hình ảnh</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody v-if="data">
                <tr v-for="(el, i) in data" :key="el._id">
                    <td>{{ i + 1 }}</td>
                    <td>{{ el.TENHA }}</td>
                    <td>
                        <img :src="`../src/assets/images/books/${el.TENHA}`" :alt="el.TENHA">
                    </td>
                    <td>
                        <button data-bs-toggle="modal" data-bs-target="#action" class="table-btn table-btn--edit"
                            @click="handleClick(el)">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="table-btn" @click="handleDelete(el.MAHA)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="action" tabindex="-1" aria-labelledby="actionLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="actionLabel">
                            {{ titleModal }} hình ảnh
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="admin-form" @submit.prevent="handleSubmit">
                            <div class="admin-form__group">
                                <label for="name">Tên hình ảnh</label>
                                <input type="text" id="name" required v-model="TENHA">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning text-light" data-bs-dismiss="modal"
                            @click="handleSubmit">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
@import url('./index.scss');
</style>
