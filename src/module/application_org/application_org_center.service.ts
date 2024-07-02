import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationOrgDto } from './dto/create_organization.dto';
import { UpdateApplicationOrgDto } from './dto/update_organization.dto';

import { Sub_Category_Section_Entity } from 'src/entities/sub_category_org.entity';
import { ApplicationCallCenterEntity } from 'src/entities/applicationCallCenter.entity';
import { Between } from 'typeorm';
import { ApplicationOrgEntity } from 'src/entities/applicationOrg.entity';

@Injectable()
export class ApplicationOrgServise {
  async findAll(
    categoryId: string,
    subCategoryId: string,
    region: string,
    fromDate: string,
    untilDate: string,
    pageNumber = 1,
    pageSize = 10,
  ) {
    const offset = (pageNumber - 1) * pageSize;
    if (fromDate == 'null' || untilDate == 'null') {
      const [results, total] = await ApplicationOrgEntity.findAndCount({
        where: {
          region: region == 'null' ? null : region,
          sub_category_org: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
        },
        relations: {
          sub_category_org: {
            category_org: true,
          },
        },
        skip: offset,
        take: pageSize,
        order: {
          create_data: 'desc',
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      const totalPages = Math.ceil(total / pageSize);

      return {
        results,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };
    } else {
      const fromDateFormatted = new Date(
        parseInt(fromDate.split('.')[2]),
        parseInt(fromDate.split('.')[1]) - 1,
        parseInt(fromDate.split('.')[0]),
      );
      const untilDateFormatted = new Date(
        parseInt(untilDate.split('.')[2]),
        parseInt(untilDate.split('.')[1]) - 1,
        parseInt(untilDate.split('.')[0]),
      );
      const [results, total] = await ApplicationOrgEntity.findAndCount({
        where: {
          region: region == 'null' ? null : region,
          sub_category_org: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          create_data: Between(fromDateFormatted, untilDateFormatted),
        },
        relations: {
          sub_category_org: {
            category_org: true,
          },
        },
        skip: offset,
        take: pageSize,
        order: {
          create_data: 'desc',
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      const totalPages = Math.ceil(total / pageSize);

      return {
        results,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };
    }
  }

  async findOne(id: string) {
    const findOne = await ApplicationOrgEntity.find({
      where: {
        id,
      },
      relations: {
        sub_category_org: {
          category_org: true,
        },
      },
      order: {
        create_data: 'asc',
      },
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findOne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return findOne;
  }

  async create(body: CreateApplicationOrgDto) {
    let findSubCategory = null;

    if (body.sub_category_id != 'null') {
      findSubCategory = await Sub_Category_Section_Entity.findOne({
        where: {
          id: body.sub_category_id,
        },
      }).catch((e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }

    const createdOrg = await ApplicationOrgEntity.createQueryBuilder()
      .insert()
      .into(ApplicationOrgEntity)
      .values({
        applicant: body.applicant,
        application_type: body.application_type,
        comment: body.comment,
        // crossfields: body.crossfields,
        income_date: body.income_date,
        incoming_number: body.incoming_number,
        organization_name: body.organization_name,
        organization_type: body.organization_type,
        perform_date: body.perform_date,
        performer: body.perform_date,
        region: body.region,
        resend_application: body.resend_application,
        response: body.response,
        above_incomes: body.above_incomes,
        application_sort: body.application_sort,
        deadline_date: body.deadline_date,
        director_fullName: body.director_fullName,
        dublicate: body.dublicate,
        outcome_date: body.outcome_date,
        outcoming_number: body.outcoming_number,
        request_type: body.request_type,
        response_to_request: body.response_to_request,
        seen_date_breaked: body.seen_date_breaked,
        where_seen: body.where_seen,
        sub_category_org: findSubCategory,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

    return;
    // }
  }

  async update(id: string, body: UpdateApplicationOrgDto) {
    const findaplicationCallCenter = await ApplicationOrgEntity.findOne({
      where: {
        id: id,
      },
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    let findSubCategory = findaplicationCallCenter.sub_category_org;

    if (body.sub_category_id != 'null') {
      findSubCategory = await Sub_Category_Section_Entity.findOne({
        where: {
          id: body.sub_category_id,
        },
      }).catch((e) => {
        console.log(e);

        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }

    const updatedOrganization = await ApplicationOrgEntity.update(id, {
      applicant: body.applicant || findaplicationCallCenter.applicant,
      application_type:
        body.application_type || findaplicationCallCenter.application_type,
      comment: body.comment || findaplicationCallCenter.comment,
      // crossfields: body.crossfields || findaplicationCallCenter.crossfields,
      income_date: body.income_date || findaplicationCallCenter.income_date,
      incoming_number:
        body.incoming_number || findaplicationCallCenter.incoming_number,
      organization_name:
        body.organization_name || findaplicationCallCenter.organization_name,
      organization_type:
        body.organization_type || findaplicationCallCenter.organization_type,
      perform_date: body.perform_date || findaplicationCallCenter.perform_date,
      performer: body.perform_date || findaplicationCallCenter.performer,
      region: body.region || findaplicationCallCenter.region,
      resend_application:
        body.resend_application || findaplicationCallCenter.resend_application,
      response: body.response || findaplicationCallCenter.response,
      above_incomes:
        body.above_incomes || findaplicationCallCenter.above_incomes,
      application_sort:
        body.application_sort || findaplicationCallCenter.application_sort,
      deadline_date:
        body.deadline_date || findaplicationCallCenter.deadline_date,
      director_fullName:
        body.director_fullName || findaplicationCallCenter.director_fullName,
      dublicate: body.dublicate || findaplicationCallCenter.dublicate,
      outcome_date: body.outcome_date || findaplicationCallCenter.outcome_date,
      outcoming_number:
        body.outcoming_number || findaplicationCallCenter.outcome_date,
      request_type: body.request_type || findaplicationCallCenter.request_type,
      response_to_request:
        body.response_to_request ||
        findaplicationCallCenter.response_to_request,
      seen_date_breaked:
        body.seen_date_breaked || findaplicationCallCenter.seen_date_breaked,
      where_seen: body.where_seen || findaplicationCallCenter.where_seen,
      sub_category_org: findSubCategory,
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    return;
  }

  async remove(id: string) {
    const findaplicationOrg = await ApplicationOrgEntity.findOneBy({
      id,
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findaplicationOrg) {
      throw new HttpException('application not found', HttpStatus.NOT_FOUND);
    }

    await ApplicationOrgEntity.delete({ id });
  }
}
