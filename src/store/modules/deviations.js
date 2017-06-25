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
  [mutationType.DEVIATION_UPDATE](state, { deviation }) {
    const oldData = state.deviations.find(
      existing => existing.deviationid === deviation.deviationid
    )
    if (oldData) {
      Object.assign(oldData, deviation)
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
        commit(mutationType.DEVIAION_INSERT, {
          deviation: {
            ...deviation,
            download: deviation.download || null
          }
        })
        return deviation
      })
  },
  loadDeviationDownload({ commit }, { deviationid }) {
    return Vue.http
      .get(`deviation/download/${deviationid}`)
      .then(response => response.json())
      .then(download => {
        commit(mutationType.DEVIATION_UPDATE, {
          deviation: { deviationid, download }
        })
        return download
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
