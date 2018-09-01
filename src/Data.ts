interface IDataProps<D> {
  onChange?(value: D): void;
  defaultValue: D;
}

class Data<D> {
  private _data: D;
  private _onChange = (property: keyof D, value: D[keyof D]): void => {
    this.data = Object.assign({}, this.data, { [property]: value });
  };
  constructor(private props: IDataProps<D>) {
    const onChange = this._onChange;
    this._data = this.props.defaultValue;
    this.onChange = new Proxy({} as MapFunctionResult<Required<D>>, {
      get(target: MapFunctionResult<Required<D>>, key: keyof D): MapSingleFunction<D, keyof D> {
        if (target[key] === undefined) {
          target[key] = (value: D[keyof D]): void => {
            onChange(key, value);
          };
        }
        return target[key];
      },
    });
  }
  public get data(): D {
    return this._data;
  }
  public set data(value: D) {
    this._data = value;
    if (this.props.onChange) {
      this.props.onChange(this.data);
    }
  }
  public readonly onChange: MapFunctionResult<Required<D>>;
}

type MapSingleFunction<T, K extends keyof T> = (value: T[K]) => void;
type MapFunctionResult<T> = { [K in keyof T]: MapSingleFunction<T, K> };

export { Data, IDataProps };
