import { Plugin } from "@vizality/entities";
import { Commands } from "@vizality/api";

import Emoticons from "./emoticons.json";

export default class ExpandedEmoticons extends Plugin {
  start() {
    Emoticons.forEach((emoticon) => {
      if (typeof emoticon.emoticon != "string") {
        const parentJson = emoticon;

        let varients = [];
        emoticon.emoticon.forEach((emoticon) => {
          varients.push({
            command: `${parentJson.emoticon.indexOf(emoticon) + 1}`,
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

        Commands.registerCommand({
          command: emoticon.name,
          aliases: emoticon?.aliases,
          description: "See subcommands for details.",
          executor: (args) => {
            const subcommand = varients[args[0] - 1];
            if (!subcommand) {
              return {
                result: `Please specify a valid varient.`,
              };
            }

            return subcommand.executor(args.slice(1));
          },
          autocomplete: (args) => {
            if (args[0] != void 0 && args.length == 1) {
              return {
                commands: Object.values(varients).filter(({ command }) =>
                  command.includes(args[0])
                ),
              };
            }

            if (!varients[args[0] - 1]) {
              return false;
            }
          },
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
