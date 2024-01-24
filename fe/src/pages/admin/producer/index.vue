<script>
import { onMounted, ref } from "vue"
import Title from '~/components/Title.vue'
import { nhaXuatBanAPI } from "~/services/nhaXuatBanAPI"

export default {
    setup() {
        const title = ref(null)
        const TENNXB = ref('')
        const DIACHI = ref('')
        const MANXB = ref('')
        const data = ref([])
        const isEdit = ref(false)

        const getData = async () => {
            try {
                data.value = (await nhaXuatBanAPI.getAll()).data
            } catch (err) {
                console.log(err)
            }
        }

        onMounted(async () => {
            document.title = 'Danh sách nhà xuất bản'
            await getData()
        })

        const handleClick = async (action, data = null) => {
            if (action === 'add') {
                title.value = 'Thêm nhà xuất bản'
                isEdit.value = false
                TENNXB.value = ''
                DIACHI.value = ''
            } else {
                isEdit.value = true
                title.value = 'Chỉnh sửa thông tin nhà xuất bản'
                TENNXB.value = data.TENNXB
                MANXB.value = data.MANXB
                DIACHI.value = data.DIACHI
            }
        }

        const handleSubmit = async () => {
            try {
                let message

                if (isEdit.value) {
                    const res = await nhaXuatBanAPI.update(MANXB.value, {
                        TENNXB: TENNXB.value,
                        DIACHI: DIACHI.value
                    })
                    message = res.message
                } else {
                    const res = await nhaXuatBanAPI.create({
                        TENNXB: TENNXB.value,
                        DIACHI: DIACHI.value
                    })
                    message = res.message
                }
                alert(message)
                await getData()
            } catch (err) {
                console.log(err)
            }
        }

        return {
            handleClick,
            title,
            TENNXB,
            DIACHI,
            MANXB,
            data,
            handleSubmit
        }
    },
    components: {
        Title
    }
}
</script>
<template>
    <section class="admin">
        <div class="producer">
            <div class="producer-text">
                <Title title="Danh sách nhà xuất bản" root="Admin" />
            </div>
            <button class="producer-btn" data-bs-toggle="modal" data-bs-target="#form" @click="handleClick('add')">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên nhà xuất bản</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số quyển</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody v-if="data">
                <tr v-for="(el, i) in data" :key="el._id">
                    <td>{{ i + 1 }}</td>
                    <td>{{ el.TENNXB }}</td>
                    <td>{{ el.DIACHI }}</td>
                    <td>{{ el.count }}</td>
                    <td>
                        <button data-bs-toggle="modal" data-bs-target="#form" class="table-btn table-btn--edit"
                            @click="handleClick('edit', el)">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="form" tabindex="-1" aria-labelledby="formLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="formLabel">
                            {{ title }}
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="admin-form">
                            <div class="admin-form__group mb-4">
                                <label for="name">Tên nhà xuất bản</label>
                                <input type="text" id="name" v-model="TENNXB">
                            </div>
                            <div class="admin-form__group">
                                <label for="address">Địa chỉ</label>
                                <input type="text" id="address" v-model="DIACHI">
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
