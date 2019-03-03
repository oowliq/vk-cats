import http from '@/helpers/http';

export default {
    state: {
        fetchedUser: false,
        fetching: false,
        userInfo: {},
        userAnalysis: [],
    },
    mutations: {
        CHANGE_USER_INFO(state, userInfo) {
            const newInfo = {};
            newInfo.id = userInfo.id;
            newInfo.firstName = userInfo.first_name;
            newInfo.lastName = userInfo.last_name;
            newInfo.isClosed = userInfo.is_closed;
            newInfo.canAccessClosed = userInfo.can_access_closed;
            newInfo.avatar = userInfo.photo_200_orig;
            state.userInfo = newInfo;
        },

        CHANGE_USER_STATS(state, userStats) {
            const userAnalysis = [];

            // eslint-disable-next-line no-restricted-syntax
            for (const stat of userStats) {
                const splitted = stat.split('|');
                // eslint-disable-next-line prefer-destructuring
                userAnalysis.push({
                    name: splitted[0],
                    y: parseFloat(splitted[1], 10),
                });
            }

            state.userAnalysis = userAnalysis;
        },

        FETCHING(state, payload) {
            state.fetching = payload;
            if (payload) state.fetchedUser = true;
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
    getters: {
        fetchedUser(state) {
            return state.fetchedUser;
        },

        userAnalysis(state) {
            return state.userAnalysis;
        },

        userInfo(state) {
            return state.userInfo;
        },
    },
};
