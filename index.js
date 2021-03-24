import { Plugin } from "@vizality/entities";
import { Commands } from "@vizality/api";

const emoticons = [
  {
    name: "troubled",
    emoticon: "(>_<)",
  },
];

export default class ExpandedEmoticons extends Plugin {
  start() {
    emoticons.forEach((emoticon) => {
      Commands.registerCommand({
        command: emoticon.name,
        description: emoticon.emoticon,
        executor: () => {
          return {
            send: true,
            result: emoticon.emoticon,
          };
        },
      });
    });
  }

  stop() {
    emoticons.forEach((emoticon) => {
      Commands.unregisterCommand(emoticon.name);
    });
  }
}
