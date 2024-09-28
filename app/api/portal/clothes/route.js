import Clothes from "@/models/clothes";
import { responseWrapper } from "@/utils/api-response-wrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return responseWrapper(401, null, "Unauthorized");
    }

    const userId = session.user.id;

    const { name, price, color, category, season, imageUrl, sizes } =
      await req.json();

    await Clothes.create({
      name,
      price,
      color,
      category,
      season,
      imageUrl,
      sizes,
      userId,
    });

    return responseWrapper(200, null, null);
  } catch (error) {
    console.log(error);
    return responseWrapper(500, null, error);
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return responseWrapper(401, null, "Unauthorized");
    }

    const userId = session.user.id;

    const data = await Clothes.find({ userId });

    return responseWrapper(200, data, null);
  } catch (error) {
    console.log(error);
    return responseWrapper(500, null, error);
  }
}
