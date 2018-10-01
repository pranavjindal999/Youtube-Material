import { sleep } from "@/extras/sleep";

class TopProgressWrapper {
  private asyncInstance = import("toprogress2").then(async module => {
    let instance = new module.ToProgress({
      color: "#ffffff",
      height: "2px",
      duration: 0.2,
      position: "top",
      selector: "body"
    });

    let elem: HTMLDivElement = (instance as any).element;
    elem.style.zIndex = "99999999999999";

    await sleep();
    return instance;
  });
  private noOfPendingRequests = 0;

  async startAuto(promise: Promise<any>) {
    let instance = await this.asyncInstance;

    if (!this.noOfPendingRequests) {
      instance.start(8);
    }

    this.noOfPendingRequests++;

    promise
      .then(async () => {
        this.noOfPendingRequests--;

        await sleep(100);
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
