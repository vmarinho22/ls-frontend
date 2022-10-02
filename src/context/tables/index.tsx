import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';

export interface TableContextType {
  tableData: any;
  loading: boolean;
  setTableData: Dispatch<any>;
}

export const TableContext = createContext<TableContextType | null>(null);

interface Props {
  children?: ReactNode;
}

const TableProvider: FC<Props> = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    if (tableData !== null && tableData !== undefined) {
      setLoading(false);
    }
  }, [tableData]);

  useEffect(() => {
    return () => {
      setTableData([]);
      setLoading(false);
    };
  }, []);

  return (
    <TableContext.Provider
      value={{
        tableData,
        loading,
        setTableData,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
