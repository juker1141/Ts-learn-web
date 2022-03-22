export class Attributes<T> {
  constructor(private data: T) {};

  // 泛型: K 是 T 物件的一個 key 值
  // 以 UserProps 來說會是 name age id

  // 使用 arrow Function 這樣他就沒有自己的 this
  // 會呼叫他父元素身上的 this
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(update: T): void {
    Object.assign(this.data, update);
  };

  getAll(): T {
    return this.data;
  }
};