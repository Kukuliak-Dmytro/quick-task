import { NextResponse } from "next/server";
import { getUserId } from "../lib";

//function
/**
 * GET /api/user-id - Returns the current user's ID from the session.
 * Returns null if not authenticated.
 */
export const GET = async (request: Request) => {
  try {
    const userId = await getUserId(request);

    //return
    return NextResponse.json({ userId });
  } catch (error) {
    console.error("Error fetching user ID:", error);
    //return
    return NextResponse.json(
      { userId: null },
      { status: 200 }, // Return 200 with null userId instead of error
    );
  }
};
