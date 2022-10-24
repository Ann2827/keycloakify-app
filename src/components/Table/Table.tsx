import cn from 'classnames';
import React, { FC } from 'react';
import Rows from './Rows';
import ColumnName from './ColumnName';
import styles from './Table.module.scss';
import { ITableProps } from './Table.types';

const Table: FC<ITableProps> = (props) => {
  const { className, columns, rows, noRowsPlaceholder } = props;

  const tableClassName = cn(styles.table, className);

  return (
    <div className={styles.scrollContainer}>
      <div className={tableClassName}>
        <div className={styles.columnsWrapper}>
          {columns.map((columnName, index) => (
            <ColumnName key={index} value={columnName.value} />
          ))}
        </div>
        <div className={styles.rowsWrapper}>
          {rows.length > 0 ? (
            <Rows columns={columns} rows={rows} />
          ) : (
            <div className={styles.noRowsPlaceholder}>
              <p>{noRowsPlaceholder || ''}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
