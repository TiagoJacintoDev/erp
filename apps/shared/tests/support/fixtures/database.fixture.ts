import { type CompositionRoot } from 'backend/src/shared/infra/CompositionRoot';

export class DatabaseFixture {
  constructor(private readonly composition: CompositionRoot) {}

  async resetDatabase() {
    const connection = this.composition.getDatabase().getConnection();

    try {
      await connection.$transaction([]);
    } catch (error) {
      console.error(error);
    }
  }
}
