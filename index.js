import { Plugin } from "@vizality/entities";
import { Commands } from "@vizality/api";

import Emoticons from "./emoticons.json";

export default class ExpandedEmoticons extends Plugin {
  start() {
    Emoticons.forEach((emoticon) => {
      Commands.registerCommand({
        command: emoticon.name,
        description: `Appends ${emoticon.emoticon} to your message.`,
        options: [
          {
            name: "message",
          },
        ],
        executor: (args) => {
          return {
            send: true,
            result: `${args[0] ? `${args[0]} ` : ""}${emoticon.emoticon}`,
          };
        },
      });
    });
  }

  stop() {
    Emoticons.forEach((emoticon) => {
      Commands.unregisterCommand(emoticon.name);
    });
  }
}
