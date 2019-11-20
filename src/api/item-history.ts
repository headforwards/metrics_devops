

import _ from 'lodash'
import moment, { Moment } from 'moment'

import { FullWorkItemHistoryApiData, WorkItemChange, Change, StatePeriod } from './WorkItemHistoryTypes';

export const fetchWorkItemHistory = (workItemId: number) => {
    const workItemHistoryUrl = `https://xyz.visualstudio.com/Project%20Name/_apis/wit/workitems/${workItemId}/revisions`
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Insert creds here, not prod safe!!',
    }
    const fetchInit = {
        method: 'GET',
        headers: headers
    } 
    return fetch(workItemHistoryUrl, fetchInit)
    .then((response) => {
        return response.json()
    })
}

export const fetchMultipleWorkItemHistories = (workItemsIds: Array<number>) => {
    let promiseArray: Array<Promise<FullWorkItemHistoryApiData>> = []
    workItemsIds.forEach(id => {
        promiseArray.push(fetchWorkItemHistory(id))
    })
    return Promise.all(promiseArray)
}

export function getHistory(workItem: FullWorkItemHistoryApiData) {
    let history: Array<WorkItemChange> = []
    if (_.has(workItem, 'value') && _.isArray(workItem.value)) {
        history = workItem.value
    }
    return history
}

export function getItemCreatedDate(workItem: FullWorkItemHistoryApiData) {
    const history = getHistory(workItem)
    let iteration = 1

    for (let i = 0; i < history.length; i++) {
        if (_.get(history[i], `fields["System.Reason"]`) === `New backlog item`) {
            iteration = i
            break
        }
    }

    const dateString = _.get(history[iteration],`fields['System.CreatedDate']`, null)
    const date = new Date(dateString)
    return date
}

export const getIdFromWorkItemHistory = (history: FullWorkItemHistoryApiData) => {
    return history.value[0].id
}

export function getIterationStateTimes(workItem: FullWorkItemHistoryApiData) {
    //@ts-ignore
    const history : Array<WorkItemChange> = getHistory(workItem)
    const changesAndTimes = history.map((iteration) => {
            let returnObj = {} as Change 
            returnObj['System.State'] = iteration.fields['System.State']
            returnObj['System.ChangedDate'] = iteration.fields['System.ChangedDate']
            returnObj['System.BoardColumn'] = iteration.fields['System.BoardColumn']
            return returnObj
        }
    )
    return changesAndTimes
}

export function getCommittedDates(workItem: FullWorkItemHistoryApiData) {
    const iterations = getIterationStateTimes(workItem)
    let commitedDates: Array <string> = []
    iterations.forEach((element: Change, index: number) => {
        if(element['System.State'] === 'Committed' && iterations[index-1]['System.State'] !== 'Committed') {
            commitedDates.push(element['System.ChangedDate'])
        }
    });
    return commitedDates
}

export function getFirstCommittedDateOfWorkItem(workItem: FullWorkItemHistoryApiData) {
    const committedDates = getCommittedDates(workItem)
    return committedDates[0]
}

function isCommitted(statePeriod: StatePeriod) {
    return statePeriod.workItemState === 'Committed'
}

export const getFirstCommittedPeriodFromStatePeriods = (statePeriods: Array<StatePeriod>) => {
    //@ts-ignore
    const firstCommittedDateString =statePeriods.find(isCommitted).periodStart
    
    return new Date(firstCommittedDateString)
}

export function getStateChangesAndTimes(workItem: FullWorkItemHistoryApiData) {
    const history = getHistory(workItem)
    let changesAndDates: Array<Change> = []
    for (let i=0; i<history.length; i++) {
        let change = {} as Change
        const fields = history[i].fields;
        change['System.State'] = fields['System.State']
        change['System.ChangedDate'] = fields['System.ChangedDate']
        change['System.BoardColumn'] = fields['System.BoardColumn']

        if (i===0) {
            changesAndDates.push(change)
        }
        else if (
            (i > 0 && fields['System.State'] !== history[i-1].fields['System.State'])
        || 
            ( i > 0 && fields['System.BoardColumn'] !== history[i-1].fields['System.BoardColumn'] )
        ) {
            changesAndDates.push(change)
        }
    }
    return changesAndDates
}

const stateFromStateAndColumn = (state: string, column: string) => {
    let newState: string = state
    if (column && column.indexOf('Ready') !== -1 && state === 'Committed') {
        newState = 'Ready'
    } 
    return newState
}

export const getStatePeriods = (workItem: FullWorkItemHistoryApiData) => {
    let statePeriods: Array<StatePeriod> = []
    const stateChanges = getStateChangesAndTimes(workItem)

    for (let i=0; i<stateChanges.length; i++) {
        const periodState = stateFromStateAndColumn(stateChanges[i]['System.State'], stateChanges[i]['System.BoardColumn'] )

        const periodStart = stateChanges[i]['System.ChangedDate']
        let periodEnd
    
        //@ts-ignore
        if (i !== stateChanges.length-1 || (periodState !== 'Done' || periodState !== 'Removed')) {

            if (i === stateChanges.length-1 ) {
                periodEnd = moment().endOf('day').toISOString()
            } else {
                periodEnd = stateChanges[i+1]['System.ChangedDate']
            }

            statePeriods.push({
                workItemState: periodState,
                periodStart: periodStart,
                periodEnd: periodEnd
            })
        }
    }
    return statePeriods
}

export const getItemTitle = (workItemHistory: FullWorkItemHistoryApiData) => {
    return workItemHistory.value.slice(-1)[0].fields["System.Title"]
}

export const getStatePeriodsData = (history: FullWorkItemHistoryApiData) => {
    return {
        id: getIdFromWorkItemHistory(history),
        statePeriods: getStatePeriods(history),
        workItemTitle: getItemTitle(history)
    }
}
