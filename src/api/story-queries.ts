import moment, { Moment } from 'moment';
import {findElementsCommonToArrays} from './pull-stories'
import { StoryWorkItem } from './StoryWorkItemTypes'

const workItemsUrl = `https://xyz.visualstudio.com/Project%20Name/_apis/wit/wiql?api-version=1.0`
const headers = {
'Content-Type': 'application/json',
'Authorization': 'Insert creds here, not prod safe!!',
}
const boardColumnStatusName = 'WEF_ABCDEFGHI_Kanban.Column'

//Find all the stories, as of a date, that are commited which were created more than 2 weeks ago


export function getStoriesForIteration(periodStartDate: Date, periodEndDate: Date) {

    let date2WeeksPriorToSprint = moment(periodStartDate).subtract(14,'days').format("YYYY-MM-DD")

    let query = `
    {
        "query": 
        "Select [System.Id], [System.Title], [System.State] 
        From WorkItems 
        WHERE [System.TeamProject] = 'Project Name'         
        AND [System.WorkItemType] = 'Product Backlog Item' 
        Where [System.CreatedDate] < '${date2WeeksPriorToSprint}' 
            AND [System.State] = 'Committed' 
            AND [Microsoft.VSTS.Common.StateChangeDate] >= '${periodStartDate}' 
        order by [Microsoft.VSTS.Common.Priority] asc, 
            [System.CreatedDate] desc 
        ASOF '${periodEndDate}'"
    } `

    const fetchInit = {
    method: 'POST',
    body: query,
    headers: headers
    }

    return fetch(workItemsUrl, fetchInit)
    .then(function (response ) {
        const json = response.json();
        return json;
    })
    .then(getWorkItemIdsFromResponse)
}

  
export function getNonCompletedStoriesOnDate(date: Date) {
    const queryDate = moment(date).format('YYYY-MM-DD')
    const query = `
    {"query": "
    Select [System.Id]         
    FROM WorkItems         
    WHERE [System.TeamProject] = 'Project Name'         
    AND [System.WorkItemType] = 'Product Backlog Item'         
    AND ([System.State] = 'New' OR [System.State] = 'Approved' OR [System.State] = 'Committed')        
    AND [WEF_ABCDEFGHI_Kanban.Column] != '5. Ready for Environments Team'       
    ASOF '${queryDate}'"
    }`

    const fetchInit = {
        method: 'POST',
        body: query,
        headers: headers
    }
    return fetch(workItemsUrl, fetchInit)
    .then((response ) => {
        const json = response.json();
        return json;
    })
}


export function getReadyStoriesOnDate(date: Date) {
    const queryDate = moment(date).format('YYYY-MM-DD')
    let query = `
    {"query": "Select [System.Id] 
        FROM WorkItems 
        WHERE [System.TeamProject] = 'Project Name'         
        AND [System.WorkItemType] = 'Product Backlog Item' 
        AND ([System.State] = 'New' OR [System.State] = 'Approved' OR [System.State] = 'Committed') 
        AND [WEF_ABCDEFGHI_Kanban.Column] = '5. Ready for Environments Team'
        ASOF '${queryDate}' "
        } `

    const fetchInit = {
        method: 'POST',
        body: query,
        headers: headers
    }
    return fetch(workItemsUrl, fetchInit)
    .then(function (response ) {
        const json = response.json();
        return json;
    })
}

export function countCompletedStories(date: Moment) {
    const asOfDate = moment(date).format("YYYY-MM-DD")
    const auth = {
        headers: {
            'Authorization': 'Insert creds here, not prod safe!!',
        }
    }
    const fetchInit = {
        method: 'POST',
        body: `{ "query": 
        "Select [System.Id], [Backlog Priority] FROM WorkItems 
        WHERE [System.TeamProject] = 'Project Name' 
        AND [System.WorkItemType] = 'Product Backlog Item' 
        AND ([System.State] = 'Done' OR
            [${boardColumnStatusName}] = '5. Ready for Environments Team' OR
            [${boardColumnStatusName}] = '6. Deployed to Staging'
        )
        ORDER BY [Backlog Priority] asc ASOF '${asOfDate}'" }`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Insert creds here, not prod safe!!',
        }
    }

    return fetch(workItemsUrl, fetchInit)
    .then((response) => {
        const json = response.json();
        return json;
    })
    .then((json) => {
        return {
            date: asOfDate,
            completedStories: json.workItems.length
        }
    })            

}

// Get work finished in period

export function getStoriesMovedToReadyInWeek(year: string, weekNum: string) {
    const week = moment(`${year}-W${weekNum}`)
    const startOfWeek = week.startOf('isoWeek').toDate()
    const endOfWeek = week.endOf('isoWeek').toDate() 
    
    return Promise.all([
        getNonCompletedStoriesOnDate(startOfWeek),
        getReadyStoriesOnDate(endOfWeek)
    ])
    .then((results) => {
       const notReadyAtStart = getWorkItemIdsFromResponse(results[0])
        const readyAtEnd = getWorkItemIdsFromResponse(results[1])
        const changedToReadyThisWeek = findElementsCommonToArrays(notReadyAtStart, readyAtEnd)
        return changedToReadyThisWeek
    })
}

export function getWeeklyStoryCompletionRate() {
    const startDate = '2018-03-05' // There is not much data prior to this date.
    const startDateMoment = moment(startDate)
    const today = moment()
    const duration = moment.duration(today.diff(startDateMoment))
    const days = Math.floor(duration.asDays())
    let completedStoriesCountPromiseArray = []      
    
    for (let i=0;i<days;i+=7){
        const newDate = moment(startDate).add(i,'days');
        completedStoriesCountPromiseArray.push(countCompletedStories(newDate))
    }
    return Promise.all(completedStoriesCountPromiseArray)
}

export const getStoriesModifiedRecently = () => {
    
    const thirtyDaysAgo = moment().startOf('day').subtract(30, 'days').format('YYYY-MM-DD')

    const auth = {
        headers: {
            'Authorization': 'Insert creds here, not prod safe!!',
        }
    }
    const fetchInit = {
        method: 'POST',
        body: `{ "query": 
        "
        Select [System.Id], [Backlog Priority] FROM WorkItems 
        WHERE [System.TeamProject] = 'Project Name' 
        AND [System.WorkItemType] = 'Product Backlog Item' 
        AND (
                [System.ChangedDate] >= '${thirtyDaysAgo}'
            )
        ORDER BY [Backlog Priority] asc
        " }`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Insert creds here, not prod safe!!',
        }
    }
    return fetch(workItemsUrl, fetchInit)
    .then(function (response ) {
        const json = response.json();
        return json;
    })
}

export const getStoriesFromQuarter = () => {
    const auth = {
        headers: {
            'Authorization': 'Insert creds here, not prod safe!!',
        }
    }
    const fetchInit = {
        method: 'POST',
        body: `{ "query": 
        "
        Select [System.Id], [System.Title], [System.State] 
        From WorkItems 
        Where 
        [System.TeamProject] = 'Project Name' 
        AND [System.WorkItemType] = 'Product Backlog Item' 
        AND ( [System.IterationLevel3] Contains '2018 Q4'
                OR
                [System.IterationLevel3] Contains '2018 Q3'
                OR
                [System.IterationLevel3] Contains '2019 Q1'
                OR
                [System.IterationLevel3] Contains '2019 Q1'
                OR
                [System.IterationLevel3] Contains '2019 Q2'
                OR
                [System.IterationLevel3] Contains '2019 Q3'
                OR
                [System.IterationLevel3] Contains '2019 Q4'
            )
        ORDER BY [System.IterationLevel4] asc
        " }`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Insert creds here, not prod safe!!',
        }
    }
    return fetch(workItemsUrl, fetchInit)
    .then(function (response ) {
        const json = response.json();
        return json;
    })
}

export function getWorkItemIdsFromResponse(json: any) {
    let ids: number[]  = []
    json.workItems.forEach((workItem: StoryWorkItem) => {
        ids.push(workItem.id)
    })
    return ids
}


