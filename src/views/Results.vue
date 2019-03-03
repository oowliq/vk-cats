<template lang="pug">
    .results
        slide-y-up-transition(mode="out-in" v-if="!fetching")
            .results-card
                .results-card__header
                    .user-avatar
                        img(:src="userInfo.avatar").user-avatar__source
                    .user-data
                        span.user-data__user-id {{ userInfo.id }}
                        span.user-data__user-name {{ userInfo.firstName }}  {{ userInfo.lastName }}
                .results-card__body
                    charts
        router-link.go-back(:to={name: 'start'} v-if="!fetching") На главную

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { SlideYUpTransition } from 'vue2-transitions';

import Charts from '@/components/Charts.vue';

export default {
    name: 'results',
    components: { Charts, SlideYUpTransition },
    data() {
        return {
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
    },

    mounted() {
        if (!this.results) {
            const profileName = this.$route.params.id;
            const profileLink = `https://vk.com/${profileName}`;
            this.getUserInfo({ profileName })
                .then(({ data }) => {
                    this.getUserStats({ profileLink }).then(() => {
                        this.fetching = false;
                    });
                })
                .catch(() => {
                    this.$router.push({ name: 'start' });
                });
        }
    },
};
</script>

<style lang="scss" scoped>
.results {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.results-card {
    background-color: #edeef0;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.041), 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    width: 60vw;
    padding: 2em;
    display: flex;
    flex-direction: column;

    &__header {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__body {
        margin-top: 40px;
    }
}

.user-avatar {
    border-radius: 20em;
    overflow: hidden;
    width: 100px;
    height: 100px;

    &__source {
        width: 100px;
        border-radius: 20em;
    }
}

.user-data {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    &__user-name {
        font-size: 25px;
        font-weight: 300;
        letter-spacing: 1px;
    }
    &__user-id {
        font-weight: 600;
        color: $accent;
        margin-bottom: 10px;
        letter-spacing: 2px;
        font-size: 14px;
        &::before {
            content: 'ID: ';
        }
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
    padding: 1em 2em;
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
