import * as React from 'react';
interface KeyboardCellProps {
    cell: string;
    cellTextStyle?: React.CSSProperties;
    disabled?: boolean;
    onClick?: (cell: string) => void;
    type: keyboardCellType;
}
type keyboardCellType = 'province' | 'normal' | 'character';
declare const KeyboardCell: React.MemoExoticComponent<(props: KeyboardCellProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>>;
export default KeyboardCell;
