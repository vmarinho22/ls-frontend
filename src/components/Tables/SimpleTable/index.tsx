import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface Heading {
  title: string;
  icon?: any;
}

interface Props {
  title: string;
  heading: Heading[];
  data: any;
  itensPerPage?: number;
  showIndex?: boolean;
}

const SimpleTable: FC<Props> = ({
  title = 'table',
  heading,
  data,
  itensPerPage = 10,
  showIndex = false,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const indexColor = useColorModeValue('#cacaca', '#414141');
  const paginationStyleButton = {
    cursor: 'pointer',
    transition: '0.7s ease',
    _hover: {
      color: 'blue-sys.100',
    },
  };

  const handleAddPage = (): void => {
    if (currentIndex < Math.floor(data.length / 10)) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubPage = (): any => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <Flex width="100%" direction="column">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {showIndex && <Th></Th>}
              {heading.map((head: Heading) => (
                <Th key={`heading-${title}-${head.title}`}>
                  <Flex alignItems="center">
                    <Box>{head?.icon}</Box>
                    {head?.title}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data
              .slice(
                currentIndex * itensPerPage,
                currentIndex * itensPerPage + itensPerPage
              )
              ?.map((item: any, index: number) => (
                <Tr key={`table-item-${title}-${index}`}>
                  {showIndex && (
                    <Td color={indexColor}>
                      {index + currentIndex * itensPerPage + 1}
                    </Td>
                  )}
                  {Object.values(item).map((current: any, index: number) => (
                    <Td key={`current-${title}-${index}`}>{current}</Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justify="flex-end" margin="8px 4px 0px 0px">
        <Box sx={paginationStyleButton} mr="10px">
          <HiChevronLeft size="1.8em" onClick={handleSubPage} />
        </Box>
        <Box sx={paginationStyleButton}>
          <HiChevronRight size="1.8em" onClick={handleAddPage} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default SimpleTable;
