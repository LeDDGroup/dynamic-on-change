interface IDataArrayProps<D> {
  onChange?(value: D[]): void;
  defaultValue: D[];
}

class DataArray<D> {
  public _data: D[];
  private _onChange = (index: number, value: D): void => {
    const data = this.data;
    data[index] = value;
    this.data = data;
  };
  constructor(private props: IDataArrayProps<D>) {
    const onChange = this._onChange;
    this._data = this.props.defaultValue;
    this.onChange = new Proxy({} as MapFunctionResult<D>, {
      get(target: MapFunctionResult<D>, index: number): MapSingleFunction<D> {
        if (target[index] === undefined) {
          target[index] = (value: D): void => {
            onChange(index, value);
          };
        }
        return target[index];
      },
    });
  }
  public get data(): D[] {
    return this._data;
  }
  public set data(value: D[]) {
    this._data = value;
    if (this.props.onChange) {
      this.props.onChange(this.data);
    }
  }
  public onChange: MapFunctionResult<D>;
}

type MapSingleFunction<T> = (value: T) => void;
type MapFunctionResult<T> = { [index: number]: MapSingleFunction<T> };

export { DataArray, IDataArrayProps };
