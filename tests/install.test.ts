import { strictEqual } from "assert";
import chai from "chai";
import { createApp } from "vue";
import VueLogger from "../src/index";
import { LogLevels } from "../src/enum/log-levels";
import { ILoggerOptions } from "../src/interfaces/logger-options";
const expect = chai.expect;

describe("vue-logger.ts", () => {

    let app;

    beforeAll(() => {
        app = createApp({});
    })
    test("install() should work as expected with the correct params.", () => {
        const options: ILoggerOptions = {
            isEnabled: true,
            logLevel: LogLevels.FATAL,
            separator: "|",
            stringifyArguments: false,
            showConsoleColors: true,
            showLogLevel: false,
            showMethodName: false,
        };
        const Vue = app.use(VueLogger, options).config.globalProperties;
        expect(Vue.$log).to.be.a("object");
        strictEqual(Vue.$log.debug("debug"), undefined);
        strictEqual(Vue.$log.info("info"), undefined);
        strictEqual(Vue.$log.warn("warn"), undefined);
        strictEqual(Vue.$log.error("error"), undefined);
        // expect(Vue.$log.fatal("fatal")).to.exist;
    });

    test("install() should throw an error with the an incorrect parameter.", () => {
        const options: any = {
            isEnabled: true,
            logLevel: LogLevels.DEBUG,
            separator: "|",
            stringifyArguments: false,
            showConsoleColors: true,
            showLogLevel: false,
            showMethodName: "wrong value for test.",
        };
        expect(() => {
            VueLogger.install(app, options);
        })
            .to
            .throw(Error, "Provided options for vuejs-logger are not valid.");
    });
});
