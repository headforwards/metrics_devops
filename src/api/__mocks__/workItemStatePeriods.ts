import { StatePeriod } from "../WorkItemHistoryTypes";

export const workItem1StatePeriods: Array<StatePeriod> = [
    {
      "periodEnd": "2018-09-12T09:04:45.28Z",
      "periodStart": "2018-04-01T11:25:15.593Z",
      "workItemState": "New",
    },
     {
      "periodEnd": "2018-10-14T11:50:50.84Z",
      "periodStart": "2018-09-12T09:04:45.28Z",
      "workItemState": "Approved",
    },
    {
      "periodEnd": "2018-10-21T15:37:21.407Z",
      "periodStart": "2018-10-14T11:50:50.84Z",
      "workItemState": "Committed",
    },
    { 
      "periodEnd": "2018-10-23T14:56:52.393Z",
      "periodStart": "2018-10-21T15:37:21.407Z",
      "workItemState": "Approved",
    },
    { 
      "periodEnd": "2018-12-03T23:59:59.999Z",
      "periodStart": "2018-10-23T14:56:52.393Z",
      "workItemState": "Committed",
    },
  ]

  export const workItem2StatePeriods: Array<StatePeriod> = [
    {
      "periodEnd": "2018-10-12T09:04:45.28Z",
      "periodStart": "2018-05-01T11:25:15.593Z",
      "workItemState": "New",
    },
     {
      "periodEnd": "2018-11-14T11:50:50.84Z",
      "periodStart": "2018-10-12T09:04:45.28Z",
      "workItemState": "Approved",
    },
    {
      "periodEnd": "2018-11-21T15:37:21.407Z",
      "periodStart": "2018-11-14T11:50:50.84Z",
      "workItemState": "Committed",
    },
    { 
      "periodEnd": "2018-11-23T14:56:52.393Z",
      "periodStart": "2018-11-21T15:37:21.407Z",
      "workItemState": "Approved",
    },
    { 
      "periodEnd": "2019-01-03T23:59:59.999Z",
      "periodStart": "2018-11-23T14:56:52.393Z",
      "workItemState": "Committed",
    },
  ]

  export const workItem3StatePeriods: Array<StatePeriod> = [
    {
      "periodEnd": "2018-11-12T09:04:45.28Z",
      "periodStart": "2018-06-01T11:25:15.593Z",
      "workItemState": "New",
    },
     {
      "periodEnd": "2018-12-14T11:50:50.84Z",
      "periodStart": "2018-11-12T09:04:45.28Z",
      "workItemState": "Approved",
    },
    {
      "periodEnd": "2018-12-21T15:37:21.407Z",
      "periodStart": "2018-12-14T11:50:50.84Z",
      "workItemState": "Committed",
    },
    { 
      "periodEnd": "2018-12-23T14:56:52.393Z",
      "periodStart": "2018-12-21T15:37:21.407Z",
      "workItemState": "Approved",
    },
    { 
      "periodEnd": "2019-02-03T23:59:59.999Z",
      "periodStart": "2018-12-23T14:56:52.393Z",
      "workItemState": "Committed",
    },
  ]

  export const workItemStatePeriodArray: Array<Array<StatePeriod>> = [
    workItem3StatePeriods,
    workItem1StatePeriods,
    workItem2StatePeriods    
]