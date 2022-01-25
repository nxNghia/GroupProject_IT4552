import { constances as ACTIONS } from "../constances";

const defaultState = {
    other_users: [],
    report_message: '',
    raise_report_modal: false,
    blocked: false
}

export const userReducer = (state = defaultState, action) => {
    switch (action.type)
    {
        case ACTIONS.FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                fetchUserError: false
            }

        case ACTIONS.FETCH_USER_ERROR:
            return {
                ...state,
                fetchUserError: true
            }

        case ACTIONS.FETCH_USERS:
            return {
                ...state,
                other_users: action.users
            }

        case ACTIONS.REPORT_SENT:
            return {
                ...state,
                report_message: 'Successfully sent report',
                raise_report_modal: true
            }

        case ACTIONS.REPORT_ERROR:
            return {
                ...state,
                report_message: 'Error',
                raise_report_modal: true
            }

        case ACTIONS.REPORT_BEGIN:
            return {
                ...state,
                raise_report_modal: action.open,
                report_message: action.open ? 'Confirm report' : '',
                reportId: action.open ? action.userId : null
            }

        case ACTIONS.UPDATE_USER_STATUS:
            return {
                ...state,
                blocked: action.blocked
            }

        default: return state
    }
}