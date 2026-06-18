import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { isAdminSession } from "@/lib/admin-session";
import { loadAdminMenu, updateMenuItems, type AdminMenuItemUpdate } from "@/lib/menu-db";
import { languages } from "@/lib/content";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await loadAdminMenu();
  return NextResponse.json({ items });
}

export async function PATCH(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { items?: AdminMenuItemUpdate[] };

  if (!body.items?.length) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  for (const item of body.items) {
    if (!item.nameEn.trim() || !item.nameFr.trim() || !item.nameZh.trim()) {
      return NextResponse.json({ error: "Each item needs a name in all languages" }, { status: 400 });
    }
    if (!item.prices?.length) {
      return NextResponse.json({ error: "Each item needs at least one price tier" }, { status: 400 });
    }
    for (const tier of item.prices) {
      if (!Number.isFinite(tier.price) || tier.price < 0) {
        return NextResponse.json({ error: "Each price must be zero or greater" }, { status: 400 });
      }
    }
  }

  await updateMenuItems(body.items);

  for (const lang of languages) {
    revalidatePath(`/${lang}`);
    revalidatePath(`/${lang}/menu`);
  }

  return NextResponse.json({ ok: true });
}
