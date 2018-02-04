/**
 * Base error class for custom errors
 */
export function BaseError(ErrorType: Function, message: string, ...props: any[]) {
  const instance = new Error(message);
  Object.keys(props)
    .map(k => ({ k, v: (props as any)[k] }))
    .map(({ k, v }) => {
      (instance as any)[k] = v;
    })
  ;

  return instance;
}
