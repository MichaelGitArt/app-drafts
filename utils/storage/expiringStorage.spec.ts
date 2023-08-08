import { describe, expect, it } from 'vitest'

import { expiringStorage } from './expiringStorage'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('test expiringStorage', () => {
  it('test work', async() => {
    expiringStorage.setItem('test', 'test', 1000)
    expect(expiringStorage.getItem('test')).toBe('test')
    await wait(500)
    expect(expiringStorage.getItem('test')).toBe('test')

    await wait(1100)

    expect(expiringStorage.getItem('test')).toBe(null)
  })
})
