import {Env} from "@tsed/core";
import {Log} from "./Log";

@Log({env: Env.TEST})
class Test {
  constructor(...args: any[]) {
  }
}

describe("Log", () => {
  beforeEach(() => {
    let index = 0;
    jest.spyOn(console, "log").mockImplementation((...args: any[]) => {
      process.stdout.write(`[${index}][ENV:${process.env.NODE_ENV}] ${args.join(" ")}\n`);
      index++;
    });
  });

  it("should display log", () => {
    // TEST 1
    process.env.NODE_ENV = Env.TEST;

    new Test("Hello", "world");

    expect(console.log).toHaveBeenCalledWith("Class Test have been called with Hello,world");
  })

  it('should not display log', () => {
    // TEST 2
    process.env.NODE_ENV = Env.PROD;

    new Test("Hello", "world2");

    expect(console.log).not.toHaveBeenCalled();
  })
});
