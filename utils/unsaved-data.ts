import { i18n } from '@/locales/i18n'

export const isUnsavedDataRoute = ref(false)

/**
 * utility to prevent leaving the page if there are unsaved changes
 * @param checkFn function that returns true if there are unsaved changes
 */
export const useUnsavedData = (checkFn: () => boolean, params?: { onLeave?: () => void }) => {
  const confirmLeaveMessage = i18n.t('unsavedData.confirmLeaveMessage')

  isUnsavedDataRoute.value = true

  onScopeDispose(() => {
    isUnsavedDataRoute.value = false
  })

  useEventListener(window, 'beforeunload', (event: BeforeUnloadEvent) => {
    if (checkFn()) {
      event.returnValue = confirmLeaveMessage
      return confirmLeaveMessage
    }
  })

  onBeforeRouteLeave((to, from, next) => {
    const hasUnsaved = checkFn()
    if (!hasUnsaved) {
      if (params?.onLeave) params.onLeave()
      next()
      return
    }

    // eslint-disable-next-line no-alert
    if (confirm(confirmLeaveMessage)) {
      if (params?.onLeave) params.onLeave()
      next()
    }
    else {
      next(false)
    }
  })
}
