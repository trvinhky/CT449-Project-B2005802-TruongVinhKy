<script setup>
const { isAction } = defineProps({
    isAction: {
        required: false,
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Ngày mượn</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tình trạng</th>
                <th scope="col" v-if="isAction"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                    <router-link to="/bill?user=kjhb&book=bgvg&date=2023-1-1" class="table-btn">
                        <i class="fa-solid fa-eye"></i>
                    </router-link>
                    <button class="table-btn table-btn--cancel" v-if="isAction">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>