import React from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { stateSelector } from '../state/interface.js';
import { calcSelector, calcActions } from './state.js';

export const ExpenseSlider = connect(
  stateSelector({
    slider: calcSelector((store) => store.slider)
  }),
  {
    setSlider: calcActions.setSlider
  }
)(function ExpenseSlider(props) {
  // props
  const { slider } = props;

  // actions
  const { setSlider } = props;

  return (
    <div className="slider-container">
      <Slider
        min={0}
        max={100}
        startPoint={0}
        defaultValue={15}
        value={slider}
        onChange={(val) => {
          setSlider(val);
        }}
      />
    </div>
  );
});
