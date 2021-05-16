import { CREATE_BOARD, UPDATE_BOARD, DELETE_BOARD, CREATE_POSTIT, DELETE_POSTIT, UPDATE_POSTIT, SET_BOARD, GET_BOARD, NEXT_BOARD, PREVIOUS_BOARD } from '../actions/index';

const initialState = {
  index: 0,
  boards: [
    {
      type: "board",
      id: "0",
      title: "TIW 8",
      notes: "",
      postits: [
        {
          type: "postit",
          board: "0",
          title: "TP 1",
          text: "TP Slack",
          visible: false,
          color: "#CCC",
        },
        {
          type: "postit",
          board: "0",
          title: "TP 2",
          text: "TP React",
          visible: true,
          color: "#00E",
        },
        {
          type: "postit",
          board: "0",
          title: "TP 3",
          text: "Tp WebRTC",
          visible: true,
          color: "#00E",
        },
        {
          type: "postit",
          board: "0",
          title: "TP 4",
          text: "Le TP 4",
          visible: true,
          color: "#0E0",
        },
      ],
    },
    {
      type: "board",
      id: "1",
      title: "Courses",
      notes: "",
      postits: [
        {
          type: "postit",
          board: "1",
          title: "Course 1",
          text: "Course React",
          visible: false,
          color: "#CCC",
        },
        {
          type: "postit",
          board: "1",
          title: "Course 11",
          text: "Course React",
          visible: false,
          color: "#CCC",
        },],
    },
    {
      type: "board",
      id: "2",
      title: "Book",
      notes: "",
      postits: [
        {
          type: "postit",
          board: "2",
          title: "Book 1",
          text: "Book React",
          visible: false,
          color: "#CCC",
        },],
    },
  ],
};

function rootReducer(state = initialState, action) {
  let index_board = state.index;
  let id_postit = null;
  switch (action.type) {
    case CREATE_BOARD:
      return {
        boards: [
          ...state.boards, {
            type: 'board',
            id: state.boards.length + "",
            title: action.payload.title,
            active: true,
            notes: action.payload.notes,
            postits: [],
          }
        ],
        index: state.index
      };
    case NEXT_BOARD:
      return {
        ...state,
        index: action.index < state.boards.length - 1 ? action.index + 1 : state.boards.length - 1
      };
    case PREVIOUS_BOARD:
      return {
        ...state,
        index: action.index > 0 ? action.index - 1 : 0
      };
    case SET_BOARD:
      return {
        ...state,
        index: action.index
      };
    case GET_BOARD:
      return {
        ...state,
        index: action.index
      };
    case DELETE_BOARD:
      return {
        ...state,
        boards: [...state.boards.slice(0, index_board), ...state.boards.slice(index_board + 1)],
        index: state.index
      }
    case DELETE_POSTIT:
      id_postit = action.id;
      return {
        ...state,
        boards: [...state.boards.slice(0, index_board),
        {
          type: 'board',
          id: index_board,
          title: state.boards[index_board].title,
          active: true,
          notes: state.boards[index_board].notes,
          postits: [
            ...state.boards[index_board].postits.slice(0, id_postit),
            ...state.boards[index_board].postits.slice(id_postit + 1)
          ]
        },
          , ...state.boards.slice(index_board + 1)].flat(),
        index: state.index
      }
    case CREATE_POSTIT:
      return {
        ...state,
        boards: [...state.boards.slice(0, index_board),
        {
          type: 'board',
          id: index_board,
          title: state.boards[index_board].title,
          active: true,
          notes: state.boards[index_board].notes,
          postits: [
            ...state.boards[index_board].postits,
            {
              type: "postit",
              board: index_board,
              title: action.payload.title,
              text: action.payload.text,
              visible: false,
              color: "#CCC",
            },
          ]
        }
          , ...state.boards.slice(index_board + 1)],
      };
    case UPDATE_BOARD:
      return {
        ...state,
        boards:
          [
            ...state.boards.slice(0, index_board),
            {
              type: 'board',
              id: action.payload.id,
              title: action.payload.title,
              active: true,
              notes: action.payload.notes,
              postits: [
                ...state.boards[index_board].postits,
              ],
            },
            , ...state.boards.slice(index_board + 1),
          ].flat(),

        index: state.index,
      }
    case UPDATE_POSTIT:
      id_postit = action.index_postit
      return {
        ...state,
        boards:
          [
            ...state.boards.slice(0, index_board),
            {
              type: 'board',
              id: state.boards[index_board].id,
              title: state.boards[index_board].title,
              active: true,
              notes: state.boards[index_board].notes,
              postits: [
                ...state.boards[index_board].postits.slice(0, id_postit),
                {
                  type: "postit",
                  board: state.boards[index_board].id,
                  title: action.payload.title,
                  text: action.payload.text,
                  visible: false,
                  color: "#CCC",
                },
                ...state.boards[index_board].postits.slice(id_postit + 1)
              ].flat(),
            },
            , ...state.boards.slice(index_board + 1),
          ].flat(),
        index: state.index
      }
    default:
      return state
  }
};
export default rootReducer;