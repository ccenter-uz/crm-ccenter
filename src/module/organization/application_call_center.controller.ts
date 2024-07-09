import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationCallCenterServise } from './application_call_center.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateApplicationCallCenterDto } from './dto/create_organization.dto';
import { UpdateApplicationCallCenterDto } from './dto/update_organization.dto';
@Controller('organization')
@ApiTags('Application Call Center')
@ApiBearerAuth('JWT-auth')
export class ApplicationCallCenterController {
  readonly #_service: ApplicationCallCenterServise;
  constructor(service: ApplicationCallCenterServise) {
    this.#_service = service;
  }

  @Get('/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiOperation({
    summary:
      "sana formati 01.04.2024 to'ldirilmagan joyga null qiymati jonatiladi sana va page paramlari null qiymat qabul qilmaydi ",
  })
  async findall(
    @Query('categoryId') categoryId: string,
    @Query('subCategoryId') subCategoryId: string,
    @Query('region') region: string,
    @Query('income_number') income_number: string,
    @Query('phone') phone: string,
    @Query('date_from') fromDate: string,
    @Query('date_to') untilDate: string,

    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return await this.#_service.findAll(
      categoryId,
      subCategoryId,
      region,
      income_number,
      phone,
      fromDate,
      untilDate,
      +page,
      +pageSize,
    );
  }

  @Get('/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string) {
    return await this.#_service.findOne(id);
  }

  // @UseGuards(jwtGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [],
      properties: {
        // category_id: {
        //   type: 'string',
        //   default: '4141561fds4g964g498e',
        // },
        sub_category_id: {
          type: 'string',
          default: 'sadf456asdf65asdf564asf',
        },
        applicant: {
          type: 'string',
          default: 'Мурожаатчи',
        },
        application_type: {
          type: 'string',
          default: 'Мурожаат тури (ариза, таклиф, шикоят)',
        },
        comment: {
          type: 'string',
          default: 'Мурожаатнинг қисқача мазмуни',
        },

        // income_number: {
        //   type: 'string',
        //   default: 'N302',
        // },
        phone :{
          type: 'string',
          default: '998933843484',
        },

        income_date: {
          type: 'string',
          default: '2024-07-02',
        },
        incoming_number: {
          type: 'string',
          default: 'Входящий номер',
        },
        organization_name: {
          type: 'string',
          default: 'Бошқарма номи',
        },
        organization_type: {
          type: 'string',
          default: 'Юридический / Физический лицо',
        },
        perform_date: {
          type: 'string',
          default: '2024-07-01',
        },
        performer: {
          type: 'string',
          default: 'Ижрочи',
        },
        region: {
          type: 'string',
          default: 'Toshkent shahar',
        },
        resend_application: {
          type: 'string',
          default: 'Янги мурожаат ёки Такрорий мурожаатлар',
        },
        response: {
          type: 'string',
          default: '2024-07-03',
        },
        sended_to_organizations: {
          type: 'string',
          default: '2024-07-02',
        },
      },
    },
  })
  // @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  // @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() createOrganizationDto: CreateApplicationCallCenterDto,
  ): Promise<void> {
    return await this.#_service.create(createOrganizationDto);
  }

  // @UseGuards(jwtGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        //   type: 'string',
        //   default: '4141561fds4g964g498e',
        // },
        sub_category_id: {
          type: 'string',
          default: 'sadf456asdf65asdf564asf',
        },
        applicant: {
          type: 'string',
          default: 'Мурожаатчи',
        },
        application_type: {
          type: 'string',
          default: 'Мурожаат тури (ариза, таклиф, шикоят)',
        },
        comment: {
          type: 'string',
          default: 'Мурожаатнинг қисқача мазмуни',
        },
        // income_number: {
        //   type: 'string',
        //   default: 'N302',
        // },
        phone :{
          type: 'string',
          default: '998933843484',
        },
        // crossfields: {
        //   type: 'string',
        //   default: '2',
        // },
        income_date: {
          type: 'string',
          default: '2024-07-02',
        },
        incoming_number: {
          type: 'string',
          default: 'Входящий номер',
        },
        organization_name: {
          type: 'string',
          default: 'Бошқарма номи',
        },
        organization_type: {
          type: 'string',
          default: 'Юридический / Физический лицо',
        },
        perform_date: {
          type: 'string',
          default: '2024-07-01',
        },
        performer: {
          type: 'string',
          default: 'Ижрочи',
        },
        region: {
          type: 'string',
          default: 'Toshkent shahar',
        },
        resend_application: {
          type: 'string',
          default: 'Янги мурожаат ёки Такрорий мурожаатлар',
        },
        response: {
          type: 'string',
          default: '2024-07-03',
        },
        sended_to_organizations: {
          type: 'string',
          default: '2024-07-02',
        },
      },
    },
  })
  // @ApiOperation({ summary: 'Update Org' })
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(AnyFilesInterceptor())
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateApplicationCallCenterDto,
  ): Promise<void> {
    await this.#_service.update(id, updateOrganizationDto);
  }

  // @UseGuards(jwtGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.remove(id);
  }
}
