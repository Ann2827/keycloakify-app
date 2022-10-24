import React from 'react';
import { openLinkBlank } from '../../utils/url';
import styles from './Main.module.scss';
import { pagesArray } from '../../pagesConfig';
import Button, { ButtonTypes } from '../../components/Button';
import Table, { ITableRow, TTableRows } from '../../components/Table';

const Action: React.FC<{ path: string }> = ({ path }: { path: string }) => (
  <Button text='Open' type={ButtonTypes.button} onClick={() => openLinkBlank(`${process.env.PUBLIC_URL}/${path}`)} />
);

const columns = [
  { key: '1', value: 'Template name' },
  { key: '2', value: 'Description' },
  { key: '3', value: 'Theme1' },
  { key: '4', value: 'Theme2' },
];

const rows: TTableRows = pagesArray.map((item) => {
  const row: ITableRow = {
    '1': item.name,
    '2': item.description,
    '3': item.postfixes ? (
      <div className={styles.buttons}>
        <Action path={item.name} />
        {item.postfixes.map((postfix, id) => (
          <Action key={id} path={`${item.name}-${postfix}`} />
        ))}
      </div>
    ) : (
      <Action path={item.name} />
    ),
  };

  if (item.theme2 && item.theme2.postfixes) {
    row['4'] = (
      <div>
        <Action path={`${item.name}-theme2`} />
        {item.theme2.postfixes.map((postfix, id) => (
          <Action key={id} path={`${item.name}-theme2-${postfix}`} />
        ))}
      </div>
    );
  } else if (item.theme2) {
    row['4'] = <Action path={`${item.name}-theme2`} />;
  } else {
    row['4'] = '';
  }
  return row;
});

const Main: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>Available pages</h3>
      </div>
      <Table columns={columns} rows={rows} noRowsPlaceholder={'Pages not found'} className={styles.table} />
    </div>
  );
};

export default React.memo(Main);
