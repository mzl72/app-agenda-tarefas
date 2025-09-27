"use server";
import { prisma } from "@/utils/prisma";

const clearCompletedTasks = async () => {
  try {
    await prisma.tasks.deleteMany({
      where: { done: true },
    });

    const allTasks = await prisma.tasks.findMany();
    if (!allTasks) return;
    return allTasks;
  } catch (error) {
    throw error;
  }
};

export default clearCompletedTasks;
