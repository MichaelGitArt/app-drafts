import { describe, expect, it } from 'vitest'

import { EntityStorage } from './entityStorage'

describe('test entityStorage', () => {
  it('test work', () => {
    const userStorage = new EntityStorage({
      localStorageKey: 'USER_STORAGE',
      keyField: 'userId',
    })

    userStorage.setField({
      field: 'name',
      userId: 1,
      value: 'John',
    })

    expect(userStorage.getField({ field: 'name', userId: 1 })).toBe('John')

    userStorage.setField({
      field: 'name',
      userId: 1,
      value: 'Jane',
    })

    expect(userStorage.getField({ field: 'name', userId: 1 })).toBe('Jane')

    expect(userStorage.hasRecord({ userId: 2 })).toBe(false)

    userStorage.setField({
      field: 'name',
      userId: 2,
      value: 'John',
    })

    expect(userStorage.hasRecord({ userId: 2 })).toBe(true)

    expect(userStorage.getField({ field: 'name', userId: 2 })).toBe('John')
    expect(userStorage.getField({ field: 'name', userId: 1 })).toBe('Jane')

    userStorage.clear()

    expect(userStorage.getField({ field: 'name', userId: 2 })).toBe(null)
  })
})
