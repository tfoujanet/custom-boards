import { splitArrayInChunks } from "@/services/array-helper";

describe("ArrayHelper", () => {
  it("Un tableau de 100 éléments doit être séparés en 2 tableaux de 50", () => {
    const givenArray = [...Array(100)].map((_, i) => i);

    const result = splitArrayInChunks(givenArray, 50);
    expect(result).toHaveLength(2);
    expect(result.map((_) => _.length)).toStrictEqual([50, 50]);
  });

  it("Un tableau de 70 éléments doit être séparés en 1 tableau de 50 et un tableau de 20", () => {
    const givenArray = [...Array(70)].map((_, i) => i);

    const result = splitArrayInChunks(givenArray, 50);
    expect(result).toHaveLength(2);
    expect(result.map((_) => _.length)).toStrictEqual([50, 20]);
  });
});
