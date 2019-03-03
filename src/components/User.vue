<template lang="pug">
    .user(@mouseover="userHovered = true" @mouseleave="userHovered = false")
        .user__avatar
            img(:src="user.avatar").user__avatar__source
        .user__data
            span.user__data__user-id {{ user.id }}
            span.user__data__user-name {{ user.firstName }}  {{ user.lastName }}
        slide-y-up-transition(v-if="userHovered")
            a.user__tooltip(:href="`https://vk.com/id${user.id}`") Перейти на страницу
</template>

<script>
import { SlideYUpTransition } from 'vue2-transitions';

export default {
    name: 'user',
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    components: {
        SlideYUpTransition,
    },
    data() {
        return {
            userHovered: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.user {
    position: relative;
    display: flex;
    align-items: center;

    &__avatar {
        border-radius: 20em;
        overflow: hidden;
        width: 100px;
        height: 100px;

        &__source {
            width: 100px;
            border-radius: 20em;
        }
    }

    &__data {
        display: flex;
        flex-direction: column;
        margin-left: 20px;

        &__user-name {
            font-size: 20px;
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

    &__tooltip {
        position: absolute;
        right: 0;
        top: 80px;
        color: $warning;
        font-weight: 300;
        font-size: 12px;
        letter-spacing: 1px;
        background-color: rgba(#000, 0.05);
        border-radius: 20em;
        text-decoration: none;
        padding: 1em 2em;
        margin-top: 20px;
        transition: all 0.2s ease-in-out;
        &:hover {
            background-color: rgba(#000, 0.08);
        }
        &:active {
            background-color: rgba(#000, 0.02);
        }
    }
}
</style>
