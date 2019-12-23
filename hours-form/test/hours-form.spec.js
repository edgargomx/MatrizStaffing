/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";

import "../hours-form.js";

describe("Suite cases", () => {
  it("Case default", async () => {
    const _element = await fixture("<hours-form></hours-form>");
    assert.strictEqual(_element.hello, 'Hello World!');
  });
});
