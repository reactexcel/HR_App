import {fireAjax} from '../../../services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from '../../../redux/actions';
import {CONFIG} from '../../../config/index';

export function* getTeamStats (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_team_stats',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_team_stats',
      'express_request_method': 'POST',
      'express_request_body':   ''
    });
    if (response.error === 0) {
      yield put(actions.successTeamStats(response.data));
    } else {
      yield put(actions.errorTeamStats(response.message));
    }
  } catch (e) {
    yield put(actions.errorTeamStats('Error Occurs !!'));
    console.warn('Some error found in "get_team_stats" Request action\n', e);
  }
}

export function* getMonthlyReportAllUsers (action) {
  try { 
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_monthly_report_all_users',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_monthly_report_all_users',
      'express_request_method': 'POST',
      'express_request_body':   action.payload
    });
    if (response.error === 0) {
      yield put(actions.successMonthlyReportAllUsers(response.data));
    } else {
      yield put(actions.errorMonthlyReportAllUsers(response.message));
    }
  } catch (e) {
    yield put(actions.errorMonthlyReportAllUsers('Error Occurs !!'));
    console.warn('Some error found in "get_monthly_report_all_users" Request action\n', e);
  }
}

export function* getEmployeLifeCycle (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_termination_joining_stats',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_termination_joining_stats',
      'express_request_method': 'POST',
      'express_request_body':   {
        'startYear': action.payload.start_year,
        'endYear':   action.payload.end_year
      }
    });
    if (response.error === 0) {
      yield put(actions.successEmployeLifeCycle(response.data));
    } else {
      yield put(actions.errorEmployeLifeCycle(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeLifeCycle('Error Occurs !!'));
    console.warn('Some error found in "get_termination_joining_stats" Request action\n', e);
  }
}

export function* getUserIdList (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_user_list',
      'express_request_url':    CONFIG.expressRequestUrl + '/user/get_user_list',
      'express_request_method': 'POST',
      'express_request_body':   ''
    });
    if (response.error === 0) {
      yield put(actions.successUserList(response.data));
    } else {
      yield put(actions.errorUserList(response.message));
    }
  } catch (e) {
    yield put(actions.errorUserList('Error Occurs !!'));
    console.warn('Some error found in "get_user_list" Request action\n', e);
  }
}

export function* getEmployeeHours (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_employee_hours',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_employee_hours',
      'express_request_method': 'POST',
      'express_request_body':   {
        'user_id': action.payload.id,
        'date': action.payload.date,
        'month':   action.payload.month,
        'year':    action.payload.year
      }
    });
    if (response.error === 0) {
      yield put(actions.successEmployeeHours(response.data));
    } else {
      yield put(actions.errorEmployeeHours(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeeHours('Error Occurs !!'));
    console.warn('Some error found in "get_employee_hours" Request action\n', e);
  }
}

export function* getEmployeeMonthlyHours (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_employee_monthly_hours',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_monthly_report',
      'express_request_method': 'POST',
      'express_request_body':   {
        'user_id': action.payload.id,
        'month':   action.payload.month,
        'year':    action.payload.year
      }
    });
    if (response.error === 0) {
      yield put(actions.successEmployeeMonthlyHours(response.data));
    } else {
      yield put(actions.errorEmployeeMonthlyHours(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeeMonthlyHours('Error Occurs !!'));
    console.warn('Some error found in "get_employee_hours" Request action\n', e);
  }
}

export function* getEmployeePerformance (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_employee_performance',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_monthly_performance',
      'express_request_method': 'POST',
      'express_request_body':   {
        'month': action.payload.month,
        'year':  action.payload.year
      }
    });
    if (response.error === 0) {
      yield put(actions.successEmployeePerformance(response.data));
    } else {
      yield put(actions.errorEmployeePerformance(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeePerformance('Error Occurs !!'));
    console.warn('Some error found in "get_employee_hours" Request action\n', e);
  }
}

export function* getLeastActiveEmp(action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'get_average_working_hours',
      'start_date': action.payload.start_date,
      'end_date': action.payload.end_date
    });
    if (response.error === 0) {
      yield put(actions.successLeastActiveEmployee(response.data));
    } else {
      yield put(actions.errorLeastActiveEmployee(response.message));
    }
  } catch (e) {
    yield put(actions.errorLeastActiveEmployee('Error Occurs !!'));
    console.warn('Some error found in "get_employee_hours" Request action\n', e);
  }
}