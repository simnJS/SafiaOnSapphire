import { Listener, LogLevel, type ChatInputCommandSuccessPayload } from '@sapphire/framework';
import type { Logger } from '@sapphire/plugin-logger';
import { logSuccessCommand } from '../../../lib/utils';
import { UpdateCommandCount } from '../../../lib/stats';

export class UserListener extends Listener {
	public override run(payload: ChatInputCommandSuccessPayload) {
		logSuccessCommand(payload);
    UpdateCommandCount(payload);
	}

	public override onLoad() {
		this.enabled = (this.container.logger as Logger).level <= LogLevel.Debug;
		return super.onLoad();
	}
}
