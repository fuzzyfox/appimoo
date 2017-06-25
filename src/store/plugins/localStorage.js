import storage from 'store'

import { CLEAR_ALL_DATA, SYNC_STORAGE } from '@/store/mutation-types'

export const STOREAGE_KEY = process.env.APP_NAME
export const SYNCED_NAMESPACES = ['auth', 'folders', 'deviations']

export const localStoragePlugin = store => {
  const storageContents = storage.get(STOREAGE_KEY)
  if (storageContents) {
    store.commit(SYNC_STORAGE, storageContents)
  }

  store.subscribe((mutation, state) => {
    let syncedState = {}

    SYNCED_NAMESPACES.forEach(namespace => {
      syncedState[namespace] = state[namespace]
    })

    storage.set(STOREAGE_KEY, syncedState)

    if (mutation.type === CLEAR_ALL_DATA) {
      storage.remove(STOREAGE_KEY)
    }
  })
}

export default localStoragePlugin
