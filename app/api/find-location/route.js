import { NextRequest, NextResponse } from "next/server";
import * as opencage from "opencage-api-client";

export async function GET(request) {
  //retrieve id from url params
  const state = request.nextUrl.searchParams.get("state");
  const city = request.nextUrl.searchParams.get("city");

  //check for id parameter
  if (!state || !city) {
    return NextResponse.json({ message: "State and city is required" }, { status: 400 });
  }

  try {
    const fetchData = async () => {
      console.log("state: ", state);
      try {
        const res = await opencage.geocode({
          q: `${city}, ${state}`,
          key: "1b2aed3305f34476a0184c0434627f90",
        });
        console.log(res.results[0].geometry);
        console.log(res.results[0].geometry);
        // return res.results[0].geometry
        return res.results[0].formatted
        // console.log(res.results[0].geo)
        //   setResponse(res)
      } catch (error) {
        console.error(error);
        //   setResponse({});
      }
    };
    const location = await fetchData();
    console.log('location: ', location)
    return NextResponse.json(
    //   { message: `Connected correctly, ${location.lat}, ${location.lng}  ` },
      { message: `${location}` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occured" }, { status: 500 });
  }
}
