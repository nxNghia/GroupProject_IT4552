import { constances as ACTIONS } from '../constances'

export const setToken = (token) => {
    return {
        type: ACTIONS.SET_TOKEN,
        token
    };
};