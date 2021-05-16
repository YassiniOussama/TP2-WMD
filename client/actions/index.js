export const CREATE_BOARD = "CREATE_BOARD";
export const GET_BOARD = "GET_BOARD";
export const NEXT_BOARD = "NEXT_BOARD";
export const PREVIOUS_BOARD = "PREVIOUS_BOARD";
export const SET_BOARD = "SET_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const UPDATE_BOARD = "UPDATE_BOARD";
export const CREATE_POSTIT = "CREATE_POSTIT";
export const DELETE_POSTIT = "DELETE_POSTIT";
export const UPDATE_POSTIT = "UPDATE_POSTIT";

export function createBoard(payload) {
    return { type: CREATE_BOARD, payload };
}

export function createPostIt(payload) {
    return { type: CREATE_POSTIT, payload };
}

export function nextBoard(index) {
    return { type: NEXT_BOARD, index };
}

export function previousBoard(index) {
    return { type: PREVIOUS_BOARD, index };
}

export function setBoard(index, payload) {
    return { type: SET_BOARD, index, payload };
}

export function getBoard(index) {
    return { type: GET_BOARD, index, payload };
}

export function deleteBoard() {
    return { type: DELETE_BOARD };
}

export function deletePostIt(id) {
    return { type: DELETE_POSTIT, id };
}

export function updateBoard(payload) {
    return { type: UPDATE_BOARD, payload };
}

export function updatePostIt(index_postit, payload) {
    return { type: UPDATE_POSTIT, index_postit, payload };
}