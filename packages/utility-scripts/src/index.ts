import { type z } from 'zod';

type Flag = {
  name: string;
  optionalNames?: string[];
};

type FlagWithValue<TSchema extends z.ZodType, TOptional extends boolean> = Flag & {
  schema: TSchema;
  optional?: TOptional;
};

export function includesCliFlag({ name, optionalNames = [] }: Flag) {
  const names = optionalNames.concat(name);

  return names.some((n) => process.argv.includes(n));
}

export function getCliFlagValue<TSchema extends z.ZodType, TOptional extends boolean = false>(
  flag: FlagWithValue<TSchema, TOptional>,
): TOptional extends true ? z.infer<TSchema> | null : z.infer<TSchema> {
  const names = (flag.optionalNames ?? []).concat(flag.name);

  const index = process.argv.findIndex((arg) => names.includes(arg));

  const exists = index !== -1;
  if (!exists) {
    if (flag.optional) {
      return null;
    }

    console.error(
      `You must provide a ${flag.name} ${flag.optionalNames ? `(${flag.optionalNames.join(',')})` : ''} flag`,
    );
    return process.exit(1);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return flag.schema.parse(process.argv[index + 1]) as z.infer<TSchema>;
  } catch (e) {
    console.error(
      `You must provide a value for the ${flag.name} ${flag.optionalNames ? `(${flag.optionalNames.join(',')})` : ''} flag`,
    );
    return process.exit(1);
  }
}
