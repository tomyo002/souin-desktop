export type ClassName = { className?: string };

export type MultiDataTypes = {
  label: string;
  data: ReadonlyArray<number>;
  borderColor: string;
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

type authenticationType = 'type' | 'token';
