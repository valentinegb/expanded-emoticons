import { Plugin } from "@vizality/entities";
import { Commands } from "@vizality/api";

import Emoticons from "./emoticons.json";

export default class ExpandedEmoticons extends Plugin {
  start() {
    Emoticons.forEach((emoticon) => {
      if (typeof emoticon.emoticon != "string") {
        const parentJson = emoticon;
        emoticon.emoticon.forEach((emoticon) => {
          Commands.registerCommand({
            command:
              parentJson.name + (parentJson.emoticon.indexOf(emoticon) + 1),
            aliases: parentJson?.aliases,
            description: `Appends ${emoticon} to your message.`,
            options: [
              {
                name: "message",
              },
            ],
            executor: (args) => {
              return {
                send: true,
                result: `${
                  args[0] ? `${args.slice(0).join(" ")} ` : ""
                }${emoticon}`,
              };
            },
          });
        });
      } else {
        Commands.registerCommand({
          command: emoticon.name,
          aliases: emoticon?.aliases,
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
      }
    });
  }

  stop() {
    Commands.unregisterCommandsByCaller("expanded-emoticons");
  }
}
