<script lang="ts" setup>
import { inject } from 'vue'

import {
  errorLogger,
  gitartDialogInjectionFallback,
  gitartDialogInjectionKey,
} from './constants'

const {
  dialogs,
  removeDialog,
} = inject(gitartDialogInjectionKey, gitartDialogInjectionFallback)

// inject returned default value, so plugin is not installed
if (dialogs === gitartDialogInjectionFallback.dialogs) {
  errorLogger.pluginIsNotInitialized()
}

const onClose = (index: number) => {
  removeDialog(index)
}
</script>

<template>
  <Component
    :is="dialog.component"
    v-for="(dialog, index) in dialogs"
    :key="dialog.id"
    v-bind="dialog.props"
    @update:model-value="onClose(index)"
  />
</template>
