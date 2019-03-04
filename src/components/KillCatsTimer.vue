<template lang="pug">
    .kill-cats-timer
        .cats-counter(ref="catsCounter")
            p.cats-counter__alive-cats(v-if="aliveCats")
                | Лопнуто
                span.cats-counter__alive-cats__count  {{ getBurstCats }}
                |  котиков
                span.cats-counter__alive-cats__time(v-if="killCatsTimer")  за
                    span.cats-counter__alive-cats__time__timer  {{ timeToKillCats }}
                    |  секунд
            p.cats-counter__dead-cats(v-else)
                |   Ты лопнул всех котиков за {{ timeToKillCats }} секунд 😫
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { TweenMax, Power2 } from 'gsap/TweenMax';

export default {
    name: 'kill-cats-timer',
    computed: {
        ...mapState('cats', ['killCatsTimer', 'timeToKillCats']),

        ...mapGetters({
            aliveCats: 'cats/aliveCats',
        }),

        getBurstCats() {
            return 10 - this.aliveCats;
        },
    },

    methods: {
        catsCounterAnimation() {
            const { catsCounter } = this.$refs;

            TweenMax.fromTo(
                catsCounter,
                1,
                {
                    css: {
                        left: '-100px',
                        opacity: 0,
                    },
                    ease: Power2.easeInOut,
                },
                {
                    css: {
                        left: '40px',
                        opacity: 1,
                    },
                    ease: Power2.easeInOut,
                },
            ).delay(2);
        },
    },

    mounted() {
        this.catsCounterAnimation();
    },
};
</script>

<style lang="scss" scoped>
.cats-counter {
    &__alive-cats {
        font-weight: 300;
        letter-spacing: 1px;
        color: #ffffff;
        &__count {
            color: $warning;
        }

        &__time {
            &__timer {
                color: $warning;
            }
        }
    }

    &__dead-cats {
        color: $error;
        font-weight: 300;
        letter-spacing: 1px;
    }
}

.cats-kill-timer {
    font-weight: 300;
    letter-spacing: 1px;
    color: #ffffff;
    &__timer {
        color: $warning;
    }
}
</style>
