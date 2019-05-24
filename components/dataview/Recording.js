import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { DISPLAY_CLASSES } from '../../config.json';
import { COLORS } from '../../utils/colors';
import OpenMoji from '../shared/OpenMoji.js';
import SVG from 'react-inlinesvg';
import { deleteRecording } from '../../statemanagement/app/HistoryStateManagement.js';

class Recording extends PureComponent {

  constructor(props) {
    super(props);
  }


  componentDidMount() {

  }

  componentWillUnmount() {

  }

  renderDateEnd(dateEnd, active = false) {
    if(!active) {
      return dayjs(dateEnd).format('hh:mm a')
    } else {
      return (
        <span className="font-bold" style={{color: "#FF0000"}}>Ongoing</span>
      )
    }
  }

  render() {

    return (
      <div className="flex flex-initial flex-col recording pl-2 mb-10">
        <div className="text-inverse flex flex-initial items-center pl-6">
          <div>{dayjs(this.props.dateStart).format('MMM DD, YYYY')}</div>
          <div className="ml-10">
            {dayjs(this.props.dateStart).format('hh:mm a')} - {this.renderDateEnd(this.props.dateEnd, this.props.active)}
          </div>
          {!this.props.active &&
            <button
              className="btn btn-default p-0 ml-2 shadow rounded"
              onClick={() => this.props.dispatch(deleteRecording(this.props.id))}
            >
              <SVG 
                className="w-6 h-6 svg-icon flex items-center" 
                cacheGetRequests={true}
                src={`/static/icons/ui/delete.svg`} 
                aria-label="icon close"
              />
            </button>
          }
        </div>
        <div className="flex flex-initial flex-wrap pb-2 pl-1 m-2">
          {this.props.countingAreas.size > 0 &&
            <div className="flex flex-initial flex-col rounded bg-white text-black shadow m-2 p-4">
              <div className="flex items-end justify-between">
                <h3 className="mr-3 text-xl font-bold">Counter</h3>
                <a className="btn-text" href={`/recording/${this.props.id}/counter`} target="_blank">Download data</a>
              </div>
              <div className="mt-4 flex flex-wrap">
                {this.props.countingAreas && this.props.countingAreas.entrySeq().map(([countingAreaId, countingAreaData], index) =>
                  <div 
                    key={countingAreaId} 
                    className={`flex flex-col bg-gray-200 m-2 rounded p-4`}
                  >
                    <div className="flex items-center">
                      <h4 className="font-medium">{countingAreaData.get('name')}</h4>
                      <div className="w-4 h-4 ml-2 rounded-full" style={{'backgroundColor': COLORS[countingAreaData.get('color')]}}></div>
                    </div>
                    <div className="flex flex-initial flex-wrap mt-5 w-64">
                      {DISPLAY_CLASSES.slice(0, Math.min(DISPLAY_CLASSES.length, 6)).map((counterClass) =>
                        <div 
                          className="flex w-16 m-1 items-center justify-center" 
                          key={counterClass.class}
                        >
                          <h4 className="mr-2">{this.props.counterData && this.props.counterData.getIn([countingAreaId, counterClass.class]) || 0}</h4>
                          <OpenMoji 
                            icon={counterClass.icon}
                            class={counterClass.class}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
          <div className="flex flex-initial flex-col rounded bg-white text-black shadow m-2 p-4">
            <div className="flex items-end justify-between">
              <h3 className="mr-3 text-xl font-bold">Tracker</h3>
              <a className="btn-text" href={`/recording/${this.props.id}/tracker`} target="_blank">Download data</a>
            </div>
            <div className="mt-6 rounded relative">
              <div className="text-white absolute" style={{ bottom: 10, left : 10}}>
                <h2 className="inline text-4xl font-bold">{this.props.nbPaths}</h2> objects tracked
              </div>
              <img src="/static/placeholder/pathview.jpg" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Recording)
