import { NextResponse } from "next/server";

// ----------------------------------------------------------------------

export const responseWrapper = (statusCode, data, error) => {
  const response = {
    success: !error,
  };

  response.status = statusCode;

  if (error) {
    switch (statusCode) {
      case 500:
        response.message = "Something Went Wrong";
        break;
      case 400:
        response.message = "Bad Request";
        break;
      case 404:
        response.message = "Not Found";
        break;
      case 409:
        response.message = "Conflict";
        break;
      default:
        response.message = "Error";
        break;
    }
    response.error = error;
  } else {
    response.message = "Success";
  }

  response.data = data;

  return NextResponse.json(response, { status: statusCode });
};
