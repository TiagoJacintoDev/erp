import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { asyncMapObject } from '@sms/shared/src/utils/mapObject';

const vaultUrl = 'https://kv-subms.vault.azure.net';

const credential = new DefaultAzureCredential();
const client = new SecretClient(vaultUrl, credential);

export async function getAzureKeyVaultSecretValue(name: string) {
  try {
    const secret = await client.getSecret(name.replace(/_/g, '-').toLowerCase());

    return secret.value;
  } catch (e) {
    console.error('Error retrieving secret from Key Vault:', e);
  }
}

export function getMultipleAzureKeyVaultSecretsValue<T extends Record<string, string>>(names: T) {
  return asyncMapObject(names, async (key, value) => [
    key,
    await getAzureKeyVaultSecretValue(value),
  ]);
}
