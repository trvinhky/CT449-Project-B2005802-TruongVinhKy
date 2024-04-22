<template>
    <Loading v-if="isLoading" />
    <header style="background-color: #000">
        <div class="container py-2">
            <Logo />
        </div>
    </header>
    <main class="container">
        <router-view />
    </main>
</template>

<script>
import { ref, watch } from "vue";
import Logo from '../components/Logo.vue';
import loadingState from '~/utils/loadingState'
import Loading from "~/components/Loading.vue";

export default {
    setup() {
        const isLoading = ref(loadingState.loading)

        watch(() => loadingState.loading, async () => {
            isLoading.value = loadingState.loading
        })

        return {
            isLoading
        }
    },
    components: {
        Logo,
        Loading
    }
}
</script>

<style lang="scss" scoped></style>