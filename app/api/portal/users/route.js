import Clothes from "@/models/clothes";
import { responseWrapper } from "@/utils/api-response-wrapper";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/utils/auth";
import User from "@/models/user";

export async function DELETE(req) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session) {
      return responseWrapper(401, null, "Unauthorized");
    }

    const userId = session.user.id;

    await Clothes.deleteMany({ userId });

    await User.findByIdAndDelete(userId);

    return responseWrapper(200, null, null);
  } catch (error) {
    console.log(error);
    return responseWrapper(500, null, error);
  }
}
