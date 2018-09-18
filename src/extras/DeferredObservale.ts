export class DeferredObservale<T = any> {
  onable: Onable<T>;
  next!: (data?: T) => void;

  constructor() {
    this.onable = new Onable<T>(next => {
      this.next = next;
    });
  }
}

export class Onable<T = any> {
  private callbacks: Function[];
  private next(data?: T) {
    this.callbacks.forEach(cb => cb(data));
  }

  constructor(setNext: (next: (data?: T) => void) => void) {
    this.callbacks = [];
    setNext(this.next.bind(this));
  }

  on(callback: Function) {
    this.callbacks.push(callback);
  }
}
