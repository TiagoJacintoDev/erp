import { CompositionRoot } from './CompositionRoot';

const composition = CompositionRoot.getInstance();
const webServer = composition.getWebServer();

export async function bootstrap() {
  await webServer.start();
}
