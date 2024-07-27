import {
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api, type ApiError, handleError } from '../../shared/api';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password should contain at least 6 characters',
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: 'You must agree to terms and conditions',
  }),
});

type FormValues = z.infer<typeof schema>;

export function SignupPage() {
  const form = useForm<FormValues>({
    mode: 'controlled',
    clearInputErrorOnChange: false,
    validateInputOnBlur: true,
    initialValues: {
      email: 'email@email.com',
      password: 'password',
      terms: false,
    },
    validate: zodResolver(schema),
  });

  const { mutate: signup } = useMutation({
    mutationFn: api.signup.bind(api),
    onError: (error: ApiError) =>
      handleError({
        error,
        onNetworkError: () => alert('Network error'),
        onServerError: () => alert('Server error'),
        onExpectedError: alert,
      }),
  });

  return (
    <Container size={700}>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form
          onSubmit={form.onSubmit(async (values) => {
            signup(values);
          })}
        >
          <Stack>
            <TextInput
              withAsterisk
              label='Email'
              classNames={{
                input: 'mt-2',
              }}
              key={form.key('email')}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              withAsterisk
              label='Password'
              classNames={{
                input: 'mt-2',
              }}
              key={form.key('password')}
              {...form.getInputProps('password')}
            />

            <Checkbox
              mt='md'
              label='I agree to the terms and conditions'
              key={form.key('terms')}
              {...form.getInputProps('terms', { type: 'checkbox', withError: false })}
            />

            <Group justify='flex-end' mt='md'>
              <Button type='submit' disabled={!form.getValues().terms}>
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
