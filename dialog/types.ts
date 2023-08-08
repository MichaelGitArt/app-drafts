import type {
  ComponentPublicInstance, InjectionKey,
  ShallowUnwrapRef,
} from 'vue'

export interface IRDialogItem {
  component: ShallowUnwrapRef<{ new (): ComponentPublicInstance }>
  id: number
  props: {
    modelValue: boolean
  }
  onRemoveHook?: () => void
}

type DialogAddMethod = <
  T extends { new (): ComponentPublicInstance },
  P = Omit<InstanceType<T>['$props'], 'modelValue' | 'confirm'>
>(
  component: T,
  props: P,
  params?: {
    onRemoveHook?: () => void
  }) => void

type DialogRemoveMethod = (
  index: number,
  closeDelay?: number
) => void

interface IRDialogMethods {
  /**
   * method for adding dialog
   *
   * add first generic type for component to make props type safe. Otherwise, you can pass any props
   * without any type checking.
   *
   * `addDialog<typeof CloneSequenceDialog>(CloneSequenceDialog, ...)`
   *
   * @example
   * const $dialog = useRDialog()
   * // ..
   * $dialog.addDialog<typeof CloneSequenceDialog>(CloneSequenceDialog, {
   *  sequences,
   * })
   */
  addDialog: DialogAddMethod

  removeDialog: DialogRemoveMethod
}

// Interface Gitart Dialog
export interface IRDialog extends IRDialogMethods {
  dialogs: IRDialogItem[]
}

export type IGitartDialogInjectionKey = InjectionKey<IRDialog>
