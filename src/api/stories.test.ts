import * as stories from './stories'

test('Get board status of work item', () => {
    expect(workItem instanceof Object).toBe(true)
    function passEmptyStory() 
    {
        //@ts-ignore
        stories.getIdForStory({})
    }
    expect(passEmptyStory).toThrow()
    expect(stories.getBoardStatusForStory(workItem)).toEqual('7. Done')
})

test('Get the Id from a workItem', () => {
    expect(stories.getIdForStory(workItem)).toEqual(18489)
    function passEmptyStory() {
        //@ts-ignore
        stories.getBoardStatusForStory({})
    }
    expect(passEmptyStory).toThrow()
    function passArray() {
        //@ts-ignore
        stories.getBoardStatusForStory([])
    }
    expect(passArray).toThrow()
})

test('Create slimmed down workItem from Work Item', () => {
    expect(stories.extractUsefulFieldsFromStory(workItem)).toEqual(slimmedWorkItem)
})

const workItem = {
    "id": 18489,
    "rev": 35,
    "fields": {
        "System.Id": 18489,
        "System.AreaId": 572,
        "System.AreaPath": "Project Name\\App Name",
        "System.TeamProject": "Project Name",
        "System.NodeName": "App Name",
        "System.AreaLevel1": "Project Name",
        "System.AreaLevel2": "App Name",
        "System.Rev": 35,
        "System.AuthorizedDate": "2018-05-17T10:28:00.453Z",
        "System.RevisedDate": "9999-01-01T00:00:00Z",
        "System.IterationId": 701,
        "System.IterationPath": "Project Name\\2018\\2018 Q1\\2018.13",
        "System.IterationLevel1": "Project Name",
        "System.IterationLevel2": "2018",
        "System.IterationLevel3": "2018 Q1",
        "System.IterationLevel4": "2018.13",
        "System.WorkItemType": "Product Backlog Item",
        "System.State": "Done",
        "System.Reason": "Work finished",
        "System.CreatedDate": "2018-01-16T17:44:19.713Z",
        "System.CreatedBy": "firstname lastname <firstname.lastname@domain.com>",
        "System.ChangedDate": "2018-05-17T10:28:00.453Z",
        "System.ChangedBy": "firstname lastname <firstname.lastname@domain.com>",
        "System.AuthorizedAs": "firstname lastname <firstname.lastname@domain.com>",
        "System.PersonId": 104126573,
        "System.Watermark": 271725,
        "System.CommentCount": 1,
        "System.Title": "Some title",
        "System.BoardColumn": "7. Done",
        "System.BoardColumnDone": false,
        "Microsoft.VSTS.Common.ClosedDate": "2018-05-17T10:28:00.453Z",
        "Microsoft.VSTS.Common.Priority": 2,
        "Microsoft.VSTS.Common.ValueArea": "Business",
        "Microsoft.VSTS.Common.BusinessValue": 1,
        "Microsoft.VSTS.Scheduling.Effort": 2,
        "Microsoft.VSTS.Common.BacklogPriority": 204648690,
        "CTOScrum.ReflectedWorkItemId": "https://server01.subdomain.domain/tfs/defaultCollection/Project Name/_workitems/edit/99521",
        "WEF_ABCDEFGHI_System.ExtensionMarker": true,
        "WEF_ABCDEFGHI_Kanban.Column": "7. Done",
        "WEF_ABCDEFGHI_Kanban.Column.Done": false,
        "System.Description": "Here goes the description",
        "Microsoft.VSTS.Common.AcceptanceCriteria": "Scenario 1 : etc",
        "System.Tags": "FEATURE: 98275; Q2 2018"
    },
    "relations": [
        {
            "rel": "System.LinkTypes.Hierarchy-Forward",
            "url": "https://xyz.visualstudio.com/_apis/wit/workItems/30187",
            "attributes": {
                "isLocked": false
            }
        },
        {
            "rel": "System.LinkTypes.Hierarchy-Reverse",
            "url": "https://xyz.visualstudio.com/_apis/wit/workItems/18919",
            "attributes": {
                "isLocked": false
            }
        },
        {
            "rel": "System.LinkTypes.Hierarchy-Forward",
            "url": "https://xyz.visualstudio.com/_apis/wit/workItems/30188",
            "attributes": {
                "isLocked": false
            }
        },
        {
            "rel": "AttachedFile",
            "url": "https://xyz.visualstudio.com/_apis/wit/attachments/ed797715-2a08-46ca-8af6-307de5951b06",
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
            "url": "vstfs:///Git/Commit/abc-123-def-456-xyz0987%2f20836fb3-eb89-4c78-9219-e449ed1a1ad9%2fb797269a01072c0b80d7835017c2ee5e71bda4d0",
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
    "_links": {
        "self": {
            "href": "https://xyz.visualstudio.com/_apis/wit/workItems/18489"
        },
        "workItemUpdates": {
            "href": "https://xyz.visualstudio.com/_apis/wit/workItems/18489/updates"
        },
        "workItemRevisions": {
            "href": "https://xyz.visualstudio.com/_apis/wit/workItems/18489/revisions"
        },
        "workItemHistory": {
            "href": "https://xyz.visualstudio.com/_apis/wit/workItems/18489/history"
        },
        "html": {
            "href": "https://xyz.visualstudio.com/web/wi.aspx?pcguid=f7a39178-a470-47cd-a9be-01269206cfcd&id=18489"
        },
        "workItemType": {
            "href": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItemTypes/Product%20Backlog%20Item"
        },
        "fields": {
            "href": "https://xyz.visualstudio.com/_apis/wit/fields"
        }
    },
    "url": "https://xyz.visualstudio.com/_apis/wit/workItems/18489"
}

var slimmedWorkItem = {
    'id': 18489,
    'relations': [
        {
            "rel": "System.LinkTypes.Hierarchy-Forward",
            "url": "https://xyz.visualstudio.com/_apis/wit/workItems/30187",
            "attributes": {
                "isLocked": false
            }
        },
        {
            "rel": "System.LinkTypes.Hierarchy-Reverse",
            "url": "https://xyz.visualstudio.com/_apis/wit/workItems/18919",
            "attributes": {
                "isLocked": false
            }
        },
        {
            "rel": "System.LinkTypes.Hierarchy-Forward",
            "url": "https://xyz.visualstudio.com/_apis/wit/workItems/30188",
            "attributes": {
                "isLocked": false
            }
        },
        {
            "rel": "AttachedFile",
            "url": "https://xyz.visualstudio.com/_apis/wit/attachments/ed797715-2a08-46ca-8af6-307de5951b06",
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
            "url": "vstfs:///Git/Commit/abc-123-def-456-xyz0987%2f20836fb3-eb89-4c78-9219-e449ed1a1ad9%2fb797269a01072c0b80d7835017c2ee5e71bda4d0",
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