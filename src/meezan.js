import { Skill, Launch, Intent } from 'alexa-annotations';
import { ssml } from 'alexa-ssml';
import request from 'request-promise';
import { say, ask, DirectiveType } from './privates/alexa-response/index.min';

@Skill
export default class Meezan {

  @Intent('AboutIntent')
  async about() {
    const aboutText = 'Meezan is a Quran skill for Alexa. An audio file follows.';
    return say(aboutText)
      .card({ title: 'Meezan', content: aboutText })
      .audio({
        type: DirectiveType.Play,
        url: 'http://www.everyayah.com/data/Alafasy_64kbps/001000.mp3',
        offsetInMilliseconds: 0,
      });
  }

  @Intent('VerseCountIntent')
  async verseCount({ Chapter }) {
    let speechOutput = `Sorry, I don\'t know anything about chapter ${Chapter}... check back later, I\'m always learning!`;

    try {
      // Fetch info about requested chapter and build dynamic response.
      const response = await request.get(`http://meezanapi.azurewebsites.net/chapters/${Chapter}`);
      const chapterInfo = JSON.parse(response);
      speechOutput = `Chapter ${chapterInfo.id}, Surah ${chapterInfo.name.arroman}, which means ${chapterInfo.name.en}, has ${chapterInfo.ayas} verses.`;
    } catch (err) {
      speechOutput = `Hmm, I ran into a problem and could not process your request. Please try again later. More information: ${err}`;
    }

    return say(speechOutput).card({ title: 'Meezan', content: speechOutput });
  }

  @Intent('ChapterCountIntent')
  async chapterCount() {
    const speechOutput = 'The Holy Quran contains 114 chapters, called "Surahs" in Arabic';

    return say(speechOutput).card({ title: 'Meezan', content: speechOutput });
  }

  @Launch
  async launch() {
    return say('Meezan launched!');
  }

  @Intent('AMAZON.HelpIntent')
  async help() {
    let speechOutput = '';
    speechOutput += 'Here are some things you can say: ';
    speechOutput += 'Tell me how many verses are in chapter 1 of the Holy Quran. ';
    speechOutput += 'Tell me about the skill developer. ';
    speechOutput += 'You can also say stop if you\'re done. ';
    speechOutput += 'So, how can I help?';

    return ask(speechOutput).reprompt('So, how can I help?');
  }

  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
  async stop() {
    return say(<speak>Goodbye!</speak>);
  }
}
