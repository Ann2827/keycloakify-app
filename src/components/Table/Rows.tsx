import cn from 'classnames';
import React, { FC, ReactNode } from 'react';
import styles from './Table.module.scss';
import { ITableRowProps, IRowsProps } from './Table.types';

export const Row: FC<ITableRowProps> = ({ columns, data }) => {
  const orderedRow: ReactNode[] = [];
  columns.forEach(({ key }, index) => {
    const rowElementClassName = cn(styles.rowElement, {
      [styles.rowElement_url]: key === 'url',
    });

    const rowElement = (
      <div key={index} className={rowElementClassName}>
        <p>{data[key] ?? null}</p>
      </div>
    );
    orderedRow.push(rowElement);
  });

  return <div className={styles.row}>{orderedRow}</div>;
};

const Rows: FC<IRowsProps> = (props) => {
  const { rows, columns } = props;
  return (
    <>
      {rows.map((data, index) => (
        <Row key={index} columns={columns} data={data} />
      ))}
    </>
  );
};

export default Rows;
