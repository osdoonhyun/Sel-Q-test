import {
  ButtonGroup,
  DropdownButton,
  Placeholder,
  Table,
} from 'react-bootstrap';
import {
  QUESTION_FILTER_OPTIONS,
  USER_FILTER_OPTIONS,
} from '../constant/filters';
import { QUESTION_MANAGEMENT, USER_MANAGEMENT } from '../constant/managements';
import { TableHead } from '../styles/Styles';

export default function ManagementSkeleton({ pageOption }) {
  const filterData =
    pageOption === 'user' ? USER_FILTER_OPTIONS : QUESTION_FILTER_OPTIONS;
  const tableHeadData =
    pageOption === 'user' ? USER_MANAGEMENT : QUESTION_MANAGEMENT;

  const bodyTdNumber = tableHeadData?.tableHead.length - 2;

  return (
    <>
      <h1>{pageOption === 'user' ? '유저 ' : '질문 '}관리 페이지</h1>
      {filterData.map((filterOption, index) => (
        <DropdownButton
          key={index}
          className='p-1'
          variant='Light'
          as={ButtonGroup}
          title={filterOption.label}
        />
      ))}

      <Table bordered hover>
        <thead>
          <tr>
            {tableHeadData?.tableHead.map((data, index) => (
              <TableHead
                key={index}
                width={data.width}
                className={data.className}
              >
                {data.label}
              </TableHead>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td className='text-center align-middle p-0 d-none d-md-table-cell'>
                {index + 1}
              </td>
              {[...Array(bodyTdNumber)].map((_, colIndex) => (
                <td key={colIndex}>
                  <Placeholder as='div' size='lg' animation='glow'>
                    <Placeholder xs={12} />
                  </Placeholder>
                </td>
              ))}
              <td className='text-center align-middle p-1'>
                <DropdownButton
                  variant='light'
                  title={<Placeholder animation='glow' />}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
