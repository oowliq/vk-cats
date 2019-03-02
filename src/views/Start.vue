<template lang="pug">
    .start
        .hero-wrapper(ref="heroWrapper")
            router-link.logotype(to="/")
                span.logotype__source Papo
            .search_wrapper
                .search(ref="search")
                    input.search__field(type="text",
                    placeholder="Ссылка на профиль",
                    v-model="searchQuery"
                    @keyup.enter="search")

                    input.search__submit(type="submit"
                    :value="fetching ? 'Поиск...' :'Найти...' "
                    :disabled="!isValid || fetching"
                    @click.prevent="search")

            slide-y-up-transition(v-if="serverError")
                p.server-error Профиль пользователя скрыт
</template>

<script>
import { TweenMax, Power2 } from 'gsap/TweenMax';
import { mapState, mapActions } from 'vuex';
import { SlideYUpTransition } from 'vue2-transitions';

export default {
    name: 'start',

    components: {
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
        isValid() {
            const URL_REGEXP = new RegExp(/https?:\/\/(www\.)?vk\.com/i);
            return URL_REGEXP.test(this.searchQuery);
        },
    },

    methods: {
        ...mapActions({
            getUserInfo: 'results/GET_USER_INFO',
            getUserStats: 'results/GET_USER_STATS',
        }),

        search() {
            if (!this.isValid) return;
            const profileLink = this.searchQuery;
            const slashIndex = this.searchQuery.lastIndexOf('/') + 1;
            const profileName = this.searchQuery.slice(slashIndex, profileLink.length);
            this.serverError = false;

            this.getUserInfo({ profileName }).then(({ data }) => {
                if (!data[0].is_closed) {
                    this.getUserStats({ profileLink }).then(() => {
                        this.$router.push({ name: 'results' });
                    });
                } else {
                    this.serverError = true;
                }
            });
        },
    },

    mounted() {
        const { heroWrapper, search } = this.$refs;

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

        TweenMax.fromTo(
            search,
            1,
            {
                css: {
                    opacity: 0,
                },
                ease: Power2.easeInOut,
            },
            {
                css: {
                    opacity: 1,
                },
                ease: Power2.easeInOut,
            },
        ).delay(2);
    },
};
</script>

<style lang="scss" scoped>
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
        font-size: 8vw;
        font-family: 'Pacifico';
    }
}

.search {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &__field {
        @extend .clean-input;
        background-color: $white;
        margin-right: 20px;
        padding: 1em 2em;
        width: 30vw;
        border-radius: 4px;
        text-align: center;
        &:focus {
            &::placeholder {
                color: transparent;
            }
        }

        &::placeholder {
            font-weight: 300;
            letter-spacing: 1px;
            text-align: left;
        }
    }
    &__submit {
        @extend .clean-input;
        background-color: $white;
        padding: 1em 3em;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.041), 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        font-size: 14px;
        border-radius: 4px;
        font-weight: 600;
        letter-spacing: 1px;
        color: $accent;
        &:disabled {
            background-color: $dark;
            cursor: not-allowed;
        }
    }

    &_wrapper {
        margin-top: 100px;
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