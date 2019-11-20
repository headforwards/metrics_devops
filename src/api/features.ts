import moment from 'moment';
import localForage from 'localforage'
import { FullWorkItemHistoryApiData } from './WorkItemHistoryTypes';
import { StoryWorkItem, StoryBacklog, BacklogStatistics, FeatureBacklogStatistics } from './StoryWorkItemTypes'


const featuresUrl = 'https://dev.azure.com/xyz/Project Name/_apis/wit/wiql?api-version=4.1&$expand=all';

const headers = new Headers()
headers.append('Content-Type', 'application/json')
headers.append('Authorization', 'Insert creds here, not prod safe!!')



function getFeaturesViaApi(asOfDate: string) {

    const fetchInit = {
        method: 'POST',
        body: `{ "query": 
        "Select [System.Id] FROM WorkItems 
        WHERE [System.TeamProject] = 'Project Name' 
        AND [System.WorkItemType] = 'Feature' 
        AND [System.State] = 'New' ASOF '${asOfDate}'" }`,
        headers: headers,
    }
    const storageKey = `Features-${asOfDate}`
    return localForage.getItem(storageKey)
    .then((storedData) => {
        if(storedData) {
            return storedData
        }else{
          
            return fetch(featuresUrl, fetchInit)
            .then(function(res) {
                const json = res.json();
                return json;
            })
            .then(function(json) {
                const workItemArray: Array<number> = [];
                json.workItems.forEach((workItem: StoryWorkItem) => {
                    workItemArray.push(workItem.id);
                });
                console.log(workItemArray)
                return workItemArray;
            })
            .then(function(workItemArray) {
            return getFeaturesWithRelations(workItemArray, headers, asOfDate);
            })
            .then(function(res) {
                return res.json()
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
                return sortedWorkItemArray;
           })
           .then((sortedWorkItemArray) => {
                const featureBacklog = {
                    'date': asOfDate,
                    'backlogData': sortedWorkItemArray
                }
                return localForage.setItem(storageKey, featureBacklog)
           })
        }
    })
    
}

function getFeaturesWithRelations(workItemArray: Array<number>, header: Headers, asOfDate: string) {
    const authHeader = {
        headers: header,
    }
    return fetch (`https://xyz.visualstudio.com/Project%20Name/_apis/wit/workitems?ids=${workItemArray}&asOf=${asOfDate}T00:00:00.000Z&$expand=relations`, authHeader)
}

export function getFeatureKeysFromLocalForage() {
    return localForage.keys()
    .then((keys) => {
        return keys.filter((key) => {
            return key.indexOf('Features') !== -1
        })
    })
}

export function getFeatureBacklogsByKeys(keys: Array<string>) {
    let promises: Array<Promise<StoryBacklog>> = []
    keys.forEach((key) => {
        promises.push(localForage.getItem(key))
    })
    return Promise.all(promises)
}


// export function getFeatureBacklogsFromLocalStorage() {
//     let backlogs = []
//     for (let i = 0; i < localForage.length; i++){
//         if(localForage.key(i).indexOf('Features')!== -1) {
//             backlogs.push({
//                 'date': localForage.key(i).substr(-10),
//                 'backlogData': localForage.getItem(localForage.key(i))
//             })
//         }   
//     }
//     return backlogs
// }

export function extractGraphingDataFromFeatureBacklog(backlogs: Array<StoryBacklog>) {
    const backlogStats: Array<FeatureBacklogStatistics> = []
    backlogs.forEach((backlog) => {
        // const preUpgradeFeatures = backlog.backlogData.filter(feature => feature.fields["System.Tags"] && feature.fields["System.Tags"].indexOf('Post Upgrade') === -1)
        // const postUpgradeFeatures = backlog.backlogData.filter(feature => feature.fields["System.Tags"] && feature.fields["System.Tags"].indexOf('Post Upgrade') !== -1)
        const forecastStories = countEmptyFeaturesInBacklog(backlog.backlogData) * meanStoryCountForFeatureBacklog(backlog.backlogData)
        backlogStats.push({
            date: backlog.date.substr(-10),
            forecastStories: forecastStories
            
        })
    })
    return backlogStats
}

function countEmptyFeaturesInBacklog(workItems: Array<StoryWorkItem>) {
    let emptyFeatureCount = 0
    workItems.forEach((feature) => {
        if(countChildStories(feature) < 1) {
            emptyFeatureCount += 1
        }
    })
    return emptyFeatureCount
}

// Average story count of non empty features
function meanStoryCountForFeatureBacklog(workItems: Array<StoryWorkItem>) {
    let storyCounts: Array<number> = []
    workItems.forEach((feature, i) => {
        const numberOfChildren = countChildStories(feature)
        if(numberOfChildren > 0 ) {
            storyCounts.push(numberOfChildren)
        }
    })
    const av = meanAverageFromArray(storyCounts)
    return av
}

export function countChildStories(feature: StoryWorkItem) {
    if(feature.relations) {
        const childRelations = feature.relations.filter(relation => relation.rel === "System.LinkTypes.Hierarchy-Forward")
        return childRelations.length;
    } else {
        return 0;
    }    
}

function meanAverageFromArray(arr: Array<number>) {
    return arr.reduce(function (a, b) {
        return a + b
      }) / arr.length
}

export default function getFeatureBacklog(date: string) {
    const asOfDate = moment(date).format("YYYY-MM-DD")
    return getFeaturesViaApi(asOfDate);
}

