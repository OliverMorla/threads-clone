import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     if (!body.email || !body.password) {
//       return NextResponse.json({
//         status: 400,
//         account_created: false,
//         message: "All fields are required.",
//       });
//     }

//     const existingUser = await prisma.users.findFirst({
//       where: {
//         email: body.email,
//       },
//     });

//     if (existingUser) {
//       return NextResponse.json({
//         status: 409,
//         account_created: false,
//         message: "Email already Exist!",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(body.password, salt);

//     const date = new Date(body.date_of_birth);

//     if (hashedPassword) {
//       const user = await prisma.users.create({
//         data: {
//           name: body.name,
//           nickname: body.nickname,
//           email: body.email,
//           password: hashedPassword,
//         },
//       });
//       if (user) {
//         return NextResponse.json({
//           status: 201,
//           account_created: true,
//           message: "Your account has been created!",
//         });
//       }
//     }
//   } catch (err) {
//     return NextResponse.json({
//       status: 400,
//       account_created: false,
//       message: err instanceof Error ? err.message : "Something went wrong!",
//     });
//   }
}
