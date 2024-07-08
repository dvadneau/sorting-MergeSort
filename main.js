const split = (listToSort, listFirstHalf, listSecondHalf, step = 0) => {
  let index = 0;
  let secondHalfStartIndex = listFirstHalf.length;
  for (const element in listToSort) {
    if (index < secondHalfStartIndex) {
      listFirstHalf[index] = listToSort[index];
    } else {
      listSecondHalf[index - secondHalfStartIndex] = listToSort[index];
    }
    index++;
  }
};

const merge = (listToSort, listFirstHalf, listSecondHalf, step = 0) => {
  let mergeIndex = 0;
  let firstHalfIndex = 0;
  let secondHalfIndex = 0;

  console.groupCollapsed(
    'merge',
    displayArray(listFirstHalf) + ' ' + displayArray(listSecondHalf)
  );

  while (
    firstHalfIndex < listFirstHalf.length &&
    secondHalfIndex < listSecondHalf.length
  ) {
    if (listFirstHalf[firstHalfIndex] < listSecondHalf[secondHalfIndex]) {
      listToSort[mergeIndex] = listFirstHalf[firstHalfIndex];
      firstHalfIndex++;
    } else {
      listToSort[mergeIndex] = listSecondHalf[secondHalfIndex];
      secondHalfIndex++;
    }
    mergeIndex++;
  }

  if (firstHalfIndex < listFirstHalf.length) {
    while (mergeIndex < listToSort.length) {
      listToSort[mergeIndex++] = listFirstHalf[firstHalfIndex++];
    }
  }
  if (secondHalfIndex < listSecondHalf.length) {
    while (mergeIndex < listToSort.length) {
      listToSort[mergeIndex++] = listSecondHalf[secondHalfIndex++];
    }
  }
  console.log('merged:', displayArray(listToSort));
  console.groupEnd();
};

const buildPrefix = (n, c = ' ') => {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += s + c;
  }
  return s;
};
const buildPrefix2 = (n) => new Array(n).map(() => ' ').join('');
const displayArray = (arr) => `[${arr.join(', ')}]`;

const mergeSort = (listToSort) => {
  if (listToSort.length === 1) {
    console.log(displayArray(listToSort), 'mergeSort');
    return;
  }
  console.groupCollapsed(displayArray(listToSort), 'mergeSort');

  let midIndex = Math.floor(listToSort.length / 2) + (listToSort.length % 2);
  let listFirstHalf = new Array(midIndex);
  let listSecondHalf = new Array(listToSort.length - midIndex);

  split(listToSort, listFirstHalf, listSecondHalf);

  mergeSort(listFirstHalf);
  mergeSort(listSecondHalf);

  merge(listToSort, listFirstHalf, listSecondHalf);

  console.log('sorted:', displayArray(listToSort));
  console.groupEnd();
};

const arrayToSort = [5, 4, 6, 2, 1, 10, 7, 3, 8, 9];
console.log('initial array:', arrayToSort);

mergeSort(arrayToSort);
console.log('sorted array:', arrayToSort);
