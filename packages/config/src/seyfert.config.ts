import type { InternalRuntimeConfig } from 'seyfert/lib/client/base';

import { GatewayIntentBits } from 'seyfert/lib/types/index.js';
import { join } from 'node:path';
import { config } from 'seyfert';

process.loadEnvFile(join(process.cwd(), `..`, `..`, `.env`));

const TOKEN = process.env.TOKEN;

if (!TOKEN) {
    throw new Error(`Cannot start process without token`);
}

export const runtimeConfig: InternalRuntimeConfig = config.bot({
    locations: {
        base: `dist`,
        commands: `commands`,
        //events: `events`,
        components: `components`,
        langs: `locales`
    },
    token: TOKEN,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ],
    debug: false
});
