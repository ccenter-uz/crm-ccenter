import { Module } from '@nestjs/common';
import { ApplicationOrgController } from './application_org_center.controller';
import { ApplicationOrgServise } from './application_org_center.service';

@Module({
  controllers: [ApplicationOrgController],
  providers: [ApplicationOrgServise],
})
export class ApplicationOrgModule {}
