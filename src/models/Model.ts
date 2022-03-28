import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  set(update: T): void;
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
};

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
};

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
};

interface HasId {
  id?: number;
};

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events,
  ) {}

  // 因為是使用 constructor 一開始的初始化，而不是後來才分配值的方式
  // 所以可以簡寫

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  // get on() {
  //   return this.events.on;
  // };

  // get trigger() {
  //   return this.events.trigger;
  // };

  // get get() {
  //   return this.attributes.get;
  // };

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  };

  fetch(): void {
    const id = this.get("id");

    if(typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    })
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
};