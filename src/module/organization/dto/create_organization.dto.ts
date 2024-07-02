import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsObject,
  IsIn,
} from 'class-validator';

export class CreateApplicationCallCenterDto {
  @IsString()
  // @IsNotEmpty()
  sub_category_id: string;

  @IsString()
  @IsNotEmpty()
  applicant: string;

  @IsString()
  application_type: string;

  @IsString()
  comment: string;

  @IsString()
  crossfields: string;

  @IsString()
  field: string;

  @IsString()
  income_date: string;

  @IsString()
  @IsNotEmpty()
  incoming_number: string;

  @IsString()
  organization_name: string;

  @IsString()
  organization_type: string;

  @IsString()
  perform_date: string;

  @IsString()
  performer: string;

  @IsString()
  region: string;

  @IsString()
  resend_application: string;


  @IsString()
  response: string;

  @IsString()
  sended_to_organizations: string;

}
