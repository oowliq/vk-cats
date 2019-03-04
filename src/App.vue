<template lang="pug">
  #app
    slide-y-up-transition(v-if="!aliveCats")
        .pay-respect
            span.pay-respect__label
                | Press
                span  F
                |  to pay respect

    .cats-info-wrapper(ref="catsInfo")
        kill-cats-timer

    cats

    slide-y-up-transition(mode="out-in")
        router-view#view
</template>

<script>
import { mapGetters } from 'vuex';
import { SlideYUpTransition } from 'vue2-transitions';
import KillCatsTimer from '@/components/KillCatsTimer.vue';
import Cats from '@/components/Cats.vue';

export default {
    name: 'App',

    components: { SlideYUpTransition, KillCatsTimer, Cats },

    computed: {
        ...mapGetters({
            aliveCats: 'cats/aliveCats',
        }),
    },
};
</script>


<style lang="scss">
.cats-info-wrapper {
    z-index: 1;
    position: fixed;
    left: 40px;
    top: 20px;
}

.pay-respect {
    position: fixed;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20px;
    z-index: 2;
    &__label {
        color: #fff;
        font-weight: 300;
        letter-spacing: 1px;
        background-color: rgba(#fff, 0.2);
        border-radius: 20em;
        padding: 1em 2em;
        span {
            color: $warning;
        }
    }
}

#view {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
}
</style>
