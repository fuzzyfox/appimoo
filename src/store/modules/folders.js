import Vue from 'vue'
import * as mutationType from '@/store/mutation-types'

export const initState = () => {
  return {
    folders: [],
    isFoldersLoading: false
  }
}

const _normaliseIndex = (haystack, index, id, key = 'id') => {
  if (!id || index !== -1) {
    return index
  }

  return haystack.findIndex(item => item[key] === id)
}

const state = initState()

export const mutations = {
  [mutationType.START_LOADING](state) {
    state.isFoldersLoading = true
  },
  [mutationType.STOP_LOADING](state) {
    state.isFoldersLoading = false
  },
  [mutationType.FOLDER_START_LOADING](state, { folderid, index }) {
    if (!folderid && typeof index !== 'number') {
      return
    }

    index = _normaliseIndex(state.folders, index, folderid, 'folderid')
    const folder = state.folders[index]
    if (folder) {
      folder.isLoading = true
    }
  },
  [mutationType.FOLDER_STOP_LOADING](state, { folderid, index }) {
    if (!folderid && typeof index !== 'number') {
      return
    }

    index = _normaliseIndex(state.folders, index, folderid, 'folderid')
    const folder = state.folders[index]
    if (folder) {
      folder.isLoading = false
    }
  },
  [mutationType.FOLDERS_INSERT](state, { folders = [], index = -1 }) {
    state.folders.splice(index, 0, ...folders)
  },
  [mutationType.FOLDER_INSERT](state, { folder, index = -1 }) {
    state.folders.splice(index, 0, folder)
  },
  [mutationType.FOLDER_UPDATE](
    state,
    { folderid = null, index = -1, folder = {} }
  ) {
    index = _normaliseIndex(state.folders, index, folderid, 'folderid')

    if (index !== -1) {
      const oldData = state.folders[index]
      const newData = Object.assign(oldData, folder)

      state.folders.splice(index, 1, newData)
    }
  },
  [mutationType.FOLDER_DELETE](state, { folderid = null, index = -1 }) {
    index = _normaliseIndex(state.folders, index, folderid, 'folderid')

    if (index !== -1) {
      state.folders.splice(index, 1)
    }
  },
  [mutationType.FOLDERS_CLEAR](state) {
    Object.assign(state, initState())
  }
}

const getters = {
  folderById: state => folderid => {
    return state.folders.find(folder => folder.folderid === folderid)
  }
}

const actions = {
  loadFolderDeviations(context, { folderid, params = {} }) {
    const { commit, dispatch, getters } = context
    params = Object.assign(
      {
        username: 'Minimalistic-Animoo',
        offset: 0,
        limit: 20,
        mode: 'newest'
      },
      params
    )

    const folder = getters.folderById(folderid)

    if (!folder) {
      return Promise.reject(new ReferenceError('Folder not found'))
    }

    const setFolderLoading = !folder.isLoading

    if (setFolderLoading) {
      commit(mutationType.FOLDER_START_LOADING, { folderid })
    }

    return Vue.http
      .get(`gallery/${folderid}`, { params })
      .then(response => response.json())
      .then(data => {
        const deviations = data.results || []
        const deviationIds = deviations.map(({ deviationid }) => deviationid)

        commit(mutationType.FOLDER_UPDATE, {
          folderid,
          folder: {
            ...folder,
            deviations: params.offset
              ? folder.deviations.concat(deviationIds)
              : deviationIds
          }
        })

        commit(mutationType.DEVIAIONS_INSERT, { deviations })

        if (data.has_more) {
          return dispatch('loadFolderDeviations', {
            folderid,
            params: { offset: params.offset + data.results.length }
          })
        }

        if (setFolderLoading) {
          commit(mutationType.FOLDER_STOP_LOADING, { folderid })
        }
      })
  },
  loadFolders({ state, commit }, params = {}) {
    params = Object.assign(
      {
        username: 'Minimalistic-Animoo',
        offset: 0,
        limit: 50,
        calculate_size: true,
        ext_preload: true
      },
      params
    )

    const setLoading = !state.isLoading
    if (setLoading) {
      commit(mutationType.START_LOADING)
    }

    return Vue.http
      .get('gallery/folders', { params })
      .then(response => response.json())
      .then(data => {
        commit(mutationType.FOLDERS_INSERT, {
          folders: data.results.map(folder => {
            folder.deviations = folder.deviations || []

            commit(mutationType.DEVIAIONS_INSERT, {
              deviations: folder.deviations
            })

            return {
              ...folder,
              isLoading: false,
              deviations:
                folder.deviations.map(({ deviationid }) => deviationid) || []
            }
          })
        })

        if (setLoading) {
          commit(mutationType.STOP_LOADING)
        }

        return data
      })
  },
  loadAllFolders({ state, commit, dispatch }, params = {}) {
    params = Object.assign(
      {
        username: 'Minimalistic-Animoo',
        offset: 0,
        limit: 50,
        calculate_size: true
      },
      params
    )

    if (state.folders.length && !params.offset) {
      commit(mutationType.FOLDERS_CLEAR)
    }

    return new Promise((resolve, reject) => {
      dispatch('loadFolders', params).then(
        data =>
          data.has_more
            ? dispatch('loadAllFolders', {
                offset: params.offset + data.results.length
              })
            : data,
        reject
      )
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
