export const isBoardValid = (board) => {
  return (
    !!board.organization &&
    !!board.token &&
    !!board.project &&
    !!board.team &&
    !!(board.types || []).length &&
    !!(board.columns || []).length
  );
};
