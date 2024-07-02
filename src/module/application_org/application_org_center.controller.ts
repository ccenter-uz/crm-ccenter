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
import { ApplicationOrgServise } from './application_org_center.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateApplicationOrgDto } from './dto/create_organization.dto';
import { UpdateApplicationOrgDto } from './dto/update_organization.dto';
@Controller('ApplicationOrgController')
@ApiTags('Application Org')
@ApiBearerAuth('JWT-auth')
export class ApplicationOrgController {
  readonly #_service: ApplicationOrgServise;
  constructor(service: ApplicationOrgServise) {
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
    @Query('date_from') fromDate: string,
    @Query('date_to') untilDate: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return await this.#_service.findAll(
      categoryId,
      subCategoryId,
      region,
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
        above_incomes: {
          type: 'string',
          default:
            'Юқори турувчи ва бошқа давлат ташкилотларидан келган мурожаатлар',
        },
        applicant: {
          type: 'string',
          default: 'Мурожаатчи',
        },
        application_sort: {
          type: 'string',
          default: 'Yozma',
        },
        application_type: {
          type: 'string',
          default: 'Ariza',
        },
        comment: {
          type: 'string',
          default: 'Мурожаатнинг қисқача мазмуни',
        },
        crossfields: {
          type: 'string',
          default: '2',
        },
        deadline_date: {
          type: 'string',
          default: '2024-07-11',
        },
        director_fullName: {
          type: 'string',
          default: 'Раҳбар (Ф.И.Ш)',
        },
        dublicate: {
          type: 'string',
          default: 'Дубликат',
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
          default: 'Физический',
        },
        outcome_date: {
          type: 'string',
          default: '2024-07-01',
        },
        outcoming_number: {
          type: 'string',
          default: 'Исходящий Номер',
        },
        perform_date: {
          type: 'string',
          default: '2024-07-07',
        },
        performer: {
          type: 'string',
          default: 'Ижрочи',
        },
        region: {
          type: 'string',
          default: 'Toshkent shahar',
        },
        request_type: {
          type: 'string',
          default: 'Мурожаат шакли',
        },
        resend_application: {
          type: 'string',
          default: 'Yangi',
        },
        response: {
          type: 'string',
          default: 'Tushuntirilgan',
        },
        response_to_request: {
          type: 'string',
          default: 'Мурожаат жавоби',
        },
        seen_date_breaked: {
          type: 'string',
          default: 'Кўриб чиқиш муддати бузилган',
        },
        where_seen: {
          type: 'string',
          default: "Markaziy apparatda ko'rilgan",
        },
      },
    },
  })
  // @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary:
      "sana formati 01.04.2024 to'ldirilmagan joyga null qiymati jonatiladi sana va page paramlari null qiymat qabul qilmaydi ",
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  // @UseInterceptors(AnyFilesInterceptor())
  async create(
    @Body() createOrganizationDto: CreateApplicationOrgDto,
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
        above_incomes: {
          type: 'string',
          default:
            'Юқори турувчи ва бошқа давлат ташкилотларидан келган мурожаатлар',
        },
        applicant: {
          type: 'string',
          default: 'Мурожаатчи',
        },
        application_sort: {
          type: 'string',
          default: 'Yozma',
        },
        application_type: {
          type: 'string',
          default: 'Ariza',
        },
        comment: {
          type: 'string',
          default: 'Мурожаатнинг қисқача мазмуни',
        },
        crossfields: {
          type: 'string',
          default: '2',
        },
        deadline_date: {
          type: 'string',
          default: '2024-07-11',
        },
        director_fullName: {
          type: 'string',
          default: 'Раҳбар (Ф.И.Ш)',
        },
        dublicate: {
          type: 'string',
          default: 'Дубликат',
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
          default: 'Физический',
        },
        outcome_date: {
          type: 'string',
          default: '2024-07-01',
        },
        outcoming_number: {
          type: 'string',
          default: 'Исходящий Номер',
        },
        perform_date: {
          type: 'string',
          default: '2024-07-07',
        },
        performer: {
          type: 'string',
          default: 'Ижрочи',
        },
        region: {
          type: 'string',
          default: 'Toshkent shahar',
        },
        request_type: {
          type: 'string',
          default: 'Мурожаат шакли',
        },
        resend_application: {
          type: 'string',
          default: 'Yangi',
        },
        response: {
          type: 'string',
          default: 'Tushuntirilgan',
        },
        response_to_request: {
          type: 'string',
          default: 'Мурожаат жавоби',
        },
        seen_date_breaked: {
          type: 'string',
          default: 'Кўриб чиқиш муддати бузилган',
        },
        where_seen: {
          type: 'string',
          default: "Markaziy apparatda ko'rilgan",
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOperation({
    summary:
      "sana formati 01.04.2024 to'ldirilmagan joyga null qiymati jonatiladi sana va page paramlari null qiymat qabul qilmaydi ",
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateApplicationOrgDto,
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
