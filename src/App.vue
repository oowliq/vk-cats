<template lang="pug">
  #app
    slide-y-up-transition(v-if="!aliveCats")
        .pay-respect
            span.pay-respect__label
                | Press
                span  F
                |  to pay respect

    .cats-counter(ref="catsCounter")
        p.cats-counter__alive-cats(v-if="aliveCats")
            | В живых осталось
            span.cats-counter__alive-cats__count  {{ aliveCats }}
            |  котиков
        p.cats-counter__dead-cats(v-else) Ты убил всех котиков

    ul.cats
        li.cats__cat(@click.self="destroyCat(index)",
        v-for="(cat, index) in cats",
        :key="index",
        :class="{dead: !cat.alive}"
        :ref="`cat-${index}`")
    router-view#view
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { TweenMax, Power2 } from 'gsap/TweenMax';
import { SlideYUpTransition } from 'vue2-transitions';

export default {
    name: 'App',

    components: { SlideYUpTransition },

    computed: {
        ...mapState('cats', ['cats']),
        ...mapGetters({
            aliveCats: 'cats/aliveCats',
        }),
    },

    methods: {
        ...mapMutations({
            addCats: 'cats/ADD_CATS',
            killCat: 'cats/KILL_CAT',
        }),

        destroyCatAnimation(cat) {
            const ref = this.$refs[`cat-${cat}`];
            TweenMax.to(ref, 1, {
                onComplete: () => {
                    this.killCat({ cat });
                    TweenMax.set(ref, { clearProps: 'all' });
                },
                css: {
                    width: 0,
                    height: 0,
                    backgroundColor: '#f7b731',
                },
                ease: Power2.easeInOut,
            });
        },

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

        destroyCat(cat) {
            this.destroyCatAnimation(cat);
        },
    },

    mounted() {
        this.addCats();
        this.catsCounterAnimation();

        window.addEventListener('keyup', (event) => {
            if (event.keyCode === 70) {
                if (!this.aliveCats) this.addCats();
            }
        });
    },
};
</script>


<style lang="scss">
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

.cats-counter {
    z-index: 2;
    position: fixed;
    left: 40px;
    top: 20px;
    &__alive-cats {
        font-weight: 300;
        letter-spacing: 1px;
        color: #ffffff;
        &__count {
            color: $warning;
        }
    }

    &__dead-cats {
        color: $error;
        font-weight: 300;
        letter-spacing: 1px;
    }
}

.cats {
    background: $accent;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(#000, 0.4);
    }

    &__cat {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        background-image: url('./assets/cat.png');
        background-position: 0 0;
        background-size: cover;
        animation: animate 25s linear infinite;
        bottom: -150px;
        z-index: 2;

        &:hover {
            cursor: pointer;
        }

        & {
            &:nth-child(1) {
                left: 25%;
                width: 80px;
                height: 80px;
                animation-delay: 0s;
            }
            &:nth-child(2) {
                left: 10%;
                width: 20px;
                height: 20px;
                animation-delay: 2s;
                animation-duration: 12s;
            }
            &:nth-child(3) {
                left: 70%;
                width: 20px;
                height: 20px;
                animation-delay: 4s;
            }
            &:nth-child(4) {
                left: 40%;
                width: 60px;
                height: 60px;
                animation-delay: 0s;
                animation-duration: 18s;
            }
            &:nth-child(5) {
                left: 65%;
                width: 20px;
                height: 20px;
                animation-delay: 0s;
            }
            &:nth-child(6) {
                left: 75%;
                width: 110px;
                height: 110px;
                animation-delay: 3s;
            }
            &:nth-child(7) {
                left: 35%;
                width: 150px;
                height: 150px;
                animation-delay: 7s;
            }
            &:nth-child(8) {
                left: 50%;
                width: 25px;
                height: 25px;
                animation-delay: 15s;
                animation-duration: 45s;
            }
            &:nth-child(9) {
                left: 20%;
                width: 15px;
                height: 15px;
                animation-delay: 2s;
                animation-duration: 35s;
            }
            &:nth-child(10) {
                left: 85%;
                width: 150px;
                height: 150px;
                animation-delay: 0s;
                animation-duration: 11s;
            }
        }

        &.dead {
            display: none;
        }
    }
}

@keyframes animate {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }
}

#view {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
}
</style>
