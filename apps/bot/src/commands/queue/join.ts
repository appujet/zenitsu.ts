import {
    type CommandContext,
    createStringOption,
    SubCommand,
    AutoLoad,
    Declare,
    Options
} from 'seyfert';
import { MessageFlags } from 'seyfert/lib/types/index.js';

const options = {
    game: createStringOption({
        description: `an option`,
        choices: [
            {
                name: `tictactoe`,
                value: `tictactoe`
            },
            {
                name: `connect4`,
                value: `connect4`
            }
        ] as const,
        required: true
    })
};

@Declare({
    name: `join`,
    description: `a command`
})
@Options(options)
@AutoLoad()
export default class Join extends SubCommand {
    async run(ctx: CommandContext<typeof options>) {
        if (ctx.client.queue.has(ctx.author.id)) {
            return ctx.write({
                content: `You are already in the queue.`,
                flags: MessageFlags.Ephemeral
            });
        }

        const response = await ctx.deferReply(undefined, true);

        ctx.client.queue.join({
            id: ctx.author.id,
            type: ctx.options.game,
            messageId: response.id,
            channelId: ctx.channelId
        });

        return ctx.editResponse({
            content: `You have joined the queue for ${ctx.options.game}.`
        });
    }
}
