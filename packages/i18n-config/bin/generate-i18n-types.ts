#!/usr/bin/env bun

import { getCliFlagValue, includesCliFlag } from '@sms/utility-scripts';
import { $ } from 'bun';
import { z } from 'zod';

import { run } from '../../utility-scripts/src/run';

const input = getCliFlagValue({
  name: '--input',
  optionalNames: ['-i'],
  schema: z.string(),
});

const output = getCliFlagValue({
  name: '--output',
  optionalNames: ['-o'],
  schema: z.string(),
});

const command = `i18next-resources-for-ts interface -i ${input} -o ${output}`;

const shouldWatch = includesCliFlag({
  name: '--watch',
});

if (shouldWatch) {
  await $`utility-scripts-bun-watch --path ${input} --command ${command}`;
} else {
  await run(command);
}
