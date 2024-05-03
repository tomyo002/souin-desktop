export type ClassName = { className?: string };

export type MultiDataTypes = {
  label: string;
  data: ReadonlyArray<number>;
  borderColor: string;
};

export type InstanceType = {
  name: string;
  baseUrl: string;
  authentication?: string;
};
