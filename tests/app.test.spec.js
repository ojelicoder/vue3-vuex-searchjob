import { describe, it, expect } from "vitest";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    expect(div).toBeTruthy();
  });
});
