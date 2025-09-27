"use client";

import { Badge } from "@/components//ui/badge";
import { List, X, Check } from "lucide-react";

export type FilterProps = {
  currentFilter: "all" | "pending" | "completed";
  setCurrentFilter: React.Dispatch<
    React.SetStateAction<FilterProps["currentFilter"]>
  >;
};

const Filter = ({ currentFilter, setCurrentFilter }: FilterProps) => {
  return (
    <div className="flex gap-2">
      <Badge
        variant={`${currentFilter === "all" ? "default" : "outline"}`}
        className="cursor-pointer"
        onClick={() => setCurrentFilter("all")}
      >
        <List /> Todas
      </Badge>
      <Badge
        variant={`${currentFilter === "pending" ? "default" : "outline"}`}
        className="cursor-pointer"
        onClick={() => setCurrentFilter("pending")}
      >
        <X /> Não finalizadas
      </Badge>
      <Badge
        variant={`${currentFilter === "completed" ? "default" : "outline"}`}
        className="cursor-pointer"
        onClick={() => setCurrentFilter("completed")}
      >
        <Check /> Concluídas
      </Badge>
    </div>
  );
};

export default Filter;
