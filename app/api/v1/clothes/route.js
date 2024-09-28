import Clothes from "@/models/clothes";
import { responseWrapper } from "@/utils/api-response-wrapper";

export async function GET(req) {
  try {
    const category = req.nextUrl.searchParams.get("category");
    const season = req.nextUrl.searchParams.get("season");

    const query = {};
    if (category) {
      query.category = category;
    }
    if (season) {
      query.season = season;
    }

    const data = await Clothes.find().where(query);

    return responseWrapper(200, data, null);
  } catch (error) {
    console.log(error);
    return responseWrapper(500, null, error);
  }
}
