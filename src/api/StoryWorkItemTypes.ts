export interface StoryWorkItem {
    id: number;
    fields: {
        [key: string]: any; //Yuck!
    };
    relations: Array<{
        [key: string]: any; //Double Yuck!
    }>;
}
export interface StoryBacklog {
    date: string;
    backlogData: Array<StoryWorkItem>;
}
export interface BacklogStatistics {
    date: string;
    preUpgrade: number;
    postUpgrade: number;
    allStories: number;
}

export interface EpicBacklogStatistics {
    date: string;
    preUpgradeEpics: number;
    postUpgradeEpics: number;
}

export interface FeatureBacklogStatistics {
    date: string;
    forecastStories: number;
}

export interface CompletedStoriesStatistics {
    date: string;
    completedStories: number;
}

export interface HistoryGraphStats {
    date: string;
    preUpgrade: number;
    postUpgrade: number;
    allStories: number;
    forecastStories: number;
    completedStories: number;
}