type StorageListType<F extends string> = Array<Record<F, string> & Record<string, any>>

type HasFnParam<F extends string> = Record<F, any>

type GetFnParam<F extends string> = Record<F, any> & {
  field: string
}

type SetFnParam<F extends string> = Record<F, any> & {
  field: string
  value: any
}

export type EntityStorageOptions<F extends string> = {
  /**
   * Key to store data in local storage. Should be as unique as possible.
   */
  localStorageKey: string

  /**
   * Field there the entity id is stored.
   * @exmpale 'id' or 'userId'
   */
  keyField: F
}

/**
 * superstructure over the localStorage to store some data
 * depending on the
 */
export class EntityStorage<KeyField extends string> {
  private localStorageKey: string
  private keyField: KeyField

  /**
   *
   * @param param0
   */
  constructor({ localStorageKey, keyField }: EntityStorageOptions<KeyField>) {
    this.localStorageKey = localStorageKey
    this.keyField = keyField
  }

  hasRecord(data: HasFnParam<KeyField>) {
    const list: StorageListType<KeyField> = JSON.parse(localStorage.getItem(this.localStorageKey)!) || []

    return list.some(item => item[this.keyField] === data[this.keyField])
  }

  getField<T = any>(data: GetFnParam<KeyField>): T | null {
    const list: StorageListType<KeyField> = JSON.parse(localStorage.getItem(this.localStorageKey)!) || []

    const item = list.find(item => item[this.keyField] === data[this.keyField])
    return item ? item[data.field] : null
  }

  setField(data: SetFnParam<KeyField>) {
    const list: StorageListType<KeyField> = JSON.parse(localStorage.getItem(this.localStorageKey)!) || []
    const existingIndex = list.findIndex(item => item[this.keyField] === data[this.keyField])

    if (existingIndex > -1) {
      // @ts-ignore
      list[existingIndex][data.field] = data.value
    }
    else {
      // @ts-ignore
      list.push({
        [this.keyField]: data[this.keyField],
        [data.field]: data.value,
      })
    }

    localStorage.setItem(this.localStorageKey, JSON.stringify(list))
  }

  clear() {
    localStorage.removeItem(this.localStorageKey)
  }
}
