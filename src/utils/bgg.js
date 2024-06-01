const NO_RANK_VALUE = 999999999;

export const extractBGGdataFromElement = (data) => {
  if (!data || !data.items || !data.items.item) {
    return null;
  }

  const bggElement = data.items.item;

  const {
    id: bgg_id,
    image: thumbnail,
    type: typeString,
    versions: versionList,
    name: namesList,
    poll,
    statistics,
    yearpublished,
  } = bggElement;

  // NAMES *******************************************************

  const namesComp = (() => {
    const namesArr =
      typeof namesList.forEach === "undefined" ? [namesList] : namesList;

    const o = namesArr.reduce((obj, n) => {
      const { type, value } = n;
      if (type === "primary") {
        obj.name = value;
      }
      return obj;
    }, {});

    return o;
  })();

  // TYPES *******************************************************
  const typesPool = {
    boardgame: 1,
    boardgameexpansion: 2,
  };

  // POLL *******************************************************
  // Dependency
  const dependencyPoll = (() => {
    const list = poll
      ? poll.filter((p) => {
          return p.name === "language_dependence";
        })
      : [];

    if (list[0]) {
      const results = list[0]?.results?.result;

      if (results && results.length) {
        results.sort((a, b) => {
          return a.level < b.level ? -1 : 1;
        });

        let most = 0;
        let max = -1;

        results.forEach((r, i) => {
          const num = parseInt(r.numvotes, 10);
          if (num > max) {
            max = num;
            most = i;
          }
        });

        return {
          dependency: most || "0",
        };
      }
    } else {
      return {
        dependency: "0",
      };
    }
  })();

  // STATISTIC
  const stats = (() => {
    let rank = NO_RANK_VALUE;
    let rate = null;
    let rate_votes = null;
    let weight = null;
    let weight_votes = null;
    //
    if (statistics && statistics.ratings) {
      const { ratings } = statistics;

      // rank
      if (ratings?.ranks?.rank) {
        const rankArr =
          typeof ratings.ranks.rank.forEach === "undefined"
            ? [ratings.ranks.rank]
            : ratings.ranks.rank;
        const rankFiltered = rankArr.filter((ra) => {
          return ra.name === "boardgame";
        });
        if (rankFiltered[0]) {
          const newRank = parseInt(rankFiltered[0].value, 10);
          if (!isNaN(newRank)) {
            rank = newRank;
          }
        }
      }

      // rate
      if (ratings.average) {
        rate = ratings.average.value;
      }
      // rate_votes
      if (ratings.usersrated) {
        rate_votes = ratings.usersrated.value;
      }
      // weight
      if (ratings.averageweight) {
        weight = ratings.averageweight.value;
      }
      // averageweight
      if (ratings.numweights) {
        weight_votes = ratings.numweights.value;
      }
    }

    return { rank, rate, rate_votes, weight, weight_votes };
  })();

  // players
  const players = (() => {
    const {
      maxplayers: max_players,
      minplayers: min_players,
      maxplaytime: max_playtime,
      minplaytime: min_playtime,
      playingtime: playing_time,
    } = bggElement;

    const elem = {
      max_players,
      min_players,
      max_playtime,
      min_playtime,
      playing_time,
    };

    const o = {};

    for (let a in elem) {
      o[a] = elem[a] && elem[a].value ? elem[a].value : null;
    }

    return o;
  })();

  ////////////////
  const result = {
    bgg_id,
    year_published:
      yearpublished && yearpublished.value ? yearpublished.value : null,
    game_thumbnail: thumbnail,
    ...namesComp,
    type: typesPool[typeString] || 1,
    ...dependencyPoll,
    ...stats,
    ...players,
  };

  return result;
};
