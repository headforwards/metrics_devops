import { extractGraphingDataFromStoryBacklog } from "./stories";
import { extractGraphingDataFromFeatureBacklog } from "./features";
import { extractGraphingDataFromEpicBacklog } from "./epics";
import { StoryWorkItem, StoryBacklog, EpicBacklogStatistics, CompletedStoriesStatistics, HistoryGraphStats, BacklogStatistics } from "./StoryWorkItemTypes";
import { FeatureBacklogStatistics } from "./StoryWorkItemTypes"

export default function combinedGraphingData(storyData: Array<BacklogStatistics>, featureData: Array<FeatureBacklogStatistics>, epicData: Array<EpicBacklogStatistics>, completedStoriesData: Array<CompletedStoriesStatistics>) {
    let storyGraphData = Object.assign([], storyData) as Array<HistoryGraphStats>
    const featureGraphData = featureData
    // const epicGraphData = extractGraphingDataFromEpicBacklog(epicData)

    storyData.forEach((backlog, i) => {
        const date = backlog.date
        const forecastStories = getFeatureBacklogForDate(featureGraphData, date)!.forecastStories
        storyGraphData[i].forecastStories = forecastStories
        const completedStories = getCompletedStoryCountForDate(completedStoriesData, date)
        storyGraphData[i].completedStories = completedStories
    })
    return storyGraphData
}

const exampleDataFormat = [
    {
        date: "2018-03-05", 
        donestories: 234,
        inProgressStories: 12,
        knownstoriesRemaining: 24, 
        knownstoriesPostUpgrade: -0,
        forecastStories: 12,
        forecastStoriesPostUpgrade: -6,
    }
]

function getFeatureBacklogForDate(featureGraphingData: Array<FeatureBacklogStatistics>, date: string) {
    const featureData = featureGraphingData.find((weekData) => {
        return weekData.date === date
    })
    return featureData
}

function getCompletedStoryCountForDate(completedStories: CompletedStoriesStatistics[], date: string) {
    const correctWeek = completedStories.find((weekData) => {
        return  weekData.date === date
    })
    if (correctWeek) {
        return -correctWeek.completedStories
    } else {
        return 0
    }
}