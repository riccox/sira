export type RGBColorNumberExpression = `${number}, ${number}, ${number}`;
export type RGBColorExpression = `rgb(${number}, ${number}, ${number})`;
export type RGBAColorExpression =
  `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEXColorExpression = `#${string}`;
export type ColorString =
  | RGBColorExpression
  | RGBAColorExpression
  | HEXColorExpression;

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};
