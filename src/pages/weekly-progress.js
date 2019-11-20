import React, { Component } from 'react';
import Timeline from 'react-calendar-timeline/lib'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import * as storyQueries from '../api/story-queries'
import * as itemHistoryTimeline from '../api/item-history-timeline'
import * as itemHistory from '../api/item-history'

import {workItem} from '../api/__mocks__/workItemHistoryIncomplete'

import '../App.css';


class WeeklyProgress extends Component {
    
    constructor(props) {
        super(props)
        // const groups = this.getGroups()
        // const items = this.getItems()
        const defaultTimeStart = moment('2018-05-01').startOf('month').toDate()
        const defaultTimeEnd = moment('2019-01-01').endOf('month').toDate()
        this.state = {
            groups: [],
            items: [],
            defaultTimeStart,
            defaultTimeEnd
        }
    }

    componentDidMount() {
        // storyQueries.getStoriesModifiedRecently()
        storyQueries.getStoriesFromQuarter()
        .then(storyQueries.getWorkItemIdsFromResponse)
        .then(itemHistory.fetchMultipleWorkItemHistories)
        .then(histories => {
            const statePeriods =  histories.map(workItemHistory => {
                return itemHistory.getStatePeriodsData(workItemHistory)
            })
            
            let itemsData = []
            let groupsData = []

            statePeriods.forEach((stateData, i) => {
                const workItemTitle = stateData.workItemTitle
                const singleItemData =  itemHistoryTimeline.formatStatePeriodsForTimeline(stateData.statePeriods,stateData.id, i, stateData.workItemTitle)
                
                singleItemData.workItemTitle = workItemTitle
                Array.prototype.push.apply(itemsData, singleItemData)
                const group = {
                    id: i,
                    title: stateData.id,
                    workItemTitle
                }
                groupsData.push(group)
            })
            this.setState({
                groups: groupsData,
                items: itemsData
            })
        })
    }

    render() {    

        const backgroundFromState = (workItemState) => {
            let workItemColour = 'Red'

            switch  (workItemState) {
                case 'New':
                    workItemColour = '#849483'
                    break
                case 'Approved':
                    workItemColour = '#A3C789'
                    break
                case 'Committed':
                    workItemColour = '#4E937A'
                    break
                case 'Ready':
                    workItemColour = '#B4656F'
                    break
                case 'Done':
                    workItemColour = 'white'
                    break
                case 'Removed':
                    workItemColour = 'light-grey'
                    break
                default:
                    workItemColour = 'red'
            }
            return workItemColour
        }

        this.groupRenderer = ({ group }) => {
            const leftLabelStyle = {
                textAlign: 'left',
            }
            const toolTip = `${group.workItemTitle} - ${group.title}`
            return (
              <div className="custom-group" style={leftLabelStyle}>
                <span className="title" title={toolTip}>
                    {group.workItemTitle} - {group.title}
                </span>
              </div>
            )
          }

        this.itemRenderer = ({
            item,
            timelineContext,
            itemContext,
            getItemProps,
            
        }) => {

            return (
            <div
                {...getItemProps({
                style: {
                    background: backgroundFromState(item.workItemState),
                    borderStyle: 'none',
                    color: 'black',
                },
                onMouseDown: () => {
                    console.log("on item click", item );
                }
                })}
            >
                
        
                <div
                style={{
                    height: itemContext.dimensions.height,
                    overflow: "hidden",
                    paddingLeft: 3,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}
                title={item.workItemTitle}
                >
                   {item.workItemState}
                </div>
        
                
            </div>
            );
        };

      const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state

return (
    <div className="App">
    <h1>Weekly Progress</h1>
                <Timeline
                groups={groups}
                items={items}
                defaultTimeStart={defaultTimeStart}
                defaultTimeEnd={defaultTimeEnd}
                sidebarContent={'Backlog Items'}
                sidebarWidth={200}
                lineHeight={20}
                headerLabelGroupHeight={20}
                headerLabelHeight={20}
                canMove={false}
                canResize={false}
                traditionalZoom={true}
                itemRenderer = {this.itemRenderer}
                groupRenderer = {this.groupRenderer}
                minZoom = {24 * 60 * 60 * 1000} // 1 day
                />
    </div>
    );  
  }
}

export default WeeklyProgress;