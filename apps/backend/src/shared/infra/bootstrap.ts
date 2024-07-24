import { CompositionRoot } from './CompositionRoot';
import { Config } from './Config';

const composition = CompositionRoot.getInstance(new Config('start:dev'));
const webServer = composition.getWebServer();

export async function bootstrap() {
  await webServer.start();
}
