import {convertDate, getTagsNames } from './../../utils'
import * as S from './styled';
import {TableButtons} from './TableButtons'

export const TableItem = ({certificate, onViewClick, onEditClick}) => {

  return (
    <>
      <S.StyledTableCell component="th" scope="certificates">
        {certificate.giftCertificateName}
      </S.StyledTableCell>
      <S.StyledTableCell align="center">
        {convertDate(certificate.createDate)}
      </S.StyledTableCell>
      <S.StyledTableCell align="center">
        {getTagsNames(certificate.tags)}
      </S.StyledTableCell>
      <S.StyledTableCell align="center">
        {certificate.duration}
      </S.StyledTableCell>
      <S.StyledTableCell align="center">{certificate.price}</S.StyledTableCell>
      <S.StyledTableCell align="center">
        <TableButtons
          certificate={certificate}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
        />
      </S.StyledTableCell>
    </>
  );
};
