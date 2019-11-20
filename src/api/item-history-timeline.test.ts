import {workItem} from './__mocks__/workItemHistoryIncomplete'
import * as mockStatePeriods from './__mocks__/workItemStatePeriods'
import * as itemHistoryTimeline from './item-history-timeline'
import * as itemHistory from './item-history'
import moment from 'moment'
import { FullWorkItemHistoryApiData } from './WorkItemHistoryTypes';

describe(`Converting data about state periods into format for react-calendar-timeline`, () => {
    const examplePeriods = itemHistory.getStatePeriods(workItem)
    const workItemId = 12345
    const formattedPeriods = itemHistoryTimeline.formatStatePeriodsForTimeline(examplePeriods, workItemId, 674, 'title')
    
    
    it(`Returns an array`, () => {
       expect(itemHistoryTimeline.formatStatePeriodsForTimeline(examplePeriods, workItemId, 674, 'title') instanceof Array).toBe(true)
    })
    it(`Returns the correct number of formatted periods`, () => {
        expect(itemHistoryTimeline.formatStatePeriodsForTimeline(examplePeriods, workItemId, 674, 'title').length).toBe(5)
    })
    it(`Uses the work item ID as the basis for the period IDs`, () => {
        expect(formattedPeriods[0].id).toBe(12345.001)
        expect(formattedPeriods[1].id).toBe(12345.002)
    })
    it(`Uses the passed in GroupNum integer as the 'group' parameter `, () => {
        expect(formattedPeriods[0].group).toBe(674)
        expect(formattedPeriods[4].group).toBe(674)
    })
    it(`Labels the state correctly`, () => {
        expect(formattedPeriods[0].workItemState).toBe('New')
        expect(formattedPeriods[1].workItemState).toBe('Approved')
        expect(formattedPeriods[2].workItemState).toBe('Committed')
        expect(formattedPeriods[3].workItemState).toBe('Approved')
        expect(formattedPeriods[4].workItemState).toBe('Ready')        
    })
    it(`Returns an object with a start_time property`, () => {
        expect(formattedPeriods[0].start_time).toBeDefined()
    })
    it(`Formats the period start time as a moment object`, () => {
        expect(moment.isMoment(formattedPeriods[0].start_time)).toBe(true)
    })
    it(`Formats the period end time as a moment object`, () => {
        expect(moment.isMoment(formattedPeriods[0].end_time)).toBeTruthy()
    })
    it(`Creates a moment object for start_time with the correct time data`, () => {
        const momentStartTime  = moment('2018-05-01T11:25:15.593Z')
        expect(formattedPeriods[0].start_time).toEqual(momentStartTime)
    })
    it(`Creates a moment object for end_time with the correct time data`, () => {
        const momentEndTime = moment('2018-10-12T09:04:45.28Z')
        expect(formattedPeriods[0].end_time).toEqual(momentEndTime)
    })
    it(`Has the right date and time for periods that have not ended yet (i.e. the end of today)`, () => {
        const endOfTodayString = moment().endOf('day').toISOString()
        expect(formattedPeriods[4].end_time.toISOString()).toEqual(endOfTodayString)
    })
})

//expected format
/*
{
    id: 1,
    group: 1,
    workItemState: 'New',
    start_time: moment('2018-12-20'),
    end_time: moment('2018-12-21'),
    },
*/

describe(`Creating a single 'group' object, formatted for the timeline component`, () => {
    it(`Has an Id`, () => {
        expect(itemHistoryTimeline.createGroupItemForTimeline(workItem, 1234)).toHaveProperty('id')
    })
    it(`Uses the id that was passed in`, () => {
        expect(itemHistoryTimeline.createGroupItemForTimeline(workItem, 123)).toHaveProperty('id', 123)
    })
    it(`Uses the workItem Id as the title`, () => {
        expect(itemHistoryTimeline.createGroupItemForTimeline(workItem, 123)).toHaveProperty('title', 39608)
    })
})

describe(`Creating a list of group objects, a group if you will`, () => {
    let workItemHistories: Array<FullWorkItemHistoryApiData> = []
    for (let i = 0; i < 3; i++) {
        workItemHistories.push(workItem)
    }

    it(`Returns an array`, () => {
        expect(Array.isArray(itemHistoryTimeline.groupFromWorkItemHistories(workItemHistories, [123,456,789]))).toBeTruthy()
    })
    it(`Returns an array of timeline group item objects`, () => {
        expect(itemHistoryTimeline.groupFromWorkItemHistories(workItemHistories, [987,654,321])[0]).toHaveProperty('id', 987)
        expect(itemHistoryTimeline.groupFromWorkItemHistories(workItemHistories, [987,654,321])[0]).toHaveProperty('title', 39608)
    })
})

// describe(`Sorting an Array of workItem stateHistories by the date they were committed`, () => {
    // const arrayOfStatePeriods = mockStatePeriods.workItemStatePeriodArray
    // it(`Returns an array`, () => {
    //     expect(Array.isArray(itemHistoryTimeline.sortWorkItemArrayByCommittedDates(arrayOfStatePeriods))).toBeTruthy()
    // })
    // it(`Returns an array that contains state period data`, () => {
    //     const aSingleStatePeriod = mockStatePeriods.workItem2StatePeriods
    //     expect(itemHistoryTimeline.sortWorkItemArrayByCommittedDates(arrayOfStatePeriods)).toContain(aSingleStatePeriod)
    // })
    // it(`Returns the earliest committed item as the first item in the array`, () => {
    //     const earliestCommittedWorkItem = mockStatePeriods.workItem1StatePeriods
    //     expect(itemHistoryTimeline.sortWorkItemArrayByCommittedDates(arrayOfStatePeriods)[0]).toEqual(earliestCommittedWorkItem)
    // })
// })

