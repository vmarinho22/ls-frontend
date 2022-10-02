import { useContext } from 'react';
import { TableContext, TableContextType } from 'src/context/tables';

const useTable = (): TableContextType => {
  const context = useContext<TableContextType | null>(TableContext);
  return context as TableContextType;
};

export default useTable;
