<script>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import canhkhuya from '~/assets/images/banners/canhkhuya.png';
import ngamtrang from '~/assets/images/banners/ngamtrang.png';
import tuccanh_pacpo from '~/assets/images/banners/tuccanh_pacpo.png';
import vietnam_doclap from '~/assets/images/banners/vietnam_doclap.png';

export default {
    components: {
        Carousel,
        Navigation,
        Pagination,
        Slide
    },
    setup() {
        const data = [
            {
                id: 0,
                link: canhkhuya
            },
            {
                id: 1,
                link: ngamtrang
            },
            {
                id: 2,
                link: tuccanh_pacpo
            },
            {
                id: 3,
                link: vietnam_doclap
            }
        ];

        return {
            data
        };
    }
}

</script>
<template>
    <Carousel :autoplay="5000" :pause-autoplay-on-hover="true" :wrap-around="true">
        <Slide v-for="item in data" :key="item.id">
            <div class="carousel__item">
                <img :src="item.link" :alt="item.id">
            </div>
        </Slide>

        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>

<style lang="scss" scoped>
.carousel__item {
    height: 50vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
}
</style>