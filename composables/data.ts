import type { ComputedRef } from 'vue'

import { computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useAsyncState } from '@vueuse/core'

/**
 * Filters out disabled items from a list. Return a computed ref.
 * @returns computed ref of filtered list
 */
export const useNoDisabled = <T extends object & { disabled?: boolean | undefined }>(fn: () => T[]): ComputedRef<T[]> => {
  return computed(() => {
    return fn().filter(item => item.disabled !== true)
  })
}

/**
 * Refreshes data on route update
 * @param fn refresh function
 */
export const useRefreshOnRouteUpdate = (fn: () => Promise<any>) => {
  const { execute } = useAsyncState(() => fn(), null)

  onBeforeRouteUpdate(async(to, from, next) => {
    await execute()
    next()
  })
}
