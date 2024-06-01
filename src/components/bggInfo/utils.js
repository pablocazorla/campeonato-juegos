// Ratings BGG
const ratingsBGG = {
  0: "#666e75",
  1: "#b2151f",
  2: "#b2151f",
  3: "#d71925",
  4: "#d71925",
  5: "#5369a2",
  6: "#5369a2",
  7: "#1978b3",
  8: "#1d804c",
  9: "#186b40",
  10: "#186b40",
};

const listDependencyTexts = (function () {
  const o = [];
  let value = 0;
  while (value < 5) {
    o.push({
      min: "0",
      max: "0",
      value,
    });
    value++;
  }
  return o;
})();

const dependencyToData = (dependency) => {
  if (dependency.votes === "0|0|0|0|0") {
    return {
      dependency: "NoData",
    };
  }

  return {
    dependency: listDependencyTexts[parseInt(dependency?.value || 0, 10)].min,
  };
};
//
export const getStatsOfElement = (element) => {
  if (!element) {
    return {
      rate: 1,
      rateColor: ratingsBGG[0],
      rateVotes: 1,
      weight: 1,
      weightVotes: 1,
      dependency: 0,
    };
  }

  const { bgg_id, rate, rate_votes, weight, weight_votes, dependency, rank } =
    element;

  return {
    isInBGG: `${bgg_id}` !== "23953",
    rate: Math.round((rate || 0) * 10) / 10,
    rateColor: ratingsBGG[Math.floor(rate || 0)],
    rateVotes: parseInt(rate_votes || 0, 10),
    rank,
    weight: Math.round((weight || 0) * 100) / 100,
    weightVotes: parseInt(weight_votes || 0, 10),
    dependency,
  };
};
