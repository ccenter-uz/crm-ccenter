import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsObject,
  IsIn,
} from 'class-validator';

export class CreateApplicationOrgDto {
  @IsString()
  // @IsNotEmpty()
  sub_category_id: string;

  @IsString()
  @IsNotEmpty()
  above_incomes: string;

  @IsString()
  applicant: string;

  @IsString()
  application_sort: string;

  @IsString()
  application_type: string;



  @IsString()
  comment: string;

  @IsString()
  @IsNotEmpty()
  crossfields: string;

  @IsString()
  deadline_date: string;

  @IsString()
  director_fullName: string;

  @IsString()
  dublicate: string;

  @IsString()
  income_date: string;

  @IsString()
  incoming_number: string;

  @IsString()
  organization_name: string;

  @IsString()
  organization_type: string;

  @IsString()
  outcome_date: string;
  @IsString()
  outcoming_number: string;
  @IsString()
  perform_date: string;
  @IsString()
  performer: string;
  @IsString()
  region: string;
  @IsString()
  request_type: string;
  @IsString()
  resend_application: string;
  @IsString()
  response: string;
  @IsString()
  response_to_request: string;
  @IsString()
  seen_date_breaked: string;
  @IsString()
  where_seen: string;

}
