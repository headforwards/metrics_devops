import moment, { Moment } from 'moment';
import localForage from 'localforage'
import * as tagFunctions from './tags' 
import { StoryWorkItem, StoryBacklog, BacklogStatistics } from './StoryWorkItemTypes'


const workItemsUrl = 'https://dev.azure.com/xyz/Project%20Name/_apis/wit/wiql?api-version=4.1&fields=System.Id,System.State';

function getBacklogItems(asOfDate: string) {
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
        AND ([System.State] = 'New' OR [System.State] = 'Approved')
        ORDER BY [Backlog Priority] asc ASOF '${asOfDate}'" }`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Insert creds here, not prod safe!!',
        }
    }
    const storageKey = `Stories-${asOfDate}`
    return localForage.getItem(storageKey)
    .then((result) => {
        if(result) {
            return result
        } else {
            return fetch(workItemsUrl, fetchInit)
            .then(function (response) {
                const json = response.json();
                return json;
            })
            .then(function (json) {
                const workItemArray: Array<any> = [];
                json.workItems.forEach((workItem: StoryWorkItem) => {
                    workItemArray.push(workItem.id)
                });
                console.log(`${workItemArray.length} WorkItems were returned`);
                return workItemArray;
            })
            .then(function (workItemArray) {
                return fetch(`https://xyz.visualstudio.com/Project%20Name/_apis/wit/workitems?ids=${workItemArray}&$expand=all&asOf=${asOfDate}T00:00:00.000Z`, auth)
            })
            .then(function (response) {
                const json = response.json()
                return json;
            })
            .then(function (json) {
                const hydratedWorkItemArray = json.value;
                const sortedWorkItemArray = hydratedWorkItemArray.sort(function (a: StoryWorkItem, b: StoryWorkItem) {
                    if (a.fields["Microsoft.VSTS.Common.BacklogPriority"] < b.fields["Microsoft.VSTS.Common.BacklogPriority"]) {
                        return -1;
                    }
                    if (a.fields["Microsoft.VSTS.Common.BacklogPriority"] > b.fields["Microsoft.VSTS.Common.BacklogPriority"]) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                });
    
                let smallerWorkItemArray: Array<StoryWorkItem> = []
                sortedWorkItemArray.forEach(function(workItem: StoryWorkItem){
                    smallerWorkItemArray.push(extractUsefulFieldsFromStory(workItem))
                })
                return smallerWorkItemArray;
            })
            .then((smallerWorkItemArray) => {
                const backlog = {
                    'date': asOfDate,
                    'backlogData': smallerWorkItemArray
                }
                return localForage.setItem(storageKey, backlog)
            })
        }
    })
}

export function getBacklogStoryIds(asOfDate: string) {
    const fetchInit = {
        method: 'POST',
        body: `{ "query": 
        "Select [System.Id], [Backlog Priority] FROM WorkItems 
        WHERE [System.TeamProject] = 'Project Name' 
        AND [System.WorkItemType] = 'Product Backlog Item' 
        AND ([System.State] = 'New' OR [System.State] = 'Approved')
        ORDER BY [Backlog Priority] asc ASOF '${asOfDate}'" }`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Insert creds here, not prod safe!!',
        }
    }  

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
}


export function extractUsefulFieldsFromStory(story: StoryWorkItem) {
    const newSmallerStory = {}
    const smallerStory = {
        'id': story.id,
        'relations': story.relations,
        'fields': {
            'System.BoardColumn': story.fields["System.BoardColumn"],
            'System.CreatedDate': story.fields["System.CreatedDate"],
            'System.State': story.fields["System.State"],
            'System.Tags': story.fields["System.Tags"],
            'System.Title': story.fields["System.Title"],
            'System.WorkItemType': story.fields["System.WorkItemType"],
            'Microsoft.VSTS.Common.BacklogPriority': story.fields["Microsoft.VSTS.Common.BacklogPriority"],
        }
    }
    return smallerStory
}

export function getStoryKeysFromLocalForage() {
    return localForage.keys()
    .then((keys) => {
        return keys.filter((key) => {
            return key.indexOf('Stories') !== -1
        })    
    })
}

export function getStoryBacklogsByKeys(keys: Array<string>) {
    let promises: Array<Promise<any>> = []
    keys.forEach((key) => {
        promises.push(localForage.getItem(key))
    })
    return Promise.all<any>(promises)
    //const resolvedPromises = Promise.race(promises)
}

export function extractGraphingDataFromStoryBacklog(backlogs: Array<StoryBacklog>) {
    const backlogStats: Array<BacklogStatistics> = []
   
    backlogs.forEach((backlog: StoryBacklog)=>{
        const preUpgradeStories = backlog.backlogData.filter(story => !tagFunctions.storyHasTag(story,'Post Upgrade'))
        const postUpgradeStories = backlog.backlogData.filter(story => tagFunctions.storyHasTag(story,'Post Upgrade'))
        backlogStats.push({
            date: backlog.date.substr(-10),
            preUpgrade: preUpgradeStories.length,
            postUpgrade: -postUpgradeStories.length,
            allStories: backlog.backlogData.length
        })
    })
    return backlogStats
}

export function filterStoriesByTag(stories: Array<StoryWorkItem>, tag: string) {
    const filteredStoryArray = stories.filter(story => story.fields.tags.indexOf(tag) !== -1)
    return filteredStoryArray
}

export function fetchStoryBacklog(date: Moment) {
    const asOfDate = moment(date).format("YYYY-MM-DD")
    return getBacklogItems(asOfDate);
}

export function getIdForStory(workItem: StoryWorkItem) {
    if (workItem instanceof Object && workItem.id) {
        return workItem.id
    }
    throw new Error("WorkItem Id not found or not a story")
}

export function getBoardStatusForStory(workItem: StoryWorkItem) {
    if (workItem instanceof Object && workItem.fields && workItem.fields['WEF_ABCDEFGHI_Kanban.Column']) {
        return workItem.fields['WEF_ABCDEFGHI_Kanban.Column']
    }
    throw new Error('Column not found or not a story')
}

