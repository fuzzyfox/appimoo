import Vue from 'vue'
import uniqBy from 'lodash/uniqBy'
import sortBy from 'lodash/sortBy'

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
  deviationById: state => deviationid => _findDeviationById(state, deviationid),
  deviationsByTagName: state => tagName =>
    state.deviations.filter(
      deviation =>
        deviation.tags && deviation.tags.find(tag => tag.tag_name === tagName)
    ),
  deviationsByArtist: state => artist =>
    state.deviations.filter(({ author }) => author.userid === artist.userid),
  tags: state => [
    ...new Set(
      state.deviations
        .filter(({ tags }) => tags)
        .reduce(
          (prev, { tags }) => prev.concat(tags.map(tag => tag.tag_name)),
          []
        )
    )
  ],
  artists: state =>
    sortBy(
      uniqBy(state.deviations.map(({ author }) => author), 'userid'),
      user => user.username.toLowerCase()
    )
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
  },
  loadDeviationMetadata({ commit }, { deviationid, deviationids = [] }) {
    if (deviationid) {
      deviationids = [deviationid, ...deviationids].slice(0, 50)
    }

    return Vue.http
      .get('deviation/metadata', {
        params: {
          deviationids
        }
      })
      .then(response => response.json())
      .then(({ metadata: deviations }) => {
        deviations.forEach(deviation =>
          commit(mutationType.DEVIATION_UPDATE, { deviation })
        )
        return deviations
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
