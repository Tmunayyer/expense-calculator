const initialState = {
  count: 0
};

export default function(state = initialState, action) {
  if (action.type === 'setCount') {
    return { ...state, count: action.payload };
  }
  return { ...state };
}
