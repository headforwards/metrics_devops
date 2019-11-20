interface WorkItemHistory {
    id: number;
    statePeriods: Array<StatePeriod>;
    workItemTitle: string;
}
export interface StatePeriod {
    workItemState: string; // 'New' | 'Approved'| 'Committed' | 'Ready' | 'Done' | 'Removed';
    periodStart: string;
    periodEnd: string;
}
export interface FullWorkItemHistoryApiData {
    count: number;
    value: Array<WorkItemChange>;
}
export interface WorkItemChange {
    id: number;
    rev: number;
    fields: {
        [key: string]: any; //Yuck!
    };
    url: string;
}
export interface Change {
    "System.State": string;
    "System.ChangedDate": string;
    "System.BoardColumn": string;
}
enum WorkItemState {
    new = 'New',
    approved = 'approved',
    committed = 'committed',
    ready = 'ready',
    done = 'done',
    removed = 'removed'
}
