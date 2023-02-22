import chai from "chai";
import { createApp, defineComponent } from "vue";
import { LogLevels } from "../src/enum/log-levels";
import VueLogger from "../src/index";
import { ILoggerOptions } from "../src/interfaces/logger-options";

const expect = chai.expect;

describe("output", () => {

    // TODO(MarcSchaetz): Test failes because mount failes. Must be evaluated, how to correctly mount.
    test("Should instantiate log functions and be reachable from external functions.", (done) => {
        const options = {
            isEnabled: true,
            logLevel: LogLevels.DEBUG,
            stringifyArguments: false,
            showLogLevel: false,
            showMethodName: true,
            separator: "|",
            showConsoleColors: false,
        } as ILoggerOptions;


        const root = defineComponent({
            template: "<div id=\"app\"></div>",
            mounted() {
                this.foo();
                done();
            },
            methods: {
                foo() {
                    expect(Vue.$log.fatal("test")).to.exist;
                    expect(Vue.$log.error("error")).to.exist;
                    expect(Vue.$log.warn("warn")).to.exist;
                    expect(Vue.$log.info("info")).to.exist;
                    expect(Vue.$log.debug("debug")).to.exist;
                    externalFunction();
                },
            },
        });

        const app = createApp(root);
        const Vue = app.use(VueLogger, options).config.globalProperties;
        app.mount("#app");

        function externalFunction(): void {
            expect(Vue.$log.fatal("test")).to.exist;
            expect(Vue.$log.fatal("test")).to.contains("externalFunction");
        }
    });
});
