const actions = {

}

const mutations = {
    ADDRECORD(state, operation) {
        state.records.push(operation)
    }
}

const state = {
    records: []
}

export default {
    namespaced: true,
    actions,
    mutations,
    state
}