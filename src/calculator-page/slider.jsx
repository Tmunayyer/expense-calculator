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
      <div>Election</div>
      <Slider
        marks={{
          0: {
            style: {
              width: '100px !important'
            },
            label: 'Min: 0%'
          },
          30: {
            label: 'Max: 30%'
          }
        }}
        trackStyle={{
          backgroundColor: '#f28a1b'
        }}
        handleStyle={{
          borderColor: '#f28a1b'
        }}
        dotStyle={{
          borderColor: '#f28a1b'
        }}
        min={0}
        max={30}
        startPoint={0}
        value={slider * 100}
        onChange={(val) => {
          setSlider(val / 100);
        }}
      />
    </div>
  );
});
