import dayjs from "dayjs";

const defaultState = {
  initialTime: dayjs(), 
};

export default function (state = defaultState, action = {}) {
  switch (action.type) {
    case "SETTIME":
      return {
        ...state,

        timeStamp: action.time,
      };
    default:
      return state;
  }
}
