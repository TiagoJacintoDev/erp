import { defineFeature, loadFeature } from 'jest-cucumber';

import { type FeatureTagFilter } from '../../../types/FeatureTagFilter';
import { ScenariosDefinitionCallbackFunction } from 'jest-cucumber/dist/src/feature-definition-creation';

export function testSignupFeature(
  tagFilter: FeatureTagFilter,
  scenariosDefinitionCallback: ScenariosDefinitionCallbackFunction,
) {
  defineFeature(
    loadFeature('signup.feature', {
      loadRelativePath: true,
      tagFilter,
    }),
    scenariosDefinitionCallback,
  );
}

type AlreadyCreatedAccount = {
  email: string;
};

export type AlreadyCreatedAccountTable = AlreadyCreatedAccount[];
