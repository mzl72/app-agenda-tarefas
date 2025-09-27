"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ListCheck, LoaderCircle, Plus, Sigma, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditTask from "@/components/edit-task";
import { getTasks } from "@/actions/get-task-from-db";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma";
import { NewTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-task";
import { toast } from "sonner";
import { updateTaskStatus } from "@/actions/toggle-done";
import Filter from "@/components/filter";
import { FilterProps } from "@/components/filter";
import clearCompletedTasks from "@/actions/clear-completed-tasks";
const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] =
    useState<FilterProps["currentFilter"]>("all");
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();
      setTaskList(tasks || []);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      if (task.length === 0 || !task.trim()) {
        toast.error("Por favor, insira uma tarefa válida.");
        setLoading(false);
        return;
      }

      const myNewTask = await NewTask(task);
      if (!myNewTask) return;
      toast.success("Tarefa adicionada com sucesso!");
      await handleGetTasks();
      setTask("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return;
      const deletedTask = await deleteTask(id);
      if (!deletedTask) return;
      console.log(deletedTask);
      // Atualizar lista após deletar
      toast.warning("Tarefa deletada com sucesso!");
      await handleGetTasks();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const handleToggleTask = async (id: string) => {
    const previousTask = [...taskList];
    try {
      setTaskList((prev) => {
        const updateTaskList = prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });
        return updateTaskList;
      });
      const getFromDb = await updateTaskStatus(id);
    } catch (error) {
      setTaskList(previousTask);
      throw error;
    }
  };

  const deleteCompletedTasks = async () => {
    try {
      const completedTasks = await clearCompletedTasks();
      toast.success("Tarefas concluídas deletadas com sucesso!");
      if (!completedTasks) return;
      setTaskList(completedTasks);
      return completedTasks;
    } catch (error) {
      throw error;
    }
  };

  // useEffect deve estar dentro do componente
  useEffect(() => {
    handleGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList);
        break;
      case "pending":
        const pendingTasks = taskList.filter((task) => !task.done);
        setFilteredTasks(pendingTasks);
        break;
      case "completed":
        const completedTasks = taskList.filter((task) => task.done);
        setFilteredTasks(completedTasks);
        break;
    }
  }, [currentFilter, taskList]);

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="Adicionar Tarefa"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button className="cursor-pointer" onClick={handleAddTask}>
              {loading ? <LoaderCircle className="animate-spin" /> : <Plus />}
              Adicionar
            </Button>
          </div>
          <Separator />
        </CardHeader>

        <CardContent>
          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <div className="mt-4 border-1">
            {taskList.length === 0 && (
              <p className="text-xs py-6 text-center text-gray-500">
                Nenhuma tarefa encontrada.
              </p>
            )}
            {filteredTasks.map((taskItem) => (
              <div
                className="h-14 flex justify-between items-center border-b-1"
                key={taskItem.id}
              >
                <div
                  className={`w-1 h-full ${
                    taskItem.done ? "bg-green-400" : "bg-red-400"
                  }`}
                ></div>
                <p
                  className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700"
                  onClick={() => handleToggleTask(taskItem.id)}
                >
                  {taskItem.task}
                </p>
                <div className="flex items-center gap-2 px-2">
                  <EditTask
                    task_id={taskItem}
                    handleGetTasks={handleGetTasks}
                  />
                  <Trash
                    size={18}
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(taskItem.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex gap-2 items-center justify-between">
              <ListCheck size={18} />
              <p className="text-xs flex-1 px-2">
                Tarefas Concluídas {taskList.filter((task) => task.done).length}
                /{taskList.length}
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-xs h-7 cursor-pointer"
                  >
                    <Trash />
                    Limpar tarefas concluídas
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {`Tem certeza que deseja excluir ${
                        taskList.filter((tarefa) => tarefa.done).length
                      } tarefas?`}
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      className="cursor-pointer"
                      onClick={deleteCompletedTasks}
                    >
                      Continuar
                    </AlertDialogAction>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancelar
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="h-2 w-full gray-200 rounded-md mt-4">
            <div
              className="h-full bg-violet-500 rounded-md"
              style={{
                width: `${
                  (taskList.filter((task) => task.done).length /
                    taskList.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
