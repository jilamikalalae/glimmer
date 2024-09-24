import User from "@/models/user";
import bcrypt from "bcryptjs";
import { responseWrapper } from "@/utils/api-response-wrapper";

export async function POST(req) {
  try {
    const { name, username, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return responseWrapper(409, null, "This email is already exist");
    }

    await User.create({ name, username, email, password: hashedPassword });

    return responseWrapper(200, null, null);
  } catch (error) {
    return responseWrapper(500, null, error);
  }
}
