/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";

import "../hours-table.js";

describe("Suite cases", () => {
  it("Case default", async () => {
    const _element = await fixture("<hours-table></hours-table>");
    assert.strictEqual(_element.hello, 'Hello World!');
  });
});
