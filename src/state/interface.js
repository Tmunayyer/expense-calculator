/**
 * Note: This pattern is not my idea but this is my implementation of it.
 *
 */

import { combineReducers } from 'redux';

const _globalState = {};

/**
 * This function will take in state name and the "mechanism"
 *  in which to build state and create the redux recognizable
 *  reducer object.
 *
 * @param {string} stateName
 * @param {object} mechanism
 */
export const mapState = (stateName, mechanism) => {
  // dont overwrite states
  if (_globalState[stateName] !== undefined) {
    throw new Error('State with that name is already defined:', stateName);
  }

  // redux recognizable reducer using name and mechanism inputs
  _globalState[stateName] = (state = mechanism.initial, _action) => {
    const [predicate, actionType] = _action.type.split(':');

    // prevent common reducer name collision
    if (predicate !== stateName) return state;

    // for dev purposes
    console.log(_action);

    if (mechanism.actions[actionType]) {
      return mechanism.actions[actionType](state, _action.payload);
    }

    return state;
  };

  /**
   * Lets define the mapStateToProps and mapDispatchToProps here
   *    to be a bit more expressive within our functions
   */
  // actions
  const actionSelector = Object.keys(mechanism.actions).reduce(
    /**
     * looping over the actions, well create and object
     *    with the same action names as defined on the mechanism and
     *    create the actionCreators that we need to fire to invoke
     *    saga dispatch
     */
    (acc, actionName) => {
      return {
        ...acc,
        [actionName]: (payload) => {
          return { type: `${stateName}:${actionName}`, payload: payload };
        }
      };
    },
    {}
  );

  /**
   * Used within the standard redux connect function, it will be passed
   *    the state object. We then can invoke it passing the property we want
   *    to extract out of state
   */
  const propSelector = (selectorFunction) => (state) => {
    return selectorFunction(state[stateName]);
  };

  return [propSelector, actionSelector];
};

export const stateSelector = (desiredPropsObject) => (_state) => {
  const output = {};

  for (let key in desiredPropsObject) {
    output[key] = desiredPropsObject[key](_state);
  }

  return output;
};

export const rootReducer = () => combineReducers(_globalState);
