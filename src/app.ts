import { yarg as argv, yarg } from "./config/plugins/yargs.plugin"
import { ServerApp } from "./presentation/server-app";




//funcion anonima auto invocada:

(async () => {
    await main()
})();

async function main() {
    const { b: base, l: limit, s: showTable, n:name, d:destination } = yarg;
    ServerApp.run({ base, limit, showTable, name, destination });
}