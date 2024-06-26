/*
 * @Date: 2024-05-07 11:55:50
 * @LastEditors: dengxin 994386508@qq.com
 * @LastEditTime: 2024-05-07 11:56:49
 * @FilePath: /vehicle-plate-keyboard/src/keyboardCell.tsx
 */
import * as React from 'react';

interface KeyboardCellProps {
  cell: string;
  cellTextStyle?: React.CSSProperties;
  disabled?: boolean;
  onClick?: (cell: string) => void;
  type: keyboardCellType;
}

type keyboardCellType = 'province' | 'normal' | 'character';

const TypeToStyle: { [key in keyboardCellType]: string } = {
  province: 'province-cell',
  character: 'character-cell',
  normal: 'normal-cell',
};

const KeyboardCell = React.memo((props: KeyboardCellProps) => {
  const handleTouchEnd = (e:any) => {
    e.preventDefault();
    if (!props.disabled && typeof props.onClick === 'function') {
      props.onClick(props.cell);
    }
  };
  
  return (
    <section
      className={`${'keyboard-cell'} ${TypeToStyle[props.type]} ${
        props.disabled ? 'cell-disabled' : ''
      }`}
      aria-disabled={props.disabled}
      aria-label={props.cell}
      role="button"
      onTouchEnd={handleTouchEnd}
    >
      <span style={props.cellTextStyle} className="cell-text">
        {props.cell}
      </span>
    </section>
  );
});

export default KeyboardCell;
