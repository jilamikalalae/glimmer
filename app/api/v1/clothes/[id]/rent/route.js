import Clothes from "@/models/clothes";
import { getServerSession } from "next-auth";
import { responseWrapper } from "@/utils/api-response-wrapper";
import { AuthOptions } from "@/utils/auth";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session) {
      return responseWrapper(401, null, "Unauthorized");
    }
    const { id } = params;

    const size = await req.json();
    if (!size) {
      return responseWrapper(400, null, "Size not choose");
    }

    let data = await Clothes.findById(id);

    if (!data) {
      return responseWrapper(404, null, "Product not found");
    }

    if (!data.sizes) {
      return responseWrapper(404, null, "Sizes not found");
    }

    data.sizes = removeElementByValue(data.sizes, size);
    if (data.sizes.length == 0) {
      await Clothes.findByIdAndDelete(id);
    } else {
      await Clothes.findByIdAndUpdate(id, data);
    }

    return responseWrapper(200, null, null);
  } catch (error) {
    console.log(error);
    return responseWrapper(500, null, error);
  }
}

function removeElementByValue(array, value) {
  const index = array.indexOf(value);
  array.splice(index, 1);

  return array;
}
