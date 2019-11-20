import moment from 'moment';
import localForage from 'localforage'
import {getBacklogStoryIds} from './stories'
import { StoryWorkItem } from './StoryWorkItemTypes'

const workItemsUrl = 'https://dev.azure.com/xyz/Project%20Name/_apis/wit/wiql?api-version=4.1&fields=System.Id,System.State';




export default function getPulledStoriesIds(date: string) {
    const asOfDate = moment(date).format("YYYY-MM-DD")

    const fetchInit = {
        method: 'POST',
        body: `{ "query": 
        "Select [System.Id], [Backlog Priority] FROM WorkItems 
        WHERE [System.TeamProject] = 'Project Name' 
        AND [System.WorkItemType] = 'Product Backlog Item' 
        AND ([System.State] = 'Committed' OR [System.State] = 'Done')
        ASOF '${asOfDate}'" }`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Insert creds here, not prod safe!!',
        }
    }
    const storageKey = `PulledStoriesIDs-${asOfDate}`
    return localForage.getItem(storageKey)
    .then((result) => {
        
        if(result) {
            return result
        }
         else 
        {
            return fetch(workItemsUrl, fetchInit)
            .then(function (response) {
                const json = response.json();
                return json;
            })
            .then(function (json) {
                const workItemArray: Array<number> = [];
                json.workItems.forEach((workItem: StoryWorkItem) => {
                    workItemArray.push(workItem.id)
                });
                console.log(`${workItemArray.length} WorkItems were returned`);
                return workItemArray;
            })
            .then((pulledWorkItems) => {
                const pulledStoriesData: PulledStoryData = {
                    'date': asOfDate,
                    'pulledStories': pulledWorkItems
                }
                return localForage.setItem(storageKey, pulledStoriesData)
            })
        }
    })
   
}

export function getPulledStoryCountsByWeek(startDate: Date) {
    const startDateMoment = moment(startDate)
    const today = moment()
    const duration = moment.duration(today.diff(startDateMoment))
    const days = Math.floor(duration.asDays())

    let promiseArray = []
    for (let i=0;i<days;i+=7){
        const weekStartDate = moment(startDate).add(i,'days');
        const weekEndDate = moment(startDate).add(i+7,'days');
        const weekStart = weekStartDate.format("YYYY-MM-DD")
        const weekEnd = weekEndDate.format("YYYY-MM-DD")
        
        promiseArray.push(getPulledStoriesBetweenDates(weekStart, weekEnd))
    }
    return Promise.all(promiseArray)
    .then((results) => {
       const sortedResults = results.sort((a,b) => {
            const aDate = moment(a.date)
            const bDate = moment(b.date)
            if (aDate.isBefore(bDate)){
                return -1
            }
            if (bDate.isBefore(aDate)) {
                return 1
            }
            return 0
        })
        return sortedResults
    })
}

export function getPulledStoriesBetweenDates(startDate: string, endDate: string) {
       let pulledStories: Array<number> = []
       let backlogStories: Array<number> = []
       return getPulledStoriesIds(endDate)
       .then((pulledStoryIds ) => {
            const data = pulledStoryIds as PulledStoryData 
            pulledStories = data.pulledStories
       })
       .then(() => {
           return getBacklogStoryIds(startDate)
       })
       .then(backlogIds => {
           backlogStories = backlogIds
       })
       .then(() => {
          return findElementsCommonToArrays(pulledStories, backlogStories)
       })
       .then((ids) => {
        return {
            'date': endDate,
            'storyIds': ids
        }
       })
}

export function findElementsCommonToArrays(arr1: Array<number>, arr2: Array<number>) {
    let commonIds: Array<number> = []
    arr1.forEach((id: number) => {
        if (arr2.indexOf(id) !== -1 ) {
            commonIds.push(id)
        }
    })
    return commonIds
}

interface PulledStoryData {
    'date': string,
    'pulledStories': Array<number>
}