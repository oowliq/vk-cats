import http from '@/helpers/http';

export default {
    state: {
        fetching: false,

        userInfo: {
            id: 'Неизвестно',
            firstName: 'Неизвестно',
            lastName: 'Неизвестно',
            isClosed: false,
            canAccessClosed: false,
            avatar: 'https://openclipart.org/image/2400px/svg_to_png/177394/1366695174.png',
        },
        userAnalysis: [],
    },
    mutations: {
        CHANGE_USER_INFO(state, userInfo) {
            state.userInfo.id = userInfo.id;
            state.userInfo.firstName = userInfo.first_name;
            state.userInfo.lastName = userInfo.last_name;
            state.userInfo.isClosed = userInfo.is_closed;
            state.userInfo.canAccessClosed = userInfo.can_access_closed;
            state.userInfo.avatar = userInfo.photo_200_orig;
        },

        CHANGE_USER_STATS(state, userStats) {
            const userAnalysis = {};

            // eslint-disable-next-line no-restricted-syntax
            for (const stat of userStats) {
                const splitted = stat.split('|');
                // eslint-disable-next-line prefer-destructuring
                userAnalysis[splitted[0]] = parseFloat(splitted[1], 10);
            }

            state.userAnalysis = userAnalysis;
        },

        FETCHING(state, payload) {
            state.fetching = payload;
        },
    },
    actions: {
        GET_USER_INFO({ commit }, { profileName }) {
            commit('FETCHING', true);
            return new Promise((resolve, reject) => {
                http.get('/user', {
                    params: {
                        a: profileName,
                    },
                })
                    .then((response) => {
                        commit('FETCHING', false);
                        commit('CHANGE_USER_INFO', response.data[0]);
                        resolve(response);
                    })
                    .catch((error) => {
                        commit('FETCHING', false);
                        reject(error);
                    });
            });
        },

        GET_USER_STATS({ commit }, { profileLink }) {
            return new Promise((resolve, reject) => {
                commit('FETCHING', true);
                http.get('/', {
                    params: {
                        a: profileLink,
                    },
                })
                    .then((response) => {
                        commit('FETCHING', false);
                        commit('CHANGE_USER_STATS', response.data);
                        resolve(response);
                    })
                    .catch((error) => {
                        commit('FETCHING', false);
                        reject(error);
                    });
            });
        },
    },
    getters: {},
};
