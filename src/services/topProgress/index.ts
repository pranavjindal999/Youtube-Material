class TopProgressWrapper {
  private asyncInstance = import("toprogress2").then(module => {
    let instance = new module.ToProgress({
      color: "#ffffff",
      height: "3px",
      duration: 0.5,
      position: "top",
      selector: "body"
    });

    let elem: HTMLDivElement = (instance as any).element;
    elem.style.zIndex = "99999999999999";

    return instance;
  });
  private noOfPendingRequests = 0;

  async startAuto(promise: Promise<any>) {
    let instance = await this.asyncInstance;

    if (!this.noOfPendingRequests) {
      instance.start(5);
    }

    this.noOfPendingRequests++;

    promise
      .then(() => {
        this.noOfPendingRequests--;

        if (!this.noOfPendingRequests) {
          instance.finish();
        }
      })
      .catch(() => {
        this.noOfPendingRequests = 0;
        instance.reset();
      });
  }
}

export const TopProgress = new TopProgressWrapper();
