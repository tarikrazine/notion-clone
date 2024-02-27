"use server";

import { asc, eq } from "drizzle-orm";

import db from "@/db";
import { subscriptions } from "@/db/schema/subscriptions";

export async function getUserSubscriptionStatus(userId: string) {
  try {
    const [subscription] = await db.select().from(subscriptions).where(
      eq(subscriptions.userId, userId),
    ).orderBy(asc(subscriptions.created)).limit(1);

    if (!subscription) throw new Error("No subscription found for user");

    return {
      data: subscription,
      error: null,
    };
  } catch (error: any) {
    console.log("[GET_USER_SUBSCRIPTION_STATUS_ERROR]", error.message);
    return {
      data: null,
      error: error?.message,
    };
  }
}
