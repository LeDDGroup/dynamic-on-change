export type dynamicOnChange<T, K extends keyof T> = (value: T[K]) => void;
export type dynamicOnChanges<T> = { [K in keyof T]: dynamicOnChange<T, K> };

export function dynamicOnChange<T>(
  onChange: (key: keyof T, value: T[keyof T]) => void,
): dynamicOnChanges<T> {
  return new Proxy({} as dynamicOnChanges<T>, {
    get(target: dynamicOnChanges<T>, key: keyof T): dynamicOnChange<T, keyof T> {
      if ((target[key] as any) === undefined) {
        target[key] = (value: T[keyof T]): void => {
          onChange(key, value);
        };
      }
      return target[key];
    },
  });
}

export default dynamicOnChange;
