import { constances as ACTIONS } from '../constances'

export const updateVolume = (volume) => {
    return {
        type: ACTIONS.UPDATE_VOLUME,
        volume
    };
  };
  