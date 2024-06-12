import { findDragedItemPosition } from '../runtime/utils'

describe('findDragedItemPosition', () => {
  it('should return null if no any changes', () => {
    expect(findDragedItemPosition([1, 2, 3, 4], [1, 2, 3, 4])).toEqual(null)
  })

  it('should return null if the count of prev and current is changed', () => {
    expect(findDragedItemPosition([1, 2, 3, 4], [1, 2, 3])).toEqual(null)
  })

  it('should return null if inputs are empty array', () => {
    expect(findDragedItemPosition([], [])).toEqual(null)
  })

  it('should return from index and to index if inputs are valid', () => {
    expect(findDragedItemPosition([1, 2, 3, 4], [1, 4, 2, 3])).toEqual({ from: 3, to: 1 })
    expect(findDragedItemPosition([1, 2, 3, 4], [1, 3, 4, 2])).toEqual({ from: 1, to: 3 })
    expect(findDragedItemPosition([1, 2, 3, 4, 5], [1, 2, 3, 5, 4])).toEqual({ from: 3, to: 4 })
    expect(findDragedItemPosition([1, 2], [2, 1])).toEqual({ from: 0, to: 1 })
  })
})
