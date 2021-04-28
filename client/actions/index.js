export const CREATE_BOARD = "CREATE_BOARD";
export const NEXT_BOARD = "NEXT_BOARD";
export const PREVIOUS_BOARD = "PREVIOUS_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const CREATE_POSTIT = "CREATE_POSTIT";
export const DELETE_POSTIT = "DELETE_POSTIT";

export function createBoard(payload) {
    return { type: CREATE_BOARD, payload };
}
  
export function nextBoard(payload) {
    console.log('éé');
    return { type: NEXT_BOARD, payload };
}
  