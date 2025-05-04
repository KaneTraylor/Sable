// utils/shouldShowPopup.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function shouldShowPopup(
  userId: number,
  popupType: "popupOne" | "popupTwo"
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      popupOneLastSeen: true,
      popupTwoLastSeen: true,
    },
  });

  if (!user) return false;

  const lastSeen =
    popupType === "popupOne" ? user.popupOneLastSeen : user.popupTwoLastSeen;

  if (!lastSeen) return true;

  const now = new Date();
  const diffMs = now.getTime() - lastSeen.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  return diffHours >= 24;
}

export async function updatePopupLastSeen(
  userId: number,
  popupType: "popupOne" | "popupTwo"
) {
  const field =
    popupType === "popupOne"
      ? { popupOneLastSeen: new Date() }
      : { popupTwoLastSeen: new Date() };
  await prisma.user.update({
    where: { id: userId },
    data: field,
  });
}
