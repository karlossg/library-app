import { getServer } from "./server";

(async () => {
  try {
    const appServer = await getServer();

    await appServer.start();
    console.info("Server startet at port:", appServer.info.uri);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();