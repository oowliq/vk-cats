<template lang="pug">
    .start
        .hero-wrapper(ref="heroWrapper")
            router-link.logotype(to="/")
                span.logotype__source Papo
            search(@search="search" :fetching="fetching")

            slide-y-up-transition(v-if="serverError")
                p.server-error {{ serverError }}
</template>

<script>
import Search from '@/components/Search.vue';

import { TweenMax, Power2 } from 'gsap/TweenMax';
import { mapState, mapActions } from 'vuex';
import { SlideYUpTransition } from 'vue2-transitions';

export default {
    name: 'start',

    components: {
        Search,
        SlideYUpTransition,
    },

    data() {
        return {
            searchQuery: '',
            serverError: '',
        };
    },

    computed: {
        ...mapState('results', ['fetching']),
    },

    methods: {
        startAnimation() {
            const { heroWrapper } = this.$refs;
            TweenMax.fromTo(
                heroWrapper,
                1,
                {
                    css: {
                        top: '-200px',
                        opacity: 0,
                    },
                    ease: Power2.easeInOut,
                },
                {
                    css: {
                        top: '0',
                        opacity: 1,
                    },
                    ease: Power2.easeInOut,
                },
            ).delay(1);
        },

        endAnimation(callback) {
            const { heroWrapper } = this.$refs;
            TweenMax.fromTo(
                heroWrapper,
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
                        top: '200px',
                        opacity: 0,
                    },
                    ease: Power2.easeInOut,
                    onComplete: callback,
                },
            );
        },

        ...mapActions({
            getUserInfo: 'results/GET_USER_INFO',
            getUserStats: 'results/GET_USER_STATS',
        }),

        search({ profileLink, profileName }) {
            this.serverError = false;

            this.getUserInfo({ profileName })
                .then(({ data }) => {
                    if (!data[0].is_closed) {
                        this.getUserStats({ profileLink })
                            .then(() => {
                                this.endAnimation(() => {
                                    this.$router.push({
                                        name: 'user',
                                        params: { id: profileName },
                                    });
                                });
                            })
                            .catch(() => {
                                this.serverError = 'Ошибка обработки данных';
                            });
                    } else {
                        this.serverError = `Страница пользователя ${profileName} закрыта. Увы..`;
                    }
                })
                .catch(() => {
                    this.serverError = 'Ошибка обработки данных';
                });
        },
    },

    mounted() {
        this.startAnimation();
    },
};
</script>

<style lang="scss" scoped>
.start {
    height: 100vh;
}

.hero-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.logotype {
    text-decoration: none;
    color: #fff;
    &__source {
        font-size: 5em;
        font-family: 'Pacifico';
    }
}

.server-error {
    position: absolute;
    z-index: 1;
    color: $warning;
    font-weight: 300;
    letter-spacing: 1px;
    background-color: rgba(#fff, 0.2);
    border-radius: 20em;
    padding: 1em 2em;
    bottom: -90px;
}
</style>
