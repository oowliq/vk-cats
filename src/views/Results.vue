<template lang="pug">
    .results
        .results-card
            .results-card__header
                .user-avatar
                    img(:src="userInfo.avatar").user-avatar__source
                .user-data
                    span.user-data__user-id {{ userInfo.id }}
                    span.user-data__user-name {{ userInfo.firstName }}  {{ userInfo.lastName }}
            .results-card__body
                highcharts(:options="charts" v-if="this.userAnalysis")
        router-link.go-back(:to={name: 'start'}) Закончить шпионаж

</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'results',

    mounted() {
        this.charts.series[0].data = this.userAnalysis;
    },

    data() {
        return {
            charts: {
                chart: {
                    backgroundColor: 'rgba(255, 255, 255, 0.0)',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                },

                credits: {
                    enabled: false,
                },

                title: {
                    text: '',
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                },

                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                textOutline: false,
                            },
                        },
                    },
                },

                series: [
                    {
                        name: 'Интересы',
                        colorByPoint: true,
                        data: [],
                    },
                ],
            },
        };
    },

    computed: {
        ...mapState('results', ['userInfo', 'userAnalysis']),
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

    &__source {
        height: 100px;
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
