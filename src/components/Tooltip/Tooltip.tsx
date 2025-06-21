import React, {useMemo} from 'react';
import {TooltipProps} from '.';
import ChartHelper from '../../utils/ChartHelper';
import {Skia, TextAlign, Paragraph} from '@shopify/react-native-skia';
import {DEFAULT_COLOR} from '../../constants';

export const Tooltip: React.FC<TooltipProps> = ({
  value,
  date,
  x,
  y,
  opacity,
}) => {
  const paragraph = useMemo(() => {
    return Skia.ParagraphBuilder.Make({
      textAlign: TextAlign.Center,
    })
      .pushStyle({
        fontSize: 14,
        color: Skia.Color(DEFAULT_COLOR),
      })
      .addText(`${value.toLocaleString('tr-TR')} TL`)
      .pushStyle({
        fontSize: 12,
        color: Skia.Color(DEFAULT_COLOR),
      })
      .addText('\n')
      .addText(`${ChartHelper.formatDateIntl(date)}`)
      .pop()
      .build();
  }, [value, date, x, y, opacity]);

  if (!opacity) return <></>;

  return <Paragraph paragraph={paragraph} x={x} y={y} width={200} />;
};
