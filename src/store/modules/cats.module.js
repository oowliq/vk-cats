export default {
    state: {
        cats: [],
    },

    mutations: {
        ADD_CATS(state) {
            state.cats = [];
            for (let i = 0; i < 10; i++) {
                state.cats.push({ alive: true });
            }
        },

        KILL_CAT(state, { cat }) {
            state.cats[cat].alive = false;
        },
    },

    actions: {},
    getters: {
        aliveCats(state) {
            let aliveCats = 0;

            // eslint-disable-next-line no-restricted-syntax
            for (const cat of state.cats) {
                if (cat.alive) aliveCats++;
            }

            return aliveCats;
        },
    },
};
