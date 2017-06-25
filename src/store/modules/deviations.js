import Vue from 'vue'
import * as mutationType from '@/store/mutation-types'

export const initState = () => {
  return {
    deviations: []
  }
}

const state = initState()

const _findDeviationById = (state, deviationid) => {
  return state.deviations.find(
    deviation => deviation.deviationid === deviationid
  )
}

const mutations = {
  [mutationType.DEVIAIONS_INSERT](state, { deviations = [] }) {
    deviations
      .filter(({ deviationid }) => !_findDeviationById(state, deviationid))
      .forEach(deviation => state.deviations.push(deviation))
  },
  [mutationType.DEVIAION_INSERT](state, { deviation }) {
    if (!_findDeviationById(state, deviation.deviationid)) {
      state.deviations.push(deviation)
    }
  },
  [mutationType.DEVIAIONS_CLEAR](state) {
    Object.assign(state, initState())
  }
}

const getters = {
  deviationById: state => deviationid => _findDeviationById(state, deviationid)
}

const actions = {
  loadDeviation({ commit }, { deviationid }) {
    return Vue.http
      .get(`deviation/${deviationid}`)
      .then(response => response.json())
      .then(deviation => {
        commit(mutationType.DEVIAION_INSERT, { deviation })
        return deviation
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
