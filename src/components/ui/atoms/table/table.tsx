import type { FC, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, ReactNode } from 'react'

import { cn } from '@cn'

type TableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type TableProps = HTMLAttributes<HTMLTableElement> & {
	zebra?: boolean
	pinRows?: boolean
	pinCols?: boolean
	size?: TableSize
	children: ReactNode
}

type TableHeadProps = HTMLAttributes<HTMLTableSectionElement> & {
	children: ReactNode
}

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement> & {
	children: ReactNode
}

type TableFootProps = HTMLAttributes<HTMLTableSectionElement> & {
	children: ReactNode
}

type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
	active?: boolean
	hover?: boolean
	children: ReactNode
}

type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
	children: ReactNode
}

type TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement> & {
	children: ReactNode
}

type TableComponent = FC<TableProps> & {
	Head: FC<TableHeadProps>
	Body: FC<TableBodyProps>
	Foot: FC<TableFootProps>
	Row: FC<TableRowProps>
	Cell: FC<TableCellProps>
	HeaderCell: FC<TableHeaderCellProps>
}

const sizeClasses: Record<TableSize, string | null> = {
	xs: 'table-xs',
	sm: 'table-sm',
	md: null, // Default size
	lg: 'table-lg',
	xl: 'table-xl',
}

export const Table: TableComponent = ({ zebra = false, pinRows = false, pinCols = false, size = 'md', className, children, ...props }) => {
	return (
		<table
			className={cn(
				'table',
				zebra && 'table-zebra',
				pinRows && 'table-pin-rows',
				pinCols && 'table-pin-cols',
				size !== 'md' && sizeClasses[size],
				className,
			)}
			{...props}
		>
			{children}
		</table>
	)
}

export const TableHead: FC<TableHeadProps> = ({ className, children, ...props }) => (
	<thead className={cn(className)} {...props}>
		{children}
	</thead>
)

export const TableBody: FC<TableBodyProps> = ({ className, children, ...props }) => (
	<tbody className={cn(className)} {...props}>
		{children}
	</tbody>
)

export const TableFoot: FC<TableFootProps> = ({ className, children, ...props }) => (
	<tfoot className={cn(className)} {...props}>
		{children}
	</tfoot>
)

export const TableRow: FC<TableRowProps> = ({ active = false, hover = false, className, children, ...props }) => (
	<tr className={cn(active && 'bg-base-200', hover && 'hover:bg-base-300/30', className)} {...props}>
		{children}
	</tr>
)

export const TableCell: FC<TableCellProps> = ({ className, children, ...props }) => (
	<td className={cn(className)} {...props}>
		{children}
	</td>
)

export const TableHeaderCell: FC<TableHeaderCellProps> = ({ className, children, ...props }) => (
	<th className={cn(className)} {...props}>
		{children}
	</th>
)

Table.Head = TableHead
Table.Body = TableBody
Table.Foot = TableFoot
Table.Row = TableRow
Table.Cell = TableCell
Table.HeaderCell = TableHeaderCell

Table.displayName = 'Table'
TableHead.displayName = 'TableHead'
TableBody.displayName = 'TableBody'
TableFoot.displayName = 'TableFoot'
TableRow.displayName = 'TableRow'
TableCell.displayName = 'TableCell'
TableHeaderCell.displayName = 'TableHeaderCell'
