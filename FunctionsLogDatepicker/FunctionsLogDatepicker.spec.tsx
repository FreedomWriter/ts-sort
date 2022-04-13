/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { formatDateTime } from '@helpers/time';
import MockFeatureFlag from '@stories/MockFeatureFlag';
import {
  fireEvent,
  renderConnected,
  screen,
  userEvent,
  waitFor,
} from '@test/helpers';
import { fromJS } from 'immutable';
import React from 'react';

import FunctionsLogDatepicker from './FunctionsLogDatepicker';

describe('Functions/FunctionsLogDatepicker', () => {
  it('should default to "Latest" selection', async () => {
    renderConnected(<FunctionsLogDatepicker />);

    const [selection] = await screen.findAllByText(/latest/i);

    expect(selection).toBeVisible();
  });

  it('should allow selection of a "Last hour" option', async () => {
    renderConnected(<FunctionsLogDatepicker />);

    const [selection] = await screen.findAllByText(/latest/i);

    userEvent.click(selection);

    expect(screen.getByText(/last hour/i)).toBeInTheDocument();
  });

  it('should allow selection of a custom option', async () => {
    renderConnected(<FunctionsLogDatepicker />);

    const [selection] = await screen.findAllByText(/latest/i);

    userEvent.click(selection);

    expect(screen.getByText(/custom/i)).toBeInTheDocument();
  });

  it('should auto-select custom option if date start date is edited', async () => {
    renderConnected(<FunctionsLogDatepicker />);

    const date = formatDateTime(new Date(Date.now() - 3600000 * 2));
    const startInput = screen.getByLabelText(/start date/i) as HTMLInputElement;
    const [select] = await screen.findAllByText(/latest/i);

    userEvent.type(startInput, `{selectall}${date}`);

    expect(select).toHaveTextContent('Custom');
  });

  it('should auto-select custom option if date end date is edited', async () => {
    renderConnected(<FunctionsLogDatepicker />);

    const date = formatDateTime(new Date(Date.now() - 360000));
    const endInput = screen.getByLabelText(/start date/i) as HTMLInputElement;
    const [select] = await screen.findAllByText(/latest/i);

    userEvent.type(endInput, `{selectall}${date}`);

    expect(select).toHaveTextContent('Custom');
  });

  it('should emit the range when changing to a valid date/time', async () => {
    const handleChange = (v) => {
      value = v;
    };
    const date = formatDateTime(new Date(Date.now() - 3600000 * 2));
    let value;
    renderConnected(<FunctionsLogDatepicker onChange={handleChange} />);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const form = document.querySelector('form')!;
    const startInput = screen.getByLabelText(/start date/i) as HTMLInputElement;

    userEvent.type(startInput, `{selectall}${date}`);
    fireEvent.submit(form);
    userEvent.tab();

    expect(value?.range?.from.toISOString()).toBe(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      new Date(date!).toISOString()
    );
  });

  it('should not emit the range when changing to an invalid time', async () => {
    const handleChange = (v) => {
      value = v;
    };
    const invalidDate = formatDateTime(new Date(Date.now() - 3600000 * 48));
    let value;
    renderConnected(<FunctionsLogDatepicker onChange={handleChange} />);

    const form = document.querySelector('form');
    const startInput = screen.getByLabelText(/start date/i) as HTMLInputElement;

    userEvent.type(startInput, `{selectall}${invalidDate}`);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.submit(form!);
    userEvent.tab();

    expect(value?.range?.from.toISOString()).not.toBe(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      new Date(invalidDate!).toISOString()
    );
  });

  it('should emit the range when changing to a valid time with new 7 day retention (with pro+ team)', async () => {
    const initialState = {
      accounts: fromJS({
        entities: {
          'test-team': {
            name: 'testing-team',
            slug: 'test-team',
            type_slug: 'pro-v4',
          },
        },
        selected: 'test-team',
      }),
    };
    const handleChange = (v) => {
      value = v;
    };
    const validDate = formatDateTime(new Date(Date.now() - 3600000 * 24 * 6));
    let value;
    renderConnected(
      <MockFeatureFlag mockFlags={{ project_glastrier_ui: true }}>
        <FunctionsLogDatepicker onChange={handleChange} />
      </MockFeatureFlag>,
      { initialState }
    );

    const form = document.querySelector('form');
    const startInput = screen.getByLabelText(/start date/i) as HTMLInputElement;

    userEvent.type(startInput, `{selectall}${validDate}`);
    fireEvent.submit(form!);
    userEvent.tab();

    expect(value?.range?.from.toISOString()).toBe(
      new Date(validDate!).toISOString()
    );
  });

  it('should emit the range when changing to a valid time with 1 day retention (with starter account)', async () => {
    const initialState = {
      accounts: fromJS({
        entities: {
          'test-team': {
            name: 'testing-team',
            slug: 'test-team',
            type_slug: 'starter',
          },
        },
        selected: 'test-team',
      }),
    };
    const handleChange = (v) => {
      value = v;
    };
    const validDate = formatDateTime(new Date(Date.now() - 3600000 * 24 * 1));
    let value;
    renderConnected(
      <MockFeatureFlag mockFlags={{ project_glastrier_ui: true }}>
        <FunctionsLogDatepicker onChange={handleChange} />
      </MockFeatureFlag>,
      { initialState }
    );

    const form = document.querySelector('form');
    const startInput = screen.getByLabelText(/start date/i) as HTMLInputElement;

    userEvent.type(startInput, `{selectall}${validDate}`);
    fireEvent.submit(form!);
    userEvent.tab();

    expect(value?.range?.from.toISOString()).toBe(
      new Date(validDate!).toISOString()
    );
  });

  it('should not emit the range when changing to an invalid time with new 7 day retention (with pro+ team)', async () => {
    const initialState = {
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
    };

    const handleChange = (v) => {
      value = v;
    };
    const validDate = formatDateTime(new Date(Date.now() - 3600000 * 24 * 10));
    let value;
    renderConnected(
      <MockFeatureFlag mockFlags={{ project_glastrier_ui: true }}>
        <FunctionsLogDatepicker onChange={handleChange} />
      </MockFeatureFlag>,
      { initialState }
    );

    const form = document.querySelector('form');
    const startInput = screen.getByLabelText(/start date/i) as HTMLInputElement;

    userEvent.type(startInput, `{selectall}${validDate}`);
    fireEvent.submit(form!);
    userEvent.tab();

    expect(value?.range?.from.toISOString()).not.toBe(
      new Date(validDate!).toISOString()
    );
  });

  it('should update the input with the correct value when selecting preset from dropdown', async () => {
    const initialState = {
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
    };

    const handleChange = (v) => {
      value = v;
    };
    let value;

    renderConnected(
      <MockFeatureFlag mockFlags={{ project_glastrier_ui: true }}>
        <FunctionsLogDatepicker onChange={handleChange} />
      </MockFeatureFlag>,
      { initialState }
    );
    const [selection] = await screen.findAllByText(/latest/i);

    userEvent.click(selection);

    const lastDayOption = await screen.findByText(/last 2 days/i);
    const startInput = screen.getByLabelText(/start date/i) as HTMLInputElement;

    userEvent.click(lastDayOption);

    await waitFor(() => {
      expect(startInput.value).toBe(formatDateTime(value?.range?.from));
    });
  });
});
