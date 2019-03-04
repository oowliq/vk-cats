export default {
    state: {
        cats: [],
        timeToKillCats: 0,
        killCatsTimer: null,
    },

    mutations: {
        ADD_CATS(state) {
            state.cats = [];
            for (let i = 0; i < 10; i += 1) {
                state.cats.push({ alive: true });
            }
        },

        KILL_CAT(state, { cat }) {
            state.cats[cat].alive = false;
        },

        START_TIMER(state) {
            state.timeToKillCats = 0;

            state.killCatsTimer = setInterval(() => {
                state.timeToKillCats += 1;
            }, 1000);
        },

        STOP_TIMER(state) {
            clearInterval(state.killCatsTimer);
            state.killCatsTimer = null;
        },
    },

    actions: {
        KILL_CAT({ commit, state, getters }, cat) {
            commit('KILL_CAT', cat);

            if (!state.killCatsTimer) {
                commit('START_TIMER');
            }

            if (!getters.aliveCats) {
                commit('STOP_TIMER');
            }
        },

        ADD_CATS({ commit }) {
            commit('ADD_CATS');
        },
    },
    getters: {
        aliveCats(state) {
            let aliveCats = 0;

            // eslint-disable-next-line no-restricted-syntax
            for (const cat of state.cats) {
                if (cat.alive) aliveCats += 1;
            }

            return aliveCats;
        },
    },
};
