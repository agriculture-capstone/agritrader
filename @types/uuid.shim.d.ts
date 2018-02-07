declare module 'uuid/v4' {
  type V4Options = {random: number[]} | {rng(): number[]};

  type v4String = (options?: V4Options) => string;
  type v4 = v4String;

  const v4: v4;

  export = v4;
}
