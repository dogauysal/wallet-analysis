import React, {useState} from 'react';
import {ChartProps} from '.';
import {Area, CartesianChart, Line} from 'victory-native';
import {View} from 'react-native';
import {chartStyles as styles} from './Chart.styles';
import {
  DashPathEffect,
  useFont,
  Line as SkiaLine,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';
import {
  BRAND_COLOR,
  DEFAULT_COLOR,
  TOOLTIP_COLOR,
  UNSELECTED_COLOR,
} from '../../constants';
import ChartHelper from '../../utils/ChartHelper';
import {Tooltip} from '../Tooltip/Tooltip';
import {
  runOnJS,
  runOnUI,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

export const Chart: React.FC<ChartProps> = ({data}) => {
  const font = useFont(require('../../assets/fonts/Sans.ttf'));

  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);
  const isActive = useSharedValue(0);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [active, setActive] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(0);

  const currentIndex = useSharedValue(data.length - 1);

  useDerivedValue(() => {
    runOnJS(setX)(touchX.value);
    runOnJS(setY)(touchY.value);
    runOnJS(setActive)(isActive.value);
  }, [touchX, touchY, isActive, currentIndex]);

  const gesture = Gesture.Pan()
    .onBegin(e => {
      touchX.value = e.x;
      touchY.value = e.y;
      isActive.value = 1;
    })
    .onUpdate(e => {
      touchX.value = e.x;
      touchY.value = e.y;
    })
    .onEnd(() => {
      currentIndex.value = data.length - 1;
      isActive.value = 0;
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <CartesianChart
          data={data}
          xKey={'x'}
          yKeys={['y']}
          domainPadding={{top: 50}}
          xAxis={{
            lineWidth: 0,
          }}
          yAxis={[
            {
              tickCount: 4,
              lineWidth: 1,
              linePathEffect: <DashPathEffect intervals={[8, 4]} />,
              formatYLabel: label => ChartHelper.formatNumber(label),
              font,
            },
          ]}
          frame={{
            lineWidth: 0,
          }}>
          {({points, chartBounds}) => {
            runOnUI(() => {
              const chartWidth = chartBounds.right - chartBounds.left;
              const pMargin = chartWidth / data.length;

              const distanceToStart = touchX.value - chartBounds.left;
              const index = Math.floor(distanceToStart / pMargin);

              if (!isActive.value) {
                currentIndex.value = data.length - 1;
                return;
              }

              if (index > data.length) {
                currentIndex.value = data.length - 1;
              } else if (index < 0) {
                currentIndex.value = 0;
              } else {
                currentIndex.value = index;
              }
            })();

            const left = points.y.slice(0, currentIndex.value);
            const right = points.y.slice(currentIndex.value);

            return (
              <>
                <View>
                  <Line
                    points={left}
                    color={BRAND_COLOR}
                    strokeWidth={1}
                    animate={{
                      type: 'timing',
                      duration: 500,
                    }}
                  />
                  <Line
                    points={right}
                    color={DEFAULT_COLOR}
                    strokeWidth={1}
                    animate={{
                      type: 'timing',
                      duration: 500,
                    }}
                  />
                  <Area points={left} y0={chartBounds.bottom}>
                    <LinearGradient
                      start={vec(chartBounds.bottom, 0)}
                      end={vec(chartBounds.bottom, chartBounds.bottom)}
                      colors={[BRAND_COLOR, BRAND_COLOR]}
                    />
                  </Area>
                  <Area points={right} y0={chartBounds.bottom}>
                    <LinearGradient
                      start={vec(chartBounds.bottom, 0)}
                      end={vec(chartBounds.bottom, chartBounds.bottom)}
                      colors={[UNSELECTED_COLOR, UNSELECTED_COLOR]}
                    />
                  </Area>
                </View>
                {isActive && (
                  <>
                    <Tooltip
                      value={data[currentIndex.value].y}
                      date={data[currentIndex.value].x}
                      x={touchX.value - 100}
                      y={chartBounds.top}
                      opacity={isActive.value}
                    />
                    <SkiaLine
                      p1={{x: touchX.value, y: 30}}
                      p2={{x: touchX.value, y: chartBounds.bottom}}
                      color={TOOLTIP_COLOR}
                      strokeWidth={2}
                      opacity={isActive}>
                      <DashPathEffect intervals={[8, 4]} phase={0} />
                    </SkiaLine>
                  </>
                )}
              </>
            );
          }}
        </CartesianChart>
      </View>
    </GestureDetector>
  );
};
