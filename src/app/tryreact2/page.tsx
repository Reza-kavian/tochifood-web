////zare_nk_041220_okk
"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

// import Todos from "../../components/Todos";
import { Todos } from "@/components/Todos";
import { notFound } from "next/navigation";

export default function () {
  if (process.env.NODE_ENV === "production") {
    notFound(); //نمایش صفحه 404
    // یا redirect("/") // به صفحه اصلی بفرست
    return null;
  }

  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);

  const timeOUtDeh = useMemo(() => {
    console.log("timeOUtDeh called!!");
    var x = 7;
    for (let i = 0; i < 1000000000; i++) {
      x++;
    }
    return x; //zare_nk_041021_nokteh(age chizi return nakonim darvaghe engar maksi ke tavabei dar render shodanha ijad mikonan
    //  ra nemitavan ba useMemo midiriat kard, va chareye kar mitavanad estefadeye useEffect bejaye useMemo bashad)
  }, [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = useCallback(() => {
    setTodos((cur) => {
      return [...cur, "todo 3"];
    });
  }, [todos]);

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
      {timeOUtDeh}
    </>
  );
}
