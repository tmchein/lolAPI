import request from "postman-request";

const make_API_call = (url) => {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      if (err) reject(err);
      const {
        info: { participants },
      } = body;

      const matchData = participants.map((participant) => {
        return { summonerName: participant.summonerName };
      });

      resolve(matchData);
    });
  });
};

export { make_API_call };
