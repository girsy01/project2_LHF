import { createContext, useState } from "react";

const FilterContext = createContext();

const FilterWrapper = ({ children }) => {
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <FilterContext.Provider value={{ categoryFilter, setCategoryFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterWrapper };
