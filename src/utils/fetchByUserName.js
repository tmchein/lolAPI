import request from "postman-request";
import CONTINENTS from "./continents.js";
import { make_API_call } from "./helper.js";

const getContinentByRegion = (region) => {
  const DEFAULT_CONTINENT = "americas";
  const continent = CONTINENTS[region] || DEFAULT_CONTINENT;
  return continent;
};

const fetchByName = async (region, username) => {
  return new Promise((resolve, reject) => {
    request(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${process.env.API_KEY}`,
      { json: true },
      (error, response, body) => {
        resolve(body);

        if (error) {
          reject(error);
        }
      }
    );
  });
};

const fetchDivision = (summonerID, region) => {
  return new Promise((resolve, reject) => {
    request(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${process.env.API_KEY}`,
      { json: true },
      (error, response, body) => {
        resolve(body);

        if (error) {
          reject(error);
        }
      }
    );
  });
};

const getSummonerMatchList = (userPuuid, region) => {
  return new Promise((resolve, reject) => {
    const continent = getContinentByRegion(region);
    request(
      `https://${continent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${userPuuid}/ids?start=0&count=10&api_key=${process.env.API_KEY}`,
      { json: true },
      (error, response, body) => {
        if (error || body.length <= 0) {
          reject({ message: "User has no available history matches" });
        }
        resolve(body);
      }
    );
  });
};

const getHistoryDetails = (matchIdArray, region) => {
  const continent = getContinentByRegion(region);
  let promises = [];
  matchIdArray.forEach((match) => {
    promises.push(
      make_API_call(
        `https://${continent}.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${process.env.API_KEY}`
      )
    );
  });

  Promise.all(promises).then((result) => {
    console.log("all resolved ", result);
  });
};

export { fetchByName, fetchDivision, getSummonerMatchList, getHistoryDetails };
