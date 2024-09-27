import mongoose from "mongoose";
import User from "@/models/user";
import dbConnect from "@/lib/db";
import { responseWrapper } from "@/utils/api-response-wrapper";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    await dbConnect();

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return responseWrapper(400, null, "Invalid user ID");
    }

    const user = await User.findById(id);

    if (!user) {
      return responseWrapper(404, null, "User not found");
    }

    return responseWrapper(200, user, null);
  } catch (error) {
    return responseWrapper(500, null, error.message);
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const { name, username, email } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return responseWrapper(400, null, "Invalid user ID");
    }

    await dbConnect();

    const user = await User.findByIdAndUpdate(id, { name, username, email });

    if (!user) {
      return responseWrapper(404, null, "User not found");
    }
    return responseWrapper(200, user, null);
  } catch (error) {
    return responseWrapper(500, null, error.message);
  }
}
