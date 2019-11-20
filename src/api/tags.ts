import _ from 'lodash'
import { StoryWorkItem } from "./StoryWorkItemTypes";

const tagsPath = 'fields["System.Tags"]'

export function storyHasTag(story: StoryWorkItem, tag: string): boolean {
    const tags = getTagsFromStory(story)
    if (tags.indexOf(tag) === -1) {
        return false
    } else {
        return true
    }
}

export function storyHasTags(story: StoryWorkItem) {
    return _.has(story, tagsPath)
}

export function getTagsFromStory(story: StoryWorkItem) {
    let tagsArray = []
    if(storyHasTags(story)) {
        const tags = _.get(story, tagsPath, '')
        tagsArray = tags.split('; ')
    }    
    return tagsArray
}

export function getTagsStringFromStory(story: StoryWorkItem) {
    return _.get(story, tagsPath)
}