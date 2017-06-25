import storage from 'store'

import { CLEAR_ALL_DATA, SYNC_STORAGE } from '@/store/mutation-types'

export const STORAGE_KEY = process.env.APP_NAME
export const SYNCED_NAMESPACES = ['auth', 'folders', 'deviations']

export const localStoragePlugin = store => {
  const storageContents = storage.get(STORAGE_KEY)
  if (storageContents) {
    store.commit(SYNC_STORAGE, storageContents)
  }

  store.subscribe((mutation, state) => {
    let syncedState = {}

    SYNCED_NAMESPACES.forEach(namespace => {
      syncedState[namespace] = state[namespace]
    })

    storage.set(STORAGE_KEY, syncedState)

    if (mutation.type === CLEAR_ALL_DATA) {
      storage.remove(STORAGE_KEY)
    }
  })
}

export default localStoragePlugin
