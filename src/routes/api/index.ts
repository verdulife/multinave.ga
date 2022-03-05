import "$lib/database/db";
import { addVisit, checkUniqueUser } from "$lib/database/triggers";

export async function get({ locals }) {
  const { userid } = locals;
  const exists = await checkUniqueUser(userid);

  await addVisit(exists);

  return {
    body: {
      visitor_id: userid,
      unique_visit: exists
    }
  }
}