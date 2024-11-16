import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC, memo, useMemo} from 'react';
import {imageData} from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import {screeHeight, screeWidth} from '@utils/Scaling';

const ProductSlider = () => {
  const rowsData = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        style={styles.autoScroll}
        endPaddingWidth={0}
        duration={10000}>
        <View style={styles.gridContainer}>
          {rowsData.map((item, index) => {
            return <MemoizedRow key={index} row={item} rowIndex={index} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const rows: FC<{row: typeof imageData; rowIndex: number}> = ({
  row,
  rowIndex,
}) => {
  const horizontalShift = rowIndex % 2 === 0 ? -20 : 20;
  return (
    <View style={[styles.row, {transform: [{translateX: horizontalShift}]}]}>
      {row.map((image: any, index: number) => {
        return (
          <View key={index} style={[styles.itemContainer]}>
            <Image source={image} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = memo(rows);
export default ProductSlider;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screeWidth * 0.26,
    height: screeWidth * 0.26,
    backgroundColor: '#e9f7f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  autoScroll: {
    position: 'absolute',
    zIndex: -2,
  },
  gridContainer: {
    justifyContent: 'center',
    overflow: 'visible',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
