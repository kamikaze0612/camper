export const omitProperties = <T extends Object, K extends keyof T>(
  object: T,
  keys: { [P in K]?: true }
): { [P in keyof Omit<T, K>]: T[P] } => {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([key]) => !keys.hasOwnProperty(key) || !keys[key as K]
    )
  ) as any;
};
