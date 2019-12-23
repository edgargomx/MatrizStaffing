/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";

import "../ib-login.js";

describe("Suite cases", () => {
  it("Case default", async () => {
    const _element = await fixture("<ib-login></ib-login>");
    assert.strictEqual(_element.hello, 'Hello World!');
  });
});
