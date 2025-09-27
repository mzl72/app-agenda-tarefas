import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import { Tasks } from "@/generated/prisma";
import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "@/actions/edit-task";
import { DialogClose } from "@radix-ui/react-dialog";

type TaskProps = {
  task_id: Tasks;
  handleGetTasks: () => void;
};

const EditTask = ({ task_id, handleGetTasks }: TaskProps) => {
  const [editedTask, setEditedTask] = useState(task_id.task);
  const handleEditTask = async () => {
    try {
      if (editedTask !== task_id.task) {
      } else {
        toast.error("informações inalteradas");
        return;
      }

      await editTask({ idTask: task_id.id, newTask: editedTask });

      handleGetTasks();
    } catch (error) {
      throw error;
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen size={18} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <input
            className="text-sm"
            type="text"
            placeholder="Editar tarefa"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />

          <DialogClose asChild>
            <Button className="cursor-pointer" onClick={handleEditTask}>
              Editar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
