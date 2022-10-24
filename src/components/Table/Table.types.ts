import { CSSProperties, ReactNode } from 'react';

export interface ITableColumn {
  key: string;
  value: string;
}

export interface ITableProps {
  columns: TTableColumns;
  rows: TTableRows;
  noRowsPlaceholder?: string;
  className?: string;
  style?: CSSProperties;
}

export type TTableColumns = ITableColumn[];

export type TTableDataElement = string | ReactNode;

export interface ITableRow {
  [columnKey: string]: TTableDataElement;
}

export type TTableRows = ITableRow[];

export interface ITableColumnNameProps {
  value: ITableColumn['value'];
}

export interface ITableRowProps {
  data: ITableRow;
  columns: TTableColumns;
}

export interface IRowsProps {
  columns: TTableColumns;
  rows: TTableRows;
}
