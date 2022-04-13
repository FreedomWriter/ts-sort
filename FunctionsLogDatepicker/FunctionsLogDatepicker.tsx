import { getSelectedAccount } from '@actions/accounts';
import { useFlags } from '@app/context/featureFlag/FeatureFlagProvider';
import { isPlanProOrHigher } from '@helpers/plans';
import { isDateBefore, isDateEqual } from '@helpers/time';
import { useSelector } from '@store/hooks';
import DateRangeInput from '@ui/DateRangeInput';
import Dropdown from '@ui/Dropdown';
import { DecorativeIcon } from '@ui/Icon';
import React, { useEffect, useMemo, useState } from 'react';

import useFunctionLogsTrack from '../useFunctionLogsTrack';

const daysAgo = (day = 1) => new Date(Date.now() - 3600000 * 24 * day);
const hoursAgo = (hour = 1) => new Date(Date.now() - 3600000 * hour);
const now = () => new Date();

const LAST_HOUR = 'Last hour';
const LAST_2_HOURS = 'Last 2 hours';
const LAST_DAY = 'Last day';
const LAST_2_DAYS = 'Last 2 days';
const LAST_7_DAYS = 'Last 7 days';
const LATEST = 'Latest';
const CUSTOM = 'Custom';

const EQUALITY_UNIT = 'minute';

const DATETIME_RANGE_CONFIG = {
  [LATEST]: () => ({
    from: null,
    to: null,
  }),
  [LAST_HOUR]: () => ({
    from: hoursAgo(1),
    to: now(),
  }),
  [LAST_2_HOURS]: () => ({
    from: hoursAgo(2),
    to: now(),
  }),
  [LAST_DAY]: () => ({
    from: daysAgo(1),
    to: now(),
  }),
  [LAST_2_DAYS]: () => ({
    from: daysAgo(2),
    to: now(),
  }),
  [LAST_7_DAYS]: () => ({
    from: daysAgo(7),
    to: now(),
  }),
  [CUSTOM]: (flag = false, isProPlus = false) => ({
    from: flag ? daysAgo(isProPlus ? 7 : 1) : hoursAgo(1),
    to: now(),
  }),
};

const DROPDOWN_OPTIONS = (flag = false, isProPlus = false) => {
  const allOptions = Object.keys(DATETIME_RANGE_CONFIG);
  const getOptionsByAccountType = () =>
    isProPlus
      ? allOptions
      : [LATEST, LAST_HOUR, LAST_2_HOURS, LAST_DAY, CUSTOM];

  const options = !flag
    ? [LATEST, LAST_HOUR, CUSTOM]
    : getOptionsByAccountType();

  return options.map((label) => ({
    id: label,
    label,
    children: (
      <span className="tw-inline-flex tw-items-center tw-whitespace-nowrap dark:tw-text-white">
        <DecorativeIcon name="clock" />
        <span className="tw-ml-1">{label}</span>
      </span>
    ),
    className: 'tw-inline-flex tw-items-center tw-whitespace-nowrap',
  }));
};

const [INITIAL_SELECTED_OPTION] = DROPDOWN_OPTIONS();

interface DateRange {
  to: Date | null;
  from: Date | null;
}

interface FunctionLogsDatepickerProps {
  lastDeploy?: Date;
  onChange?: ({ range: DateRange, id: string }) => void;
}

const FunctionLogsDatepicker: React.FC<FunctionLogsDatepickerProps> & {
  getInitialDateRange: () => DateRange;
} = ({
  lastDeploy,
  onChange = ({ range: DateRange, id: string }) => undefined,
}) => {
  const flags = useFlags();
  const { track } = useFunctionLogsTrack();
  const isProPlus = useSelector((state) => {
    const account = getSelectedAccount(state);
    const slug = account?.get('type_slug');

    return isPlanProOrHigher(slug);
  });
  const dropdownOptions = DROPDOWN_OPTIONS(
    flags.project_glastrier_ui,
    isProPlus
  );

  // For the minimum start date, we allow either 1 day from the
  // current time or the last deploy time (whichever is more recent),
  // but we are working to expand this limitation beyond 1 day and up to 7 days.
  // This increased retention is being developed behind the `project_glastrier_ui`
  // feature flag.
  const minStartDate = useMemo(() => {
    const minDateForPlan = isProPlus ? daysAgo(7) : daysAgo(1);
    const min = flags.project_glastrier_ui ? minDateForPlan : daysAgo(1);
    if (!lastDeploy) {
      return min;
    }

    return flags.project_glastrier_ui || isDateBefore(lastDeploy, min)
      ? min
      : lastDeploy;
  }, [flags.project_glastrier_ui, isProPlus, lastDeploy]);
  const maxEndDate = now();
  const [selectedOption, setSelectedOption] = useState(INITIAL_SELECTED_OPTION);
  const [selectedRange, setSelectedRange] = useState<DateRange>(
    DATETIME_RANGE_CONFIG[selectedOption.id](
      flags.project_glastrier_ui,
      isProPlus
    )
  );
  const [latestDisplayRange, setLatestDisplayRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const handleSelect = (selectedId: string) => {
    const option = dropdownOptions.find(({ id }) => id === selectedId);

    // @ts-ignore
    const range = DATETIME_RANGE_CONFIG[option.id](
      flags.project_glastrier_ui,
      isProPlus
    );
    // @ts-ignore
    setSelectedOption(option);
    setSelectedRange(range);
    // @ts-ignore
    onChange({ range, id: option.id });
    track('time_preset_clicked', { selected: selectedId });
  };
  const handleSubmitOrBlur = ({ start: from, end: to }) => {
    if (
      isDateEqual(from, selectedRange.from, EQUALITY_UNIT) &&
      isDateEqual(to, selectedRange.to, EQUALITY_UNIT)
    ) {
      return;
    }
    setSelectedRange({ to, from });
    onChange({ range: { to, from }, id: selectedOption.id });
  };

  const handleChange = () => {
    if (selectedOption.id === CUSTOM) {
      return;
    }
    const option = dropdownOptions.find(({ id }) => id === CUSTOM);
    // @ts-ignore
    setSelectedOption(option);
  };

  useEffect(() => {
    const timeout = 1000;
    const intervalId = window.setInterval(() => {
      setLatestDisplayRange((range) => ({ ...range, to: now() }));
    }, timeout);

    if (selectedOption.id === LATEST) {
      setLatestDisplayRange((range) => ({ ...range, from: now() }));
    }

    return () => {
      window.clearInterval(intervalId);
    };
  }, [selectedOption.id]);

  return (
    <div className="tw-flex tw-flex-wrap md:tw-flex-nowrap">
      <Dropdown
        className="tw-border-gray !tw-mt-0"
        toggle={selectedOption}
        items={dropdownOptions.map(({ label }) => label)}
        onSelect={handleSelect}
        selectedItem={selectedOption}
      />
      <div className="tw-ml-0 md:tw-mt-0 tw-mt-2 md:tw-ml-2">
        <DateRangeInput
          tooltipMessage="Filter the log using the following format: Mar 8, 2021 10:49 AM"
          onBlur={handleSubmitOrBlur}
          onSubmit={handleSubmitOrBlur}
          onChange={handleChange}
          onFocus={() => track('time_input_focused')}
          onTooltipClick={() => track('time_tooltip_clicked')}
          startValue={
            selectedOption.id === LATEST
              ? latestDisplayRange.from
              : selectedRange.from
          }
          endValue={
            selectedOption.id === LATEST
              ? latestDisplayRange.to
              : selectedRange.to || maxEndDate
          }
          minStartDate={minStartDate}
          maxEndDate={maxEndDate}
        />
      </div>
    </div>
  );
};

FunctionLogsDatepicker.getInitialDateRange = DATETIME_RANGE_CONFIG[LATEST];

export default FunctionLogsDatepicker;
