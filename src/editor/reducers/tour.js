const tour = (state = { active: false, step: 1 }, action = { type: null }) => {
  switch (action.type) {
    case 'TOUR_SET_STEP':
      return {
        ...state,
        step: action.step,
      };
    case 'TOUR_START':
      return {
        step: 1,
        active: true,
      };
    case 'TOUR_STOP':
      return {
        step: 1,
        active: false,
      };
    default:
      return state;
  }
};

export default tour;
