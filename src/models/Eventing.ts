type Callback = () => void;

export class Eventing {
  events: {
    [key: string]: Callback[],
  } = {};

  // 使用 arrow Function 這樣他就沒有自己的 this
  // 會呼叫他父元素身上的 this
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];

    handlers.push(callback);

    this.events[eventName] = handlers;
  };

  // 使用 arrow Function 這樣他就沒有自己的 this
  // 會呼叫他父元素身上的 this
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;

    handlers.forEach((callback: Callback): void => {
      callback();
    })
  };
};