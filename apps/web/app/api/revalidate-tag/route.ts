import type { NextRequest } from "next/server";

import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
  tags?: string[];
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true, // Add delay so CDN catches up
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Missing document type", { status: 400 });
    }

    // Revalidate by document type (matches the tags used in sanityFetch)
    const tags = body.tags ?? [body._type];
    // Webhooks come from external systems, so use { expire: 0 } for
    // immediate invalidation as recommended by Next.js docs.
    tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));

    return NextResponse.json({ revalidated: tags, now: Date.now() });
  } catch (err) {
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
