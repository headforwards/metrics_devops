import * as storyQueries from './story-queries'

test('Retrieve a list of stories open at start of week', () => {
    expect(storyQueries.getWorkItemIdsFromResponse(storiesOpenResult) instanceof Array).toBe(true)
    expect(storyQueries.getWorkItemIdsFromResponse(storiesOpenResult).length).toBe(110)    
})

test('Response contains actual workItems', () => {
    expect(typeof storyQueries.getWorkItemIdsFromResponse(storiesOpenResult)[0]).toBe('number')
    expect(storyQueries.getWorkItemIdsFromResponse(storiesOpenResult)[0]).toBe(18486)


})

// Shouldn't really be testing with the live API
// Also, doesn't bloomin work in tests due to proxy crappery
//
// test('Get a list of common stories from the API', () => {
//     return storyQueries.getStoriesMovedToReadyInWeek(2018, 46)
//     .then((ids) => {
//         expect(ids instanceof Array).toBe(true)
//     })
// })

const storiesOpenResult = {
    "queryType": "flat",
    "queryResultType": "workItem",
    "asOf": "2018-11-01T00:00:00Z",
    "columns": [
        {
            "referenceName": "System.Id",
            "name": "ID",
            "url": "https://xyz.visualstudio.com/_apis/wit/fields/System.Id"
        }
    ],
    "workItems": [
        {
            "id": 18486,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/18486"
        },
        {
            "id": 18515,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/18515"
        },
        {
            "id": 18520,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/18520"
        },
        {
            "id": 18524,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/18524"
        },
        {
            "id": 18591,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/18591"
        },
        {
            "id": 18881,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/18881"
        },
        {
            "id": 18883,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/18883"
        },
        {
            "id": 18965,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/18965"
        },
        {
            "id": 19385,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19385"
        },
        {
            "id": 19501,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19501"
        },
        {
            "id": 19502,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19502"
        },
        {
            "id": 19503,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19503"
        },
        {
            "id": 19504,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19504"
        },
        {
            "id": 19505,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19505"
        },
        {
            "id": 19631,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19631"
        },
        {
            "id": 19638,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19638"
        },
        {
            "id": 19649,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19649"
        },
        {
            "id": 19671,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19671"
        },
        {
            "id": 19680,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19680"
        },
        {
            "id": 19691,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19691"
        },
        {
            "id": 19799,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19799"
        },
        {
            "id": 20046,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/20046"
        },
        {
            "id": 28869,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/28869"
        },
        {
            "id": 30111,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/30111"
        },
        {
            "id": 30123,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/30123"
        },
        {
            "id": 32000,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/32000"
        },
        {
            "id": 32001,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/32001"
        },
        {
            "id": 32153,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/32153"
        },
        {
            "id": 32204,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/32204"
        },
        {
            "id": 33253,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/33253"
        },
        {
            "id": 33349,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/33349"
        },
        {
            "id": 33362,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/33362"
        },
        {
            "id": 39531,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/39531"
        },
        {
            "id": 39549,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/39549"
        },
        {
            "id": 39550,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/39550"
        },
        {
            "id": 39551,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/39551"
        },
        {
            "id": 39608,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/39608"
        },
        {
            "id": 42775,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/42775"
        },
        {
            "id": 42795,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/42795"
        },
        {
            "id": 55360,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/55360"
        },
        {
            "id": 64801,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/64801"
        },
        {
            "id": 65991,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/65991"
        },
        {
            "id": 66650,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/66650"
        },
        {
            "id": 70397,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/70397"
        },
        {
            "id": 71121,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/71121"
        },
        {
            "id": 71633,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/71633"
        },
        {
            "id": 72083,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/72083"
        },
        {
            "id": 72093,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/72093"
        },
        {
            "id": 72104,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/72104"
        },
        {
            "id": 75015,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/75015"
        },
        {
            "id": 75836,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/75836"
        },
        {
            "id": 76199,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/76199"
        },
        {
            "id": 76579,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/76579"
        },
        {
            "id": 76811,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/76811"
        },
        {
            "id": 79984,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/79984"
        },
        {
            "id": 80254,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/80254"
        },
        {
            "id": 80266,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/80266"
        },
        {
            "id": 80333,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/80333"
        },
        {
            "id": 80564,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/80564"
        },
        {
            "id": 80571,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/80571"
        },
        {
            "id": 80586,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/80586"
        },
        {
            "id": 80588,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/80588"
        },
        {
            "id": 80589,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/80589"
        },
        {
            "id": 80603,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/80603"
        },
        {
            "id": 80610,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/80610"
        },
        {
            "id": 81319,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/81319"
        },
        {
            "id": 81441,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/81441"
        },
        {
            "id": 81592,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/81592"
        },
        {
            "id": 81951,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/81951"
        },
        {
            "id": 81959,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/81959"
        },
        {
            "id": 81966,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/81966"
        },
        {
            "id": 82403,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/82403"
        },
        {
            "id": 82544,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/82544"
        },
        {
            "id": 82551,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/82551"
        },
        {
            "id": 84509,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/84509"
        },
        {
            "id": 84524,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/84524"
        },
        {
            "id": 85272,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/85272"
        },
        {
            "id": 85355,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/85355"
        },
        {
            "id": 85382,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/85382"
        },
        {
            "id": 85419,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/85419"
        },
        {
            "id": 85424,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/85424"
        },
        {
            "id": 85427,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/85427"
        },
        {
            "id": 85428,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/85428"
        },
        {
            "id": 86872,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/86872"
        },
        {
            "id": 86966,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/86966"
        },
        {
            "id": 87023,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/87023"
        },
        {
            "id": 87922,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/87922"
        },
        {
            "id": 87923,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/87923"
        },
        {
            "id": 87924,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/87924"
        },
        {
            "id": 87970,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/87970"
        },
        {
            "id": 88376,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/88376"
        },
        {
            "id": 88377,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/88377"
        },
        {
            "id": 88378,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/88378"
        },
        {
            "id": 88379,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/88379"
        },
        {
            "id": 88380,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/88380"
        },
        {
            "id": 88381,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/88381"
        },
        {
            "id": 88382,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/88382"
        },
        {
            "id": 88383,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/88383"
        },
        {
            "id": 89079,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/89079"
        },
        {
            "id": 90188,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/90188"
        },
        {
            "id": 90398,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/90398"
        },
        {
            "id": 90405,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/90405"
        },
        {
            "id": 90917,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/90917"
        },
        {
            "id": 92298,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/92298"
        },
        {
            "id": 92340,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/92340"
        },
        {
            "id": 93106,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/93106"
        },
        {
            "id": 93323,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/93323"
        },
        {
            "id": 93392,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/93392"
        },
        {
            "id": 93415,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/93415"
        },
        {
            "id": 94227,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/94227"
        }
    ]
}

const storiesCompletedNotDeployedResult = {
    "queryType": "flat",
    "queryResultType": "workItem",
    "asOf": "2018-08-29T00:00:00Z",
    "columns": [
        {
            "referenceName": "System.Id",
            "name": "ID",
            "url": "https://xyz.visualstudio.com/_apis/wit/fields/System.Id"
        }
    ],
    "workItems": [
        {
            "id": 19784,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/19784"
        },
        {
            "id": 29617,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/29617"
        },
        {
            "id": 29622,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/29622"
        },
        {
            "id": 29623,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/29623"
        },
        {
            "id": 43890,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/43890"
        },
        {
            "id": 53916,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/53916"
        },
        {
            "id": 54193,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/54193"
        },
        {
            "id": 54194,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/54194"
        },
        {
            "id": 66719,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/66719"
        },
        {
            "id": 75262,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/75262"
        },
        {
            "id": 76688,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/76688"
        },
        {
            "id": 76693,
            "url": "https://xyz.visualstudio.com/abc-123-def-456-xyz0987/_apis/wit/workItems/76693"
        }
    ]
}