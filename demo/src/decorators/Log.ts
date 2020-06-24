import {Env} from "@tsed/core";

export interface LogOptions {
  env: Env
}

export function Log(options: LogOptions): ClassDecorator {
  return (target: any): any => {
    return class extends target {
      constructor(...args: any[]) {
        super(...args);

        if (options.env === process.env.NODE_ENV) {
          console.log("Class " + target.name + " have been called with " + args.join(","));
        }
      }
    };
  };
}
