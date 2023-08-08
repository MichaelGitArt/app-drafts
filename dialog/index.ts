import RDialogSpawn from './RDialogSpawn.vue'

import {
  gitartDialogPlugin,
} from './plugin'

import {
  gitartDialogInjectionKey,
} from './constants'

export {
  gitartDialogPlugin,
  RDialogSpawn,
  gitartDialogInjectionKey,
}

export {
  useRConfirmDialog,
  useRDialog,
  useDialogConfirm,
  useDialogReturnData,
} from './composables'

export type {
  IRDialog,
  IRDialogItem,
} from './types'
