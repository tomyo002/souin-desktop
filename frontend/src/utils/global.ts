export type ClassName = { className?: string };

export type MultiDataTypes = {
  label: string;
  data: ReadonlyArray<number>;
  borderColor: string;
};

export type ChartType = {
  title: string;
  labels: ReadonlyArray<string>;
  max: number;
};

export type InstanceType = {
  name: string;
  baseUrl: string;
  authentication?: authType;
};

export type InstanceProps = {
  name?: string;
  baseUrl?: string;
};
export type allowedAuthType = 'apikey' | 'basicauth' | 'jwt';
type authType = { token: string } & (
  | {
      type: 'basicauth' | 'jwt';
    }
  | {
      type: 'apikey';
      header: string;
    }
);

export const LOCAL = 'localStorage';
export const SQLITE = 'sqliteStorage';
export type AllowedStorage = 'localStorage' | 'sqliteStorage';

export const CHARTFORM = 'chartForm';
export const INSTANCEFORM = 'instanceForm';
export type FormType = 'chartForm' | 'instanceForm';

const defaultArrayFormElements: Record<string, string> = {};

export const getFormElements = (
  form: HTMLFormElement,
  ...names: ReadonlyArray<string>
) => {
  return names.reduce((acc, current) => {
    acc[current] = (
      form.elements.namedItem(current) as HTMLInputElement
    )?.value;
    return acc;
  }, defaultArrayFormElements);
};
