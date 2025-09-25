import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  List,
  ListCheck,
  Plus,
  Sigma,
  SquarePen,
  Trash,
  X,
} from "lucide-react";
import { Badge } from "@/components//ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input placeholder="Adicionar Tarefa" />
            <Button className="cursor-pointer">
              <Plus /> Adicionar
            </Button>
          </div>
          <Separator />
        </CardHeader>

        <CardContent>
          <div className="flex gap-2">
            <Badge variant="default" className="cursor-pointer">
              <List /> Todas
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              <X /> Não finalizadas
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              <Check /> Concluídas
            </Badge>
          </div>

          <div className="mt-4 border-1">
            <div className="h-14 flex justify-between items-center border-b-1">
              <div className="w-1 h-full bg-violet-500"></div>
              <p className="flex-1 px-2 text-sm">Tarefa 1</p>
              <div className="flex items-center gap-2 px-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <SquarePen size={18} className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Tarefa</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-2">
                      <input
                        className="text-sm px-2"
                        type="text"
                        placeholder="Editar Tarefa"
                      />
                      <Button className="cursor-pointer">Editar</Button>
                    </div>
                  </DialogContent>
                </Dialog>{" "}
                <Trash size={18} className="cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex gap-2 items-center justify-between">
              <ListCheck size={18} />
              <p className="text-xs flex-1 px-2">Tarefas Concluídas (3/3)</p>
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
                      Tem certeza que deseja excluir x itens?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="h-2 w-full gray-200 rounded-md mt-4">
            <div
              className="h-full bg-violet-500 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end mt-2 items-center gap-2">
            <Sigma size={18} />
            <p className="text-sm">3 Tarefas no Total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
