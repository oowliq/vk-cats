<template lang="pug">
    .search(ref="search")
        input.search__field(type="text",
        placeholder="Ссылка на профиль или ID",
        v-model="searchQuery"
        @keyup.enter="search")

        input.search__submit(type="submit"
        :value="fetching ? 'Поиск...' :'Найти...' "
        :disabled="!isValid || fetching"
        @click.prevent="search")
</template>

<script>
import { TweenMax, Power2 } from 'gsap/TweenMax';

export default {
    name: 'search',

    props: {
        fetching: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            searchQuery: '',
        };
    },

    computed: {
        isValid() {
            return !!this.searchQuery.length;
        },
    },

    methods: {
        genLinks() {
            let profileLink;
            let profileName;

            if (this.searchQuery.indexOf('/') === -1) {
                profileLink = `https://vk.com/${this.searchQuery}`;
                profileName = this.searchQuery;
            } else {
                profileLink = this.searchQuery;
                const slashIndex = this.searchQuery.lastIndexOf('/') + 1;
                profileName = this.searchQuery.slice(slashIndex, profileLink.length);
            }

            return { profileLink, profileName };
        },

        search() {
            if (!this.isValid) return;
            this.$emit('search', this.genLinks());
        },

        searchAnimation() {
            const { search } = this.$refs;
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
    },

    mounted() {
        this.searchAnimation();
    },
};
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 100px;
    @media (max-width: 660px) {
        flex-direction: column;
        justify-content: space-between;
        height: 140px;
    }
    &__field {
        @extend .clean-input;
        background-color: $white;
        margin-right: 20px;
        padding: 1em 2em;
        width: 400px;
        border-radius: 4px;
        text-align: center;
        transition: all 0.2s ease-in-out;
        @media (max-width: 660px) {
            width: 300px;
        }
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
</style>
