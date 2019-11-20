import moment from 'moment'
import { StatePeriod, FullWorkItemHistoryApiData } from './WorkItemHistoryTypes';


const formatStatePeriodsForTimeline = (periods: Array<StatePeriod>, workItemId: number, groupNum: number, workItemTitle: string) => {
    const formattedPeriods = periods.map((period, i) => {
        let formatted = {} as formattedPeriod
        formatted.id = workItemId + ((i + 1) / 1000)
        formatted.group = groupNum
        formatted.workItemState = period.workItemState

        formatted.start_time = moment(period.periodStart)

        formatted.end_time = moment(period.periodEnd)
        formatted.workItemTitle = workItemTitle

        return formatted
    })
    return formattedPeriods
}

const createGroupItemForTimeline = (workItem: FullWorkItemHistoryApiData, id: number) => {
    const title = workItem.value[0].id
    return {
        id, 
        title
    }
}

const groupFromWorkItemHistories = (histories: Array<FullWorkItemHistoryApiData>, ids:Array<number>) => {
    return ids.map((id, i) => {
        return createGroupItemForTimeline(histories[i], id)
    })
}

const sortWorkItemArrayByCommittedDates = (statePeriodsArray: Array<StatePeriod>) => {
    return statePeriodsArray
}

export {formatStatePeriodsForTimeline, createGroupItemForTimeline, sortWorkItemArrayByCommittedDates, groupFromWorkItemHistories}

interface formattedPeriod {
    id: number,
    group: number,
    workItemState: string,
    start_time: moment.Moment,
    end_time: moment.Moment,
    workItemTitle: string
}