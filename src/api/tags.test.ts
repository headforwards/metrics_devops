import _ from 'lodash'

import { StoryWorkItem } from "./StoryWorkItemTypes";
import * as tagFunctions from './tags'

describe(`Testing for the presence of a tags field`, () => {

    it(`returns true if the story has a tags field`, () => {
        expect(tagFunctions.storyHasTags(slimmedWorkItem)).toBe(true) 
    })

    it(`returns false if the story does not have a tags field`, () => {
        //@ts-ignore
        expect(tagFunctions.storyHasTags({})).toBe(false)
    })

    it(`returns false if passing in something other than an object`, () => {
        // @ts-ignore
        expect(tagFunctions.storyHasTags("Boom")).toBe(false)
    })
})

describe(`Getting the content of the tags`, () => {

    it(`Gets the text of the tags field`, () => {
        expect(tagFunctions.getTagsStringFromStory(slimmedWorkItem)).toEqual("FEATURE: 98275; Q2 2018")
    })

    it(`Gets tags as an array`, () => {
        expect(tagFunctions.getTagsFromStory(slimmedWorkItem)).toEqual(["FEATURE: 98275", "Q2 2018"])
    })

    it('It returns false if searching for part of a tag in a story', () => {
        expect(tagFunctions.storyHasTag(slimmedWorkItem,'2018')).toBe(false)
    })

    it(`returns true if searching for a specific tag that exists in a story`, () => {
        expect(tagFunctions.storyHasTag(slimmedWorkItem, 'Q2 2018')).toBe(true)
    })

    it(`returns false if searching for a tag that is not in a story which has tags`, () => {
        expect(tagFunctions.storyHasTag(slimmedWorkItem, 'I like jam')).toBe(false)
    })
    
    it(`returns false if searching for a tag in a story with no tags`, () => {
        let newStory = _.clone(slimmedWorkItem)
        delete newStory.fields["System.Tags"]
        expect(tagFunctions.storyHasTag(newStory, 'Q2 2018')).toBe(false)
    })

    it(`returns false if searching for a tag in a non story`, () => {
        const aNonStory = {
            a: "somestuff",
            b: 12
        }
        //@ts-ignore
        expect(tagFunctions.storyHasTag(aNonStory, 'Q2 2018')).toBe(false)
    })
})



var slimmedWorkItem: StoryWorkItem = {
    'id': 18489,
    'relations': [
        {
            "rel": "System.LinkTypes.Hierarchy-Forward",
            "url": "https://xyz.visualstudio.com/_apis/wit/workItems/123456789",
            "attributes": {
                "isLocked": false
            }
        },
        {
            "rel": "System.LinkTypes.Hierarchy-Reverse",
            "url": "https://xyz.visualstudio.com/_apis/wit/workItems/123456789",
            "attributes": {
                "isLocked": false
            }
        },
        {
            "rel": "System.LinkTypes.Hierarchy-Forward",
            "url": "https://xyz.visualstudio.com/_apis/wit/workItems/123456789",
            "attributes": {
                "isLocked": false
            }
        },
        {
            "rel": "AttachedFile",
            "url": "https://xyz.visualstudio.com/_apis/wit/attachments/abcdef",
            "attributes": {
                "authorizedDate": "2018-03-19T16:15:55.463Z",
                "id": 1784313,
                "resourceCreatedDate": "2018-03-19T16:15:55.333Z",
                "resourceModifiedDate": "2018-03-19T16:15:15.303Z",
                "revisedDate": "9999-01-01T00:00:00Z",
                "resourceSize": 12914,
                "name": "Live Attributes.xlsx"
            }
        },
        {
            "rel": "ArtifactLink",
            "url": "vstfs:///Git/Commit/poiuytrewq",
            "attributes": {
                "authorizedDate": "2018-03-26T15:43:39.957Z",
                "id": 1794201,
                "resourceCreatedDate": "2018-03-26T15:43:39.957Z",
                "resourceModifiedDate": "2018-03-26T15:43:39.957Z",
                "revisedDate": "9999-01-01T00:00:00Z",
                "name": "Fixed in Commit"
            }
        }
    ],
    'fields': {
        'System.BoardColumn': "7. Done",
        'System.CreatedDate': "2018-01-16T17:44:19.713Z",
        "System.State": "Done",
        "System.Tags": "FEATURE: 98275; Q2 2018",
        "System.Title": "Some title",
        "Microsoft.VSTS.Common.BacklogPriority": 204648690,
        "System.WorkItemType": "Product Backlog Item",
    }
}