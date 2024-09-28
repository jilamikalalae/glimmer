import Clothes from "@/models/clothes";
import { getServerSession } from "next-auth";
import { responseWrapper } from "@/utils/api-response-wrapper";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return responseWrapper(401, null, "Unauthorized");
    }
    const { id } = params;

    const size = req.nextUrl.searchParams.get("size");
    if (!size) {
      return responseWrapper(400, null, "Size not choose");
    }

    let data = await Clothes.findByIdAndUpdate(id, {
      isRented: true,
      rentedById: session.user.id,
    });

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
  console.log(array);
  const index = array.indexOf(value);
  if (index !== -1) {
    // Remove the element at the found index
    array.splice(index, 1);

    console.log(array);
  }
  return array;
}
