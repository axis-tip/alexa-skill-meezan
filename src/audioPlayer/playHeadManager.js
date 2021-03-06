import requestpromise from 'request-promise';
import { MeezanApiUri } from '../definitions.json';

export default class PlayHeadManager {

  // Gets the playHead state for a user.
  static async getPlayHeadAsync(userId, accessToken) {
    if (!userId || !accessToken) {
      throw new Error(`Invalid user credentials ${userId} | ${accessToken}.`);
    }

    const options = {
      method: 'GET',
      uri: `${MeezanApiUri}/v1/oauth/playHeads/${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      json: true, // Automatically parses the JSON string in the response
    };

    return await requestpromise(options);
  }

  // Sets the playHead state for a user.
  static async setPlayHeadAsync(playHead, userId, accessToken) {
    if (!userId || !playHead || !accessToken) {
      throw new Error(`Invalid playHead ${JSON.stringify(playHead)} or user credentials ${userId} | ${accessToken}.`);
    }

    const options = {
      method: 'PUT',
      uri: `${MeezanApiUri}/v1/oauth/playHeads/${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: playHead,
      json: true, // Automatically stringifies the body to JSON
    };

    return await requestpromise(options);
  }

  // Deletes the playHead state for a user.
  static async deletePlayHeadAsync(userId, accessToken) {
    if (!userId || !accessToken) {
      throw new Error(`Invalid user credentials ${userId} | ${accessToken}.`);
    }

    const options = {
      method: 'DELETE',
      uri: `${MeezanApiUri}/v1/oauth/playHeads/${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return await requestpromise(options);
  }
}
