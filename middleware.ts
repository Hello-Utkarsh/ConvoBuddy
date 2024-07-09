import { auth, clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  if (req.method !== "GET") {
        const { userId } = auth();
    
        if (!userId) {
          return NextResponse.json({ error: "Unauthorized" });
        }

        return NextResponse.next()
      }
    
      NextResponse.json({ message: "This is an unprotected route" });
});
