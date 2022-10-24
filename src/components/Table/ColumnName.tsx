import React, { FC } from 'react';
import styles from './Table.module.scss';
import { ITableColumnNameProps } from './Table.types';

const ColumnName: FC<ITableColumnNameProps> = ({ value }) => {
  return (
    <div className={styles.column}>
      <p className={styles.columnName}>
        <b>{value}</b>
      </p>
    </div>
  );
};

export default ColumnName;
