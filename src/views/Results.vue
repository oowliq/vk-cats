<template lang="pug">
    .results(ref="results")
        slide-y-up-transition(mode="out-in" v-if="!fetching")
            .results-card
                .results-card__header
                    user(:user="userInfo")
                .results-card__body
                    charts
        router-link.go-back(:to={name: 'start'} v-if="!fetching" ref="goBack") На главную

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { SlideYUpTransition } from 'vue2-transitions';

import User from '@/components/User.vue';
import Charts from '@/components/Charts.vue';
import { TweenMax, Power2 } from 'gsap/TweenMax';

export default {
    name: 'results',
    components: { Charts, User, SlideYUpTransition },

    data() {
        return {
            d: false,
            fetching: true,
        };
    },

    computed: {
        ...mapGetters({
            userInfo: 'results/userInfo',
        }),
    },

    methods: {
        ...mapActions({
            getUserInfo: 'results/GET_USER_INFO',
            getUserStats: 'results/GET_USER_STATS',
        }),

        endAnimation(callback) {
            const { results } = this.$refs;

            TweenMax.fromTo(
                results,
                1,

                {
                    css: {
                        top: '0',
                        opacity: 1,
                    },
                    ease: Power2.easeInOut,
                },
                {
                    css: {
                        top: '-800px',
                        opacity: 0,
                    },
                    ease: Power2.easeInOut,
                    onComplete: callback,
                },
            );
        },
    },

    mounted() {
        this.d = true;
        if (!this.results) {
            const profileName = this.$route.params.id;
            const profileLink = `https://vk.com/${profileName}`;
            this.getUserInfo({ profileName })
                .then(() => {
                    this.getUserStats({ profileLink }).then(() => {
                        this.fetching = false;
                    });
                })
                .catch(() => {
                    this.$router.push({ name: 'start' });
                });
        }
    },

    beforeRouteLeave(to, from, next) {
        this.endAnimation(() => {
            next();
        });
    },
};
</script>

<style lang="scss" scoped>
.results {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 90px;
    margin-bottom: 40px;
}

.results-card {
    position: relative;
    background-color: #edeef0;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.041), 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    width: 800px;
    padding: 2em;
    display: flex;
    flex-direction: column;

    @media (max-width: 900px) {
        width: 600px;
    }

    @media (max-width: 670px) {
        width: 400px;
    }

    &__header {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__body {
        margin-top: 40px;
    }
}

.go-back {
    position: relative;
    z-index: 1;
    color: $warning;
    font-weight: 300;
    font-size: 12px;
    letter-spacing: 1px;
    background-color: rgba(#fff, 0.2);
    border-radius: 20em;
    text-decoration: none;
    padding: 1em 3em;
    margin-top: 20px;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: rgba(#fff, 0.3);
    }
    &:active {
        background-color: rgba(#fff, 0.1);
    }
}
</style>
