import React, { FormEvent, useContext, useState } from 'react';
import { ChartContext } from 'src/context';
import { ChartType, getFormElements, path } from 'src/utils';

import { ButtonOutline, Icon } from '../atomic';
import { Form, InputProps } from '../molecule';

const defaultLabelsElements: ReadonlyArray<string> = [];

const createChart = (form: HTMLFormElement, labels: ReadonlyArray<string>) => {
  const elements = getFormElements(form, 'title', 'max', ...labels);

  const newLabels = labels.reduce((acc, current) => {
    acc = [...acc, elements[current]];

    return acc;
  }, defaultLabelsElements);

  const chart: ChartType = {
    title: elements.title,
    labels: newLabels,
    max: parseInt(elements.max),
  };

  return chart;
};

const defaultInputLabel: InputProps = {
  icon: 'key',
  placeholder: 'label',
  type: 'text',
};

export const ChartForm: React.FC = () => {
  const { charts, setCharts } = useContext(ChartContext);
  const [inputsLabels, setInputsLabels] = useState<ReadonlyArray<InputProps>>([
    { ...defaultInputLabel, id: 'label1' },
  ]);
  const [labels, setLabels] = useState(['label1']);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCharts([
      ...charts,
      createChart(event.target as HTMLFormElement, labels),
    ]);
  };

  return (
    <Form
      inputs={[
        {
          icon: 'input.name',
          id: 'title',
          placeholder: 'Title',
          type: 'text',
        },
        {
          icon: 'settings',
          id: 'max',
          placeholder: 'max data points',
          type: 'number',
        },
        ...inputsLabels,
      ]}
      route={path.CHART}
      submit={submit}
      title="Chart"
    >
      <div className="flex justify-center gap-8">
        <ButtonOutline
          onClick={() => {
            if (labels.length) {
              setLabels(labels.slice(0, -1));
              setInputsLabels(inputsLabels.slice(0, -1));
            }
          }}
        >
          <Icon name="minus" />
        </ButtonOutline>
        <ButtonOutline
          onClick={() => {
            setLabels([...labels, `label${labels.length + 1}`]);
            setInputsLabels([
              ...inputsLabels,
              { ...defaultInputLabel, id: `label${labels.length + 1}` },
            ]);
          }}
        >
          <Icon name="plus" />
        </ButtonOutline>
      </div>
    </Form>
  );
};
