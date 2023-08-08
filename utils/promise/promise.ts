import type { DebounceSettings } from 'lodash-es'

import debounce from 'lodash-es/debounce'

/**
 * Let's you debounce a promise returning function.
 * @param func - ptoimise function to debounce
 * @param debounceDelay - delay in ms
 * @param options - lodash debounce options
 * @returns Promise that resolves to the result of the function or 'skipped' if the function was debounced
 *
 * @example
 * const getSomeData = debouncePromise(async (id: string) => {
 *  const response = await fetch(`https://example.com/api/${id}`)
 *  return response.json()
 * }, 500)
 *
 * getSomeData('123').then((data) => {
 *  if(data === 'skipped') return
 *  alert(data)
 * })
 *
 * getSomeData('123').then((data) => {
 *  if(data === 'skipped') return
 *  alert(data)
 * })
 *
 * Alert will only be shown once, because the second call was debounced
 */
export function debouncePromise<A, B>(func: (a: A) => Promise<B>, debounceDelay?: number, options?: DebounceSettings): (a: A) => Promise<B | 'skipped'> {
  const promiseResolverRef: { current: (b: B | 'skipped') => void } = {
    current: () => {},
  }

  const debouncedFunc = debounce((a: A) => {
    const promiseResolverSnapshot = promiseResolverRef.current
    func(a).then((b) => {
      if (promiseResolverSnapshot === promiseResolverRef.current) {
        promiseResolverRef.current(b)
      }
    })
  }, debounceDelay, options)

  return (a: A) => new Promise<B | 'skipped'>((resolve) => {
    promiseResolverRef.current('skipped')
    promiseResolverRef.current = resolve

    debouncedFunc(a)
  })
}
