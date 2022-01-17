import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

export type CustomProps = {
  onChange: (a: any) => void;
} & NumberFormatProps;

const SimpleNumberFormat = React.forwardRef<HTMLElement, CustomProps>(
  function SimpleNumberFormat(props, ref) {
    const { onChange, decimalScale, thousandSeparator, ...rest } = props;
    return (
      <NumberFormat
        {...rest}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        isNumericString
        allowNegative={false}
        thousandSeparator={thousandSeparator}
        decimalSeparator=","
        decimalScale={decimalScale}
        isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          const correctedFloatValue = floatValue || 0;
          return (
            formattedValue === '' || correctedFloatValue <= 999999999999999.99
          );
        }}
      />
    );
  }
);

SimpleNumberFormat.defaultProps = {
  decimalScale: 2,
  thousandSeparator: '.',
};

export default SimpleNumberFormat;
