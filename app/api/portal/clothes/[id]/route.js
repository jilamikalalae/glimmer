import Clothes from "@/models/clothes";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { responseWrapper } from "@/utils/api-response-wrapper";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return responseWrapper(401, null, "Unauthorized");
    }

    const { id } = params;

    const userId = session.user.id;

    const data = await Clothes.findById(id).where({ userId });

    if (!data) {
      return responseWrapper(404, null, "Product not found");
    }

    return responseWrapper(200, data, null);
  } catch (error) {
    console.log(error);
    return responseWrapper(500, null, error);
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return responseWrapper(401, null, "Unauthorized");
    }

    const { id } = params;

    const { name, price, color, category, season, imageUrl, sizes } =
      await req.json();

    const data = await Clothes.findByIdAndUpdate(id, {
      name,
      price,
      color,
      category,
      season,
      imageUrl,
      sizes,
    });

    if (!data) {
      return responseWrapper(404, null, "Product not found");
    }

    return responseWrapper(200, data, null);
  } catch (error) {
    console.log(error);
    return responseWrapper(500, null, error);
  }
}
