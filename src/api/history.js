import moment from 'moment'
import {fetchStoryBacklog, extractGraphingDataFromStoryBacklog, getStoryKeysFromLocalForage, getStoryBacklogsByKeys} from './stories'
import getFeatureBacklog, { getFeatureKeysFromLocalForage, getFeatureBacklogsByKeys, extractGraphingDataFromFeatureBacklog } from './features'
import fetchEpics, {extractGraphingDataFromEpicBacklog, getEpicBacklogsByKeys, getEpicKeysFromLocalForage} from './epics'
import {countCompletedStories} from './story-queries'
import combinedGraphingData from './graphing-data';

export default function getLatestBacklogData() {
    const startDate = '2018-03-05' // There is not much data prior to this date.
    let storyGraphingData = []
    let featureGraphingData = []
    let epicGraphingData = []

    const startDateMoment = moment(startDate)
    const today = moment()
    const duration = moment.duration(today.diff(startDateMoment))
    const days = Math.floor(duration.asDays())
    let storiesPromiseArray = []  
    let completedStoriesCountPromiseArray = []      
    let featuresPromiseArray = []
    let epicsPromiseArray = []
    for (let i=0;i<days;i+=7){
        const newDate = moment(startDate).add(i,'days');
        storiesPromiseArray.push(fetchStoryBacklog(newDate))
        completedStoriesCountPromiseArray.push(countCompletedStories(newDate))
        featuresPromiseArray.push(getFeatureBacklog(newDate))
        epicsPromiseArray.push(fetchEpics(newDate))
    }
    return Promise.all(storiesPromiseArray)
    .then(getStoryKeysFromLocalForage)
    .then(getStoryBacklogsByKeys)        
    .then((storyBacklogs) => {
        console.log(`Fetched/updated all stories from storage`)            
        storyGraphingData = extractGraphingDataFromStoryBacklog(storyBacklogs)
        return true
    })
    .then(getFeatureKeysFromLocalForage)
    .then(getFeatureBacklogsByKeys)
    .then((featureBacklogs) => {
        console.log(`Fetched/updated all features from storage`)    
        featureGraphingData = extractGraphingDataFromFeatureBacklog(featureBacklogs)
        return true
    })
    .then(getEpicKeysFromLocalForage)
    .then(getEpicBacklogsByKeys)
    .then((epicBacklogs) => {
        console.log(`Fetched/updated all epics from storage`)    
        epicGraphingData = extractGraphingDataFromEpicBacklog(epicBacklogs)
        return true
    })
    .then(() => {
        return Promise.all(completedStoriesCountPromiseArray)
    })
    .then((completedStoriesArray) => {
        return combinedGraphingData(storyGraphingData, featureGraphingData, epicGraphingData, completedStoriesArray)
    })
}
