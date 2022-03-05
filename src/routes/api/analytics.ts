import { getAnalytics } from "$lib/database/triggers";

export async function get() {
  const analytics = await getAnalytics();

  return {
    body: {
      analytics
    }
  }
}