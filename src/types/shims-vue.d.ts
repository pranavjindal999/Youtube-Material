import Vue from "vue";
declare module "vue/types/vue" {
  interface Vue {
    $ga: VueGA;
  }
}

interface VueGA {
  event(event: {
    /**
     * Typically the object that was interacted with (e.g. 'Video')
     *
     * @type {string}
     */
    eventCategory: string;
    /**
     * The type of interaction (e.g. 'play')
     *
     * @type {string}
     */
    eventAction: string;
    /**
     * Useful for categorizing events (e.g. 'Fall Campaign')
     *
     * @type {string}
     */
    eventLabel?: string;
    /**
     * A numeric value associated with the event (e.g. 42)
     *
     * @type {number}
     */
    eventValue?: number;
  }): void;

  page(page: {
    /**
     * The path portion of a URL. This value should start with a slash (/) character.
     *
     * @type {string}
     */
    page?: string;
    /**
     * The title of the page (e.g. homepage)
     *
     * @type {'Home page'}
     */
    title: "Home page";
    /**
     * URL of the page being tracked.
     *
     * @type {window.location.href}
     */
    location: string;
  }): void;

  time(timing: {
    /**
     * A string for categorizing all user timing variables into logical groups (e.g. 'JS Dependencies').
     *
     * @type {string}
     */
    timingCategory: string;
    /**
     * A string to identify the variable being recorded (e.g. 'load').
     *
     * @type {string}
     */
    timingVar: string;
    /**
     * The number of milliseconds in elapsed time to report to Google Analytics (e.g. 20).
     *
     * @type {number}
     */
    timingValue: number;
    /**
     * A string that can be used to add flexibility in visualizing user timings in the reports (e.g. 'Google CDN').
     *
     * @type {string}
     */
    timingLabel?: string;
  }): void;

  /**
   * Sets a single field and value pair or a group of field/value pairs on a tracker object.
   *
   * @param {string} fieldName
   * @param {string} fieldValue
   * @memberof VueGA
   */
  set(fieldName: string, fieldValue: string): void;
}
