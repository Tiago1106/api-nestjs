import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserHttpDTO {
  @ApiProperty({ example: 'Gabriela', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'gabriela@email.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '123456', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  newPassword?: string;

  @ApiProperty({ example: '123456', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  oldPassword?: string;
}
