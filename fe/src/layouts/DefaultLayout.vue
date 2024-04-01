<script>
import Logo from '../components/Logo.vue'
import { ref, onMounted, computed, watch } from "vue";
import router from '~/router';
import Loading from '~/components/Loading.vue';
import { nhaXuatBanAPI } from '~/services/nhaXuatBanAPI';
import { useUserStore } from '~/store/userStore';
import loadingState from '~/utils/loadingState'

export default {
  setup() {
    const userStore = useUserStore()
    const search = ref('')
    const MADG = ref('')
    const nxb = ref([])
    const isLoading = ref(loadingState.loading)

    const handleSearch = async () => {
      if (router) {
        router.push(`/search?key=${search.value}&type=name`);
      }
    }

    const getDataNXB = async () => {
      try {
        nxb.value = (await nhaXuatBanAPI.getAll()).data
      } catch (err) {
        console.log(err)
      }
    }

    watch(() => loadingState.loading, async () => {
      isLoading.value = loadingState.loading
    })

    onMounted(async () => {
      const MADOCGIA = userStore?.user?.MADOCGIA;
      await getDataNXB()
      if (MADOCGIA) {
        MADG.value = MADOCGIA
      }
    })

    const validMADG = computed(() => MADG.value && MADG.value.length > 0);
    const idx = computed(() => MADG.value);

    const handleScrollTop = async () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    return {
      search,
      handleSearch,
      handleScrollTop,
      isLoading,
      MADG,
      validMADG,
      idx,
      nxb
    }
  },
  components: {
    Logo,
    Loading
  }
}
</script>

<template>
  <Loading v-if="isLoading" />
  <header>
    <div class="container py-2">
      <nav class="header">
        <div class="header-left">
          <Logo />
          <form class="search" method="get" @submit.prevent="handleSearch">
            <input type="search" name="search" v-model="search" class="search-input" required
              placeholder="Tìm kiếm sản phẩm...">
            <button type="submit" class="search-btn">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div class="header-right">
          <router-link :to="validMADG ? `/user?MSDG=${idx}` : 'login'" class="btn-header">
            <i class="fa-solid fa-user"></i> Tài khoản
          </router-link>
          <button class="btn-header btn-header--list" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight">
            <i class="fa-solid fa-list"></i>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
              <h5 id="offcanvasRightLabel" style="font-weight: 600;">Danh mục</h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <nav class="list">
                <router-link to="/" class="list__item">
                  <i class="fa-solid fa-house"></i>Trang chủ
                </router-link>
                <router-link v-if="nxb" v-for="(el, i) in nxb" :key="el._id" :to="`/authors?nxb=${el.MANXB}`"
                  class="list__item">
                  <i class="fa-solid fa-bookmark"></i> {{ el.TENNXB }}
                </router-link>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <main class="container" style="margin-top: 60px;">
    <router-view />
  </main>
  <footer class="container">
    <div class="row">
      <div class="col-12">
        <p class="footer-end">
          ©2024 www.sachvannang.com - Thiết Kế Bởi Tr. Vĩnh Ký
        </p>
      </div>
    </div>
    <span class="scroll-top" @click="handleScrollTop">
      <i class="fa-solid fa-arrow-up"></i>
    </span>
  </footer>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/default.scss');
</style>