import moment from 'moment';
import localForage from 'localforage'
import { StoryBacklog, StoryWorkItem, EpicBacklogStatistics } from './StoryWorkItemTypes';


const epicsUrl = 'https://dev.azure.com/xyz/Project Name/_apis/wit/wiql?api-version=4.1&$expand=all';

const headers = new Headers()
headers.append('Content-Type', 'application/json')
headers.append('Authorization', 'Insert creds here, not prod safe!!')



function getEpics(asOfDate: string) {
    const fetchInit = {
        method: 'POST',
        body: `{ "query": "Select [System.Id] FROM WorkItems WHERE [System.TeamProject] = 'Project Name' AND [System.WorkItemType] = 'Epic' AND ([System.State] = 'New' OR [System.State] = 'In Progress') ASOF '${asOfDate}'" }`,
        headers: headers,
    } as RequestInit
    const storageKey = `Epics-${asOfDate}`
    return localForage.getItem(storageKey)
    .then((storedData) => {
        if(storedData) {
            return storedData
        }else{
    
            return fetch(epicsUrl, fetchInit)
            .then(function(res) {
                const json = res.json();
                return json;
            })
            .then(function(json: any) {
                const workItemArray: Array<number> = [];
                json.workItems.forEach((workItem: StoryWorkItem) => {
                    workItemArray.push(workItem.id);
                });
                console.log(workItemArray)
                return workItemArray;
            })
            .then(function(workItemArray) {
            return getEpicsWithRelations(workItemArray, headers, asOfDate);
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
                // if (sortedWorkItemArray.length >= 100) {
                //     return sortedWorkItemArray.slice(0, 99)
                // }
               // localForage.setItem(storageKey, sortedWorkItemArray)
                return sortedWorkItemArray;
           })
           .then((sortedWorkItemArray) => {
               const epicBacklog = {
                   'date': asOfDate,
                   'backlogData': sortedWorkItemArray
               }
               return localForage.setItem(storageKey, epicBacklog)
           })
        }
    })
    
}

function getEpicsWithRelations(workItemArray: Array<number>, header: Headers , asOfDate: string) {

    const init = {
        headers: header,
    } 
    return fetch (`https://xyz.visualstudio.com/Project%20Name/_apis/wit/workitems?ids=${workItemArray}&asOf=${asOfDate}T00:00:00.000Z&$expand=relations`, init)
}

export function countChildFeatures(feature: StoryWorkItem) {
    if(feature.relations) {
        const childRelations = feature.relations.filter(relation => relation.rel === "System.LinkTypes.Hierarchy-Forward")
        return childRelations.length;
    } else {
        return 0;
    }    
}

export function getEpicKeysFromLocalForage() {
    return localForage.keys()
    .then((keys) => {
        return keys.filter((key) => {
            return key.indexOf('Epics') !== -1
        })
    })
}

export function getEpicBacklogsByKeys(keys: Array<string>) {
    let promises: Array<Promise<StoryBacklog>> = []
    keys.forEach((key) => {
        promises.push(localForage.getItem(key))
    })
    return Promise.all(promises)
}

export function extractGraphingDataFromEpicBacklog(backlogs: Array<StoryBacklog>) {
    const backlogStats: Array<EpicBacklogStatistics> = []
    backlogs.forEach((backlog) => {
        const preUpgradeEpics = backlog.backlogData.filter(epic => epic.fields["System.Tags"] && epic.fields["System.Tags"].indexOf('Post Upgrade') === -1)
        const postUpgradeEpics = backlog.backlogData.filter(epic => epic.fields["System.Tags"] && epic.fields["System.Tags"].indexOf('Post Upgrade') !== -1)
        backlogStats.push({
            date: backlog.date.substr(-10),
            preUpgradeEpics: preUpgradeEpics.length,
            postUpgradeEpics: postUpgradeEpics.length
        })
    })
    return backlogStats
}

export default function fetchEpics(date: moment.Moment) {
    const asOfDate = moment(date).format("YYYY-MM-DD")
    return getEpics(asOfDate);
}

