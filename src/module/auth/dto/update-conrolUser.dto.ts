import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateControlUserDto {


  @IsString()
  @MaxLength(100)
  username: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
