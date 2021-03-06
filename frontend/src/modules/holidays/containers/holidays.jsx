import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {notify} from '../../../services/notify';
import * as actions from '../../../redux/actions';
import Menu from '../../../components/generic/Menu';
import Header from '../../../components/generic/Header';
import {isNotUserValid} from '../../../services/generic';
import HolidaysList from '../../../components/holidays/HolidaysList';
import { getToken, getYearArray } from '../../../services/generic';
var moment = require('moment');

class Holidays extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
    this.state={
      date:"",
      holidayName:"",
      type:"",
      year:"",
      yearSelected: ""
    };
    this.year=[];
  }

  componentWillMount () {
    this.props.requestHolidayList({year:new Date().getYear() + 1900});
    this.props.resetReducer();
    this.props.requestHolidayType({token:getToken()});
    this.year = getYearArray();
    this.setState({yearSelected:`${this.year[3]}`});
  }
  componentWillReceiveProps (props) {
    let {addHoliday,holidayType,deleteHoliday} = props;
    if(holidayType && holidayType.data && holidayType.data.holiday_type_list){
      this.setState({type:`${holidayType.data.holiday_type_list[0].type}`})
    }
    if (addHoliday.isError) {
      notify('Error !', addHoliday.message, 'error');
    }
    if (addHoliday.isSuccess) {
      notify('Success !', addHoliday.data.message, 'success');           
      this.setState({date:"",holidayName:"",yearSelected:this.state.year});
      this.props.requestHolidayList({year:this.state.year}); 
    }
    if (deleteHoliday.isError) {
      notify('Error !', deleteHoliday.message, 'error');
    }
    if (deleteHoliday.isSuccess) {
      notify('Success !', deleteHoliday.data.message, 'success');
      this.props.requestHolidayList({year:this.state.yearSelected});
    }
    
    let {location, history, loggedUser, holidaysList: {isError, message}} = props;
    let isNotValid = isNotUserValid(location.pathname, loggedUser);
    if (isNotValid.status) {
      history.push(isNotValid.redirectTo);
    }
    if (isError) {
      notify('Error !', message, 'error');
    }
    if(props.holidayType && props.holidayType.data && props.holidayType.data.holiday_type_list){
      this.setState({type:`${props.holidayType.data.holiday_type_list[0].type}`})
    }
  }

  handleDateChnage=(date)=>{
    if(date){
      this.setState(
        { date: date, year: moment(date).year() }
      )
    }
    }

  handleHolidayNameChnage=(e)=>{
    this.setState(
      { holidayName: e.target.value }
    )}

  handleTypeChnage=(e)=>{
    this.setState(
      { type: e.target.value }
    )}
  
  handleYearChange=(e)=>{
    this.setState({ yearSelected: e.target.value });
    this.props.requestHolidayList({year:e.target.value});
  }
  
  addHoliday=()=>{
    this.props.requestAddHoliday({data:this.state,token:getToken()})
  }

  deleteHoliday=(id)=>{
    this.props.requestDeleteHoliday({id:id,token:getToken()})
  }

  render () {
    let {isLoading, data} = this.props.holidaysList;
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Holidays List'} showLoading={isLoading} />
          <div className="app-footer">
          </div>
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12">
                  <HolidaysList 
                  holidays={data.holidays} 
                  addHoliday={this.addHoliday} 
                  isAdmin={this.props.loggedUser.data.role==="Admin"} 
                  holidayType={this.props.holidayType.data.holiday_type_list}
                  yearArray={this.year}
                  handleDateChnage={this.handleDateChnage}
                  handleHolidayNameChnage={this.handleHolidayNameChnage}
                  handleTypeChnage={this.handleTypeChnage}
                  handleYearChange={this.handleYearChange}
                  deleteHoliday={this.deleteHoliday}
                  state={this.state}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:     state.frontend.toJS(),
    loggedUser:   state.logged_user.userLogin,
    holidaysList: state.holidaysList.holidaysList,
    addHoliday :  state.holidaysList.addHolidays,
    deleteHoliday:state.holidaysList.deleteHolidays,
    holidayType : state.holidaysList.holidayType
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Holidays));
