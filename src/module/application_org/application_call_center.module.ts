import { Module } from '@nestjs/common';
import { ApplicationCallCenterDraftController } from './application_call_center.controller';
import { ApplicationCallCenterDraftServise } from './application_call_center.service';

@Module({
  controllers: [ApplicationCallCenterDraftController],
  providers: [ApplicationCallCenterDraftServise],
})
export class ApplicationCallCenterDraftModule {}
