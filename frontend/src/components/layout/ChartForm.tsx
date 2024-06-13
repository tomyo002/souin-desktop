import React, { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartContext } from 'src/context';
import { ChartType, getFormElements, path } from 'src/utils';

import { ButtonOutline, H1, Icon } from '../atomic';
import { Input } from '../molecule';

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

export const ChartForm: React.FC = () => {
  const navigate = useNavigate();
  const { charts, setCharts } = useContext(ChartContext);
  const [labels, setLabels] = useState(['label1']);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCharts([
      ...charts,
      createChart(event.target as HTMLFormElement, labels),
    ]);
    navigate(path.CHART);
  };

  return (
    <>
      <H1 className="text-center" content="Chart" />
      <div className="flex gap-8">
        <ButtonOutline
          onClick={() => {
            if (labels.length) {
              setLabels(labels.slice(0, -1));
            }
          }}
        >
          <Icon name="minus" />
        </ButtonOutline>
        <ButtonOutline
          onClick={() => {
            setLabels([...labels, `label${labels.length + 1}`]);
          }}
        >
          <Icon name="plus" />
        </ButtonOutline>
      </div>
      <form className="flex flex-col gap-8" onSubmit={submit}>
        <Input icon="input.name" id="title" placeholder="Title" type="text" />
        <Input
          icon="settings"
          id="max"
          placeholder="Max points"
          type="number"
        />
        {labels.map(item => (
          <Input icon="key" id={item} placeholder="Label" type="text" />
        ))}
        <button className="btn btn-outline btn-success" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
