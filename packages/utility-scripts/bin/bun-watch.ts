#!/usr/bin/env bun

import { statSync, watch, type WatchEventType } from 'fs';
import { debounce } from 'lodash';
import { z } from 'zod';

import { getCliFlagValue } from '../src';
import { run } from '../src/run';

const path = getCliFlagValue({
  name: '--path',
  optionalNames: ['-p'],
  schema: z.string(),
});

const command = getCliFlagValue({
  name: '--command',
  optionalNames: ['-c'],
  schema: z.string(),
});

await run(command);

watch(
  path,
  debounce(async (eventType: WatchEventType, fileName: string | null) => {
    await clear();

    const changedFilePath = statSync(path).isFile() ? path : path + '/' + fileName;

    console.log('ON ' + eventType.toUpperCase());
    console.log('Changed file: ' + changedFilePath);

    await run(command);
  }, 50),
);

async function clear() {
  try {
    await run('clear');
  } catch (e) {
    process.stdout.write('\x1b[2J\x1b[0;0H');
  }
}
