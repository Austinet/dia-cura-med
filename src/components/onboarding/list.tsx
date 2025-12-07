import React from "react";
import { ImCancelCircle } from "react-icons/im";

type Props = {
  items: string[];
  type: "allergy" | "chronicIllness";
  deleteItem: (type: "allergy" | "chronicIllness", item: string) => void;
};
const List = ({ items, deleteItem, type }: Props) => {
  return (
    <ul className="flex gap-2 items-center">
      {items.map((item) => (
        <li
          key={item}
          className="bg-white rounded shadow-md flex gap-2 items-center p-1"
        >
          <span>{item} </span>
          <button
            type="button"
            className="text-red-600"
            onClick={() => deleteItem(type, item)}
          >
            <ImCancelCircle />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default List;
