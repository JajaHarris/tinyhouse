export class AppState<TData> {

  constructor(public data: TData | null = null, 
              public loading: boolean = false,
              public error: boolean = false){}

  public static forLoading<TData>(): AppState<TData> {
    return new AppState<TData>(null, true, false);
  }

  public static forError<TData>(): AppState<TData> {
    return new AppState<TData>(null, false, true);
  }
}