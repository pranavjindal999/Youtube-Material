import Vue from "vue";
import Component from "vue-class-component";
import { i18n } from "@/services/i18n";

const DEFAULT_TIMEOUT = 5000;

@Component
export default class ToastComponent extends Vue {
  private message: string = "";
  private intent: ToastIntent = "info";
  private shake = false;
  private isVisible = false;
  private transitionTime = 0;
  private progress = 0;
  private intervalId?: number;
  private promise?: Promise<undefined>;
  private promiseResolver?: () => void;
  private toShowProgress: boolean = true;
  private noClose: boolean = false;
  private isMouseOver: boolean = false;

  get progressBarStyle() {
    return {
      transition: `${this.transitionTime}s all linear`,
      width: `${this.progress}%`
    };
  }

  /**
   * Hides any visible toast immediately.
   *
   * @memberof ToastComponent
   */
  public hide() {
    this.isVisible = false;
    clearInterval(this.intervalId!);
    this.promiseResolver!();
    document.body.style.paddingBottom = "";
  }

  /**
   * Shows a toast as per input options.
   *
   * @param {IToastOptions} options
   * @returns {Promise<undefined>} Returned promise is resolved when toast closes.
   * @memberof ToastComponent
   */
  public show(options: IToastOptions): Promise<undefined> {
    this.message = i18n.t(options.message) as string;
    this.intent = options.intent;
    this.noClose = options.noCloseButton || false;
    let timeout = options.timeout || DEFAULT_TIMEOUT;
    this.toShowProgress = isFinite(timeout);

    this.transitionTime = 0.1;
    this.progress = 100;

    if (this.isVisible) {
      this.hide();
      if (!options.noShake) {
        this.shake = true;
        setTimeout(() => {
          this.shake = false;
        }, 1000);
      }
    }

    this.promise = new Promise(resolve => (this.promiseResolver = resolve));

    this.isVisible = true;
    document.body.style.paddingBottom = "54px";
    let timesCanRun = timeout / 500;
    let timesAlreadyRun = 0;

    if (this.toShowProgress)
      this.intervalId = setInterval(() => {
        this.transitionTime = 0.5;
        if (!document.hidden && !this.isMouseOver) {
          this.progress -= Math.floor(100 / timesCanRun);
          timesAlreadyRun++;
        }
        if (timesCanRun == timesAlreadyRun) {
          setTimeout(this.hide, 500);
        }
      }, 500);

    return this.promise;
  }
}

/**
 * Possible options for toast
 *
 * @interface IToastOptions
 */
interface IToastOptions {
  /**
   * Message or translation key to show in toast
   *
   * @type {string}
   * @memberof IToastOptions
   */
  message: string;
  /**
   * Intent of toast based on which color and icon of toast is deciced.
   *
   * @type {ToastIntent}
   * @memberof IToastOptions
   */
  intent: ToastIntent;
  /**
   * Time in ms after which toast will be closed automatically. Default time from config.
   *
   * @type {number}
   * @memberof IToastOptions
   */
  timeout?: number;
  /**
   * When show function is called while another toast is visible
   * if true, toast will not shake.
   * else toast will shake.
   *
   * @type {boolean}
   * @memberof IToastOptions
   */
  noShake?: boolean;
  /**
   * if true, close button on toast will not be shown
   *
   * @type {boolean}
   * @memberof IToastOptions
   */
  noCloseButton?: boolean;
}

type ToastIntent = "error" | "success" | "info";
