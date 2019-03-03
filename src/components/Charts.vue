<template lang="pug">
    .charts
        highcharts(:options="charts" v-if="this.userAnalysis.length")
        p.no-data(v-else) Нет данных
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'charts',

    data() {
        return {
            charts: {
                chart: {
                    backgroundColor: 'rgba(255, 255, 255, 0.0)',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    allowPointSelect: true,
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
        ...mapState('results', ['userAnalysis']),
    },

    mounted() {
        this.charts.series[0].data = this.userAnalysis;
    },
    watch: {
        userAnalysis() {
            this.charts.series[0].data = this.userAnalysis;
        },
    },
};
</script>

<style lang="scss" scoped>
.no-data {
    display: block;
    width: 100%;
    text-align: center;
    color: $error;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1px;
}
</style>
