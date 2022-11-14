import React, { FC, useCallback } from 'react';
import {
  ChartShallowDataShape,
  ColorSchemeType,
  DEFAULT_TRANSITION,
  formatValue,
  getColor
} from '../common';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import css from './BarListSeries.module.css';

export interface BarListSeriesProps {
  /**
   * Data for the chart.
   */
  data?: ChartShallowDataShape[];

  /**
   * Color scheme for the chart.
   */
  colorScheme?: ColorSchemeType;

  /**
   * The bar item class name.
   */
  itemClassName?: string;

  /**
   * Label css class name.
   */
  labelClassName?: string;

  /**
   * Label value class name.
   */
  valueClassName?: string;

  /**
   * Bar component class name.
   */
  barClassName?: string;

  /**
   * Bar container class name.
   */
  outerBarClassName?: string;

  /**
   * Item was clicked.
   */
  onItemClick?: (data: ChartShallowDataShape) => void;

  /**
   * Item had mouse enter.
   */
  onItemMouseEnter?: (data: ChartShallowDataShape) => void;

  /**
   * Item had mouse leave.
   */
  onItemMouseLeave?: (data: ChartShallowDataShape) => void;
}

export const BarListSeries: FC<Partial<BarListSeriesProps>> = ({
  data,
  colorScheme,
  itemClassName,
  labelClassName,
  outerBarClassName,
  valueClassName,
  barClassName,
  onItemClick,
  onItemMouseEnter,
  onItemMouseLeave
}) => {
  const renderBar = useCallback(
    (item, index) => {
      const fill = getColor({
        data,
        colorScheme,
        point: item.data,
        index
      });

      return (
        <div className={classNames(css.outerBar, outerBarClassName)}>
          <motion.div
            transition={DEFAULT_TRANSITION}
            className={classNames(css.bar, barClassName)}
            initial={{ width: '0%' }}
            animate={{ width: `${item.data}%` }}
            style={{ background: fill }}
          />
        </div>
      );
    },
    [barClassName, outerBarClassName, colorScheme, data]
  );

  return (
    <>
      {data.map((d, i) => (
        <div
          key={d.key as string}
          role="listitem"
          className={classNames(css.item, itemClassName, {
            [css.clickable]: onItemClick
          })}
          onMouseEnter={() => onItemMouseEnter?.(d)}
          onMouseLeave={() => onItemMouseLeave?.(d)}
          onClick={() => onItemClick?.(d)}
        >
          <label className={classNames(css.label, labelClassName)}>
            {d.key as string}
          </label>
          {renderBar(d, i)}
          <label className={valueClassName}>
            <small>{formatValue(d.metadata.value)}</small>
          </label>
        </div>
      ))}
    </>
  );
};

BarListSeries.defaultProps = {
  colorScheme: 'cybertron'
};
