import { Plugin } from "@vizality/entities";
import { Commands } from "@vizality/api";

import Emoticons from "./emoticons.json";

export default class ExpandedEmoticons extends Plugin {
  start() {
    Emoticons.forEach((emoticon) => {
      Commands.registerCommand({
        command: emoticon.name,
        aliases: emoticon.aliases || [],
        description: `Appends ${emoticon.emoticon} to your message.`,
        options: [
          {
            name: "message",
          },
        ],
        executor: (args) => {
          return {
            send: true,
            result: `${args[0] ? `${args.slice(0).join(" ")} ` : ""}${
              emoticon.emoticon
            }`,
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
