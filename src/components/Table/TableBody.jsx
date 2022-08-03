import * as S from './styled';
import TableBody from '@mui/material/TableBody';
import { TableItem } from './TableItem';


export const TableBodyComponent = ({certificates, onEditClick }) => {
    return (
    <TableBody>
        {certificates.map((certificate) => (
          <S.StyledTableRow key={certificate.giftCertificateName}>
            <TableItem certificate={certificate} onEditClick={onEditClick}/>
          </S.StyledTableRow>
        ))}
      </TableBody>)
}