import connectMongoDB from "@/lib/mongodb";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // const {name,email,password} = await req.json();
    // const hashedPssword = await bcrypt.hash(password,10)

    const values = await req.json();
    const { email } = values;

    // await connectMongoDB();
    // await User.create({name,email,password: hashedPssword});
    // return Response.json({message: 'user registered!'});
    await connectMongoDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("Email already registered", { status: 400 });
    } else {
      const user = await User.create({ ...values });
      return NextResponse.json(user);
    }
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
