"use server";

import { prisma } from "@/utils/prisma";
import { Tasks } from "@/generated/prisma";

type EditTaskType = {
  idTask: string;
  newTask: string;
};

export const editTask = async ({ idTask, newTask }: EditTaskType) => {
  try {
    if (!idTask || !newTask) return;
    const updatedTask = await prisma.tasks.update({
      where: { id: idTask },
      data: { task: newTask },
    });
    if (!updatedTask) return;
  } catch (error) {
    throw error;
  }
};
