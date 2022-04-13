import configureStore from '@store/configureStore';
import MockFeatureFlag from '@stories/MockFeatureFlag';
import { fromJS } from 'immutable';
import React from 'react';
import { Provider } from 'react-redux';

import FunctionsLogDatepicker from './FunctionsLogDatepicker';

export default {
  title: 'Functions/FunctionsLogDatePicker',
  component: FunctionsLogDatepicker,
};
export const Default = () => (
  <Provider store={configureStore()}>
    <FunctionsLogDatepicker />
  </Provider>
);

export const defaultWithFeatureFlagEnabled = () => (
  <Provider store={configureStore()}>
    <MockFeatureFlag mockFlags={{ project_glastrier_ui: true }}>
      <FunctionsLogDatepicker />
    </MockFeatureFlag>
  </Provider>
);

export const withProPlusAccountAndFeatureFlagEnabled = () => (
  <Provider
    store={configureStore({
      accounts: fromJS({
        entities: {
          'test-team': {
            name: 'testing-team',
            slug: 'test-team',
            type_slug: 'enterprise',
          },
        },
        selected: 'test-team',
      }),
    })}
  >
    <MockFeatureFlag mockFlags={{ project_glastrier_ui: true }}>
      <FunctionsLogDatepicker />
    </MockFeatureFlag>
  </Provider>
);
