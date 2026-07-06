interface ISet {
  set: number[][];
  negative: number[][];
}

export const useTest = () => {
  const getFullSet = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, index) => index + start);

  const getUnionSet = (inputSet: number[][]) => {
    const unionSet: number[] = [];

    inputSet.forEach((num) => {
      getFullSet(num[0], num[1]).forEach((set) => {
        if (!unionSet.includes(set)) unionSet.push(set);
      });
    });

    return unionSet;
  };

  const testFunction = ({ set, negative }: ISet) => {
    const unionSet = getUnionSet(set);
    const splitedUnion = unionSet.sort((a, b) => a - b);

    const newSet: ISet["set"] = [];
    let currentIndex = 0;

    negative.forEach((negSet) => {
      const left = negSet[0];
      const right = negSet[negSet.length - 1];
      const leftIndex = splitedUnion.indexOf(left); 
      const rightIndex = splitedUnion.indexOf(right);

      if (leftIndex > currentIndex) {
        newSet.push(splitedUnion.slice(currentIndex, leftIndex));
      }

      if (rightIndex) {
        currentIndex = rightIndex + 1;
      }
    });

    if (currentIndex < splitedUnion.length) {
      newSet.push(splitedUnion.slice(currentIndex));
    }

    const output = newSet.map((set) => [
      set[0],
      ...(set.length > 1 ? [set[set.length - 1]] : []),
    ]);
    
    console.log(output);
  };

  testFunction(inputSet["1"]);
};

const inputSet: Record<number, ISet> = {
  1: {
    set: [
      [1, 5],
      [2, 20],
    ],
    negative: [[3, 7]],
  },
  2: {
    set: [
      [3, 15],
      [2, 20],
      [5, 10],
    ],
    negative: [
      [3, 5],
      [8, 10],
    ],
  },
  3: {
    set: [
      [1, 17],
      [5, 20],
      [25, 100],
    ],
    negative: [
      [6, 9],
      [8, 11],
      [30, 50],
    ],
  },
  4: {
    set: [
      [1, 7],
      [10, 20],
      [25, 100],
    ],
    negative: [
      [2, 5],
      [11, 21],
      [30, 50],
    ],
  },
};
