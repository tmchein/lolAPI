import request from "postman-request";

const make_API_call = (url, summoner) => {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      if (err) reject(err);
      const {
        info: { participants, gameCreation },
      } = body;

      const matchData = participants.map(
        ({
          summonerName,
          championName,
          item1,
          item2,
          item3,
          item4,
          item5,
          item6,
          kills,
          deaths,
          assists,
          win,
        }) => {
          return {
            ...(summoner.toLowerCase() === summonerName.toLowerCase() && {
              win,
            }),
            summonerName,
            championName,
            score: {
              kills,
              deaths,
              assists,
            },
            items: [
              item1 === 0
                ? ""
                : `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/img/item/${item1}.png`,
              item2 === 0
                ? ""
                : `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/img/item/${item2}.png`,
              item3 === 0
                ? ""
                : `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/img/item/${item3}.png`,
              item4 === 0
                ? ""
                : `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/img/item/${item4}.png`,
              item5 === 0
                ? ""
                : `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/img/item/${item5}.png`,
              item6 === 0
                ? ""
                : `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/img/item/${item6}.png`,
            ],
          };
        }
      );

      resolve([{ date: gameCreation }, matchData]);
    });
  });
};

export { make_API_call };
