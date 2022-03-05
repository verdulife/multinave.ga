import Visits from "$lib/database/models/visits";
import UniqueUsers from "$lib/database/models/unique-users";


export async function addVisit(alreadyExists: boolean) {
  await Visits.updateMany({}, { $inc: { unique_visits: alreadyExists ? 0 : 1, total_visits: 1 } }, { upsert: true });
}

export async function checkUniqueUser(userid: string) {
  const exists = await UniqueUsers.findOne({ userid });

  if (!exists) {
    const newUser = new UniqueUsers({ userid });
    await newUser.save();
  }

  return exists;
}

export async function getAnalytics() {
  const analytics = {
    visits: await Visits.find({}),
    unique_users: await UniqueUsers.find({})
  }

  return analytics;
}