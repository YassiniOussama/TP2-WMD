import { CREATE_BOARD, NEXT_BOARD, DELETE_BOARD } from '../actions/index';

const initialState = {
  index: 0, // initialise votre presentation au mur 1
  boards: [
    {
      type: "board",
      id: "1",
      title: "TIW 8",
      notes: "",
      postits: [
        {
          type: "postit",
          board: "1",
          title: "TP 1",
          text: "TP Slack",
          visible: false,
          color: "#CCC",
        },
        {
          type: "postit",
          board: "1",
          title: "TP 2",
          text: "TP React",
          visible: true,
          color: "#00E",
        },
        {
          type: "postit",
          board: "1",
          title: "TP 3",
          text: "Tp WebRTC",
          visible: true,
          color: "#00E",
        },
        {
          type: "postit",
          board: "1",
          title: "TP 4",
          text: "Le TP 4",
          visible: true,
          color: "#0E0",
        },
      ]
    },
    {
      type: "board",
      id: "2",
      title: "Courses",
      notes: "",
      postits: [
        {
          type: "postit",
          board: "2",
          title: "Course 1",
          text: "Course React",
          visible: false,
          color: "#CCC",
        },],
    },
  ] // vous pouvez réutiliser votre état de murs initial.
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOARD:
      return {
        boards: state.boards.concat(action.payload),
        index: state.index
      };
    case NEXT_BOARD:
      console.log('2éé');
      return{
        ...state,
       // boards: state,
        index: state.index+1
      };
    case DELETE_BOARD:
      return;
    default:
      return state
  }
};
export default rootReducer;