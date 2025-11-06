import { GrowthBook } from "@growthbook/growthbook";
import { cookies } from "next/headers";

import { envServer } from "@/config/envs";

// growthbook
const gb = new GrowthBook({
  apiHost: envServer.GROWTHBOOK_API_HOST,
  clientKey: envServer.GROWTHBOOK_CLIENT_KEY,
  enableDevMode: process.env.NODE_ENV !== "production",
});

let initialized = false;

//function
/**
 * Ensures GrowthBook is initialized.
 */
const ensureInitialized = async () => {
  if (!initialized) {
    await gb.init({ timeout: 3000 });
    initialized = true;
  }
};

//function
/**
 * Gets a feature flag value from GrowthBook.
 */
export const getFeatureValue = async <T>(
  key: string,
  defaultValue: T,
  attributes: Record<string, unknown>,
): Promise<T> => {
  await ensureInitialized();

  const cookieStore = await cookies();
  const userId = cookieStore?.get("user-id")?.value;

  gb.setAttributes({
    ...(userId ? { id: userId } : {}),
    ...attributes,
  });

  const result = gb.evalFeature<T>(key);

  //return
  return result?.value ?? defaultValue;
};
