import moment from 'moment'
import * as itemHistory from './item-history';
import {workItem} from './__mocks__/workItemHistoryIncomplete' 
import * as mockStatePeriods from './__mocks__/workItemStatePeriods'


describe(`Work Item History Date`, () => {
    test(`I'm looking at the right thing is an array`, () => {
        expect(itemHistory.getHistory(workItem) instanceof Array).toBe(true)
        expect(itemHistory.getHistory(workItem).length).toBe(37)
    })
    
    test(`I can get the creation date`, () => {
        const date = new Date('2018-05-01T11:25:15.593Z')
        expect(itemHistory.getItemCreatedDate(workItem)).toEqual(date)
    })

    it(`Returns the id of the workItem from the workItemHistory`, () => {
        expect(itemHistory.getIdFromWorkItemHistory(workItem)).toEqual(39608)
    })
})

describe(`Work Item History`, () => {
    test(`Can get state and time from each revision`, () => {
        expect(itemHistory.getIterationStateTimes(workItem) instanceof Array).toBe(true)

        const exampleStateTime = {
            'System.State': 'New',
            'System.ChangedDate': '2018-05-01T11:25:15.593Z',
            "System.BoardColumn": "1. New"
        }
        expect(itemHistory.getIterationStateTimes(workItem)[0]).toEqual(exampleStateTime)
        
        const exampleStateTime2 = {
            'System.State': 'Committed',
            'System.ChangedDate': '2018-11-23T14:56:52.393Z',
            "System.BoardColumn": "5. Ready for Environments Team"
        }
        expect(itemHistory.getIterationStateTimes(workItem)[36]).toEqual(exampleStateTime2)
    })
})

describe(`Work Item Committed Date`, () => {
    it('Returns an Array', () => {
        expect(itemHistory.getCommittedDates(workItem) instanceof Array).toBe(true)
    })    
    it('Gets the dates for when a work item was set to committed', () => {
        expect(itemHistory.getCommittedDates(workItem)).toEqual(['2018-11-14T11:50:50.84Z', '2018-11-23T14:56:52.393Z'])
    })    
})

describe(`Work Item all state and board changes`, () => {
    it(`Returns an array`, () => {
        expect(itemHistory.getStateChangesAndTimes(workItem) instanceof Array).toBe(true)
    })

    test(`Gets the Approved Date`, () => {
        const approvedTime = {
            'System.State': 'Approved',
            'System.ChangedDate': '2018-10-12T09:04:45.28Z',
            "System.BoardColumn": '3. Approved'
        }
        expect(itemHistory.getStateChangesAndTimes(workItem)[1]).toEqual(approvedTime)    
    })   
    
    it(`Gets multiple state changes`, () => {
        expect(itemHistory.getStateChangesAndTimes(workItem).length).toEqual(5)
    })   
    it(`Gets the right dates for changes`, () => {
        const approvedTimeStamp = '2018-10-12T09:04:45.28Z'
        expect(itemHistory.getStateChangesAndTimes(workItem)[1]['System.ChangedDate']).toEqual(approvedTimeStamp)
    })
})

describe(`Working out the periods for each state`, () => {
    it(`Returns an array`, () => {
        expect(itemHistory.getStatePeriods(workItem) instanceof Array).toBe(true)
    })
    it(`Returns an array of the right length`, () => {
        expect(itemHistory.getStatePeriods(workItem).length).toEqual(5)
    })
    it(`Gets the correct end date of the penultimate period`, () => {
        const endOfPenultimatePeriod = '2018-11-23T14:56:52.393Z'
        expect(itemHistory.getStatePeriods(workItem)[3].periodEnd).toEqual(endOfPenultimatePeriod)
    })
    it(`Sets the last period to end today`, () => {
        const endOfToday = moment().endOf('day').toISOString()
        expect(itemHistory.getStatePeriods(workItem)[4].periodEnd).toEqual(endOfToday)
    })
    it(`Gets the correct start date of the last period`, () => {
        const startOfCurrentPeriod = '2018-11-23T14:56:52.393Z'
        const periods = itemHistory.getStatePeriods(workItem)
        expect(periods[4].periodStart).toEqual(startOfCurrentPeriod)
    })
    it(`Gets the state of the first period`, () => {
        expect(itemHistory.getStatePeriods(workItem)[0].workItemState).toEqual('New')
    })
    it(`Gets the state of the current period`, () => {
        const  result = itemHistory.getStatePeriods(workItem)
        expect(result[4].workItemState).toEqual('Ready')
    })
    it(`Returns all the correct facts for a given workItem`, () => {
        const endOfToday = moment().endOf('day').toISOString()
        const expectedResult = [
            {
              "periodEnd": "2018-10-12T09:04:45.28Z",
              "periodStart": "2018-05-01T11:25:15.593Z",
              "workItemState": "New",
            },
             {
              "periodEnd": "2018-11-14T11:50:50.84Z",
              "periodStart": "2018-10-12T09:04:45.28Z",
              "workItemState": "Approved",
            },
            {
              "periodEnd": "2018-11-21T15:37:21.407Z",
              "periodStart": "2018-11-14T11:50:50.84Z",
              "workItemState": "Committed",
            },
            { 
              "periodEnd": "2018-11-23T14:56:52.393Z",
              "periodStart": "2018-11-21T15:37:21.407Z",
              "workItemState": "Approved",
            },
            { 
              "periodEnd": endOfToday,
              "periodStart": "2018-11-23T14:56:52.393Z",
              "workItemState": "Ready",
            },
          ]
        const  result = itemHistory.getStatePeriods(workItem)
        expect(result).toEqual(expectedResult)
    })

})



describe(`Getting dates of specific states`, () => {
    const expectedCommittedDate = "2018-11-14T11:50:50.84Z"
    expect(itemHistory.getFirstCommittedDateOfWorkItem(workItem)).toEqual(expectedCommittedDate)
})

describe(`Finding the committed dates from the state periods of a workItem`, () => {
    const statePeriods = mockStatePeriods.workItem1StatePeriods
    it(`Returns a date object`, () => {
        expect(itemHistory.getFirstCommittedPeriodFromStatePeriods(statePeriods) instanceof Date).toBeTruthy()
    })
    it(`Returns the right committed date from a set of statePeriods`, () => {
        const expectedFirstCommittedDate = new Date("2018-10-14T11:50:50.84Z")
        expect(itemHistory.getFirstCommittedPeriodFromStatePeriods(statePeriods)).toEqual(expectedFirstCommittedDate)
    })
})

//// Data init below this line

