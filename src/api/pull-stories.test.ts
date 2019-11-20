import * as pullStories from './pull-stories'

test('Finds common elements in simple arrays', () => {
    const arr1 = [1,2,3,4]
    const arr2 = [3,4,5,6]
    expect(pullStories.findElementsCommonToArrays(arr1, arr2)).toEqual([3,4])
})