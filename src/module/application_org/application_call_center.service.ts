import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationCallCenterDraftDto } from './dto/create_organization.dto';
import { UpdateApplicationCallCenterDraftDto } from './dto/update_organization.dto';

import { Sub_Category_Section_Entity } from 'src/entities/sub_category_org.entity';

import { ApplicationCallCenterEntity } from 'src/entities/applicationCallCenter.entity';
import { Between, ILike, Like } from 'typeorm';
import { District_Entity } from 'src/entities/district.entity';
import { CustomRequest } from 'src/types';
import { ApplicationCallCenterDraftEntity } from 'src/entities/applicationCallCenterDrafts.entity';

@Injectable()
export class ApplicationCallCenterDraftServise {
  async findAll(
    categoryId: string,
    subCategoryId: string,
    region: string,
    district : string,
    income_number :string,
    operator :string ,
    response : string,
    fromDate: string,
    untilDate: string,
    pageNumber = 1,
    pageSize = 10,
  ) {
    const offset = (pageNumber - 1) * pageSize;

    if (fromDate == 'null' || untilDate == 'null') {
      const [results, total] = await ApplicationCallCenterDraftEntity.findAndCount({
        where: {
          incoming_number : income_number == 'null' ? null :  ILike(income_number),
          response: response =='null'? null : response,
          sub_category_call_center_drafts: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districtsDrafts : {
            id: district =='null' ? null : district,
            region : {
              id: region == 'null' ? null : region,
             }
          },
          user: {
            id: operator == 'null' ? null : operator
          }
        },
        relations: {
          sub_category_call_center_drafts: {
            category_org: true,
          },
          districtsDrafts: {
            region: true
          },
          user : true
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

      const [results, total] = await ApplicationCallCenterDraftEntity.findAndCount({
        where: {
          // region: region == 'null' ? null : region,
          incoming_number : income_number == 'null' ? null :   ILike(income_number),
          // phone: phone == 'null' ? null :  ILike(phone),
          sub_category_call_center_drafts: {
            id: subCategoryId == 'null' ? null : subCategoryId,
            category_org: {
              id: categoryId == 'null' ? null : categoryId,
            },
          },
          districtsDrafts : {
            id: district =='null' ? null : district,
            region : {
              id: region == 'null' ? null : region,
             }
          },
          create_data: Between(fromDateFormatted, untilDateFormatted),
        },
        relations: {
          sub_category_call_center_drafts: {
            category_org: true,
          },
          districtsDrafts: {
            region: true
          }
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
    const findOne = await ApplicationCallCenterDraftEntity.find({
      where: {
        id,
      },
      relations: {
        sub_category_call_center_drafts: {
          category_org: true,
          
        },
        districtsDrafts : {
          region : true
        },
        user: true
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

  async create(request: CustomRequest, body: CreateApplicationCallCenterDraftDto) {

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
    let findDistrict = null;
    if (body.district_id != 'null') {
      findDistrict = await District_Entity.findOne({
        where: {
          id: body.district_id,
        },
      }).catch((e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }

    const createdOrg = await ApplicationCallCenterDraftEntity.createQueryBuilder()
      .insert()
      .into(ApplicationCallCenterDraftEntity)
      .values({
        applicant: body.applicant,
        application_type: body.application_type,
        comment: body.comment,
        // income_number: body.income_number,
        phone: body.phone,                                       
        // crossfields: body.crossfields,
        income_date: body.income_date,
        incoming_number: body.incoming_number,
        organization_name: body.organization_name,
        organization_type: body.organization_type,
        perform_date: body.perform_date,
        performer: body.perform_date,
        resend_application: body.resend_application,
        response: body.response,
        sended_to_organizations: body.sended_to_organizations,
        sub_category_call_center_drafts : findSubCategory,
        districtsDrafts : findDistrict,
        // user: request.userId 
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

    return;
    // }
  }

  async update(request: CustomRequest, id: string, body: UpdateApplicationCallCenterDraftDto) {
    const findaplicationCallCenterDraft = await ApplicationCallCenterDraftEntity.findOne({
      where: {
        id: id,
      },
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    let findSubCategory = findaplicationCallCenterDraft.sub_category_call_center_drafts;

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
    let findDistrict = findaplicationCallCenterDraft.districtsDrafts;
    if (body.district_id != 'null') {
      findDistrict = await District_Entity.findOne({
        where: {
          id: body.district_id,
        },
      }).catch((e) => {
        console.log(e);
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
    }

    const updatedOrganization = await ApplicationCallCenterDraftEntity.update(id, {
      
      applicant: body.applicant || findaplicationCallCenterDraft.applicant,
      application_type:
        body.application_type || findaplicationCallCenterDraft.application_type,
      comment: body.comment || findaplicationCallCenterDraft.comment,
      // crossfields: body.crossfields || findaplicationCallCenter.crossfields,
      income_date: body.income_date || findaplicationCallCenterDraft.income_date,
      // income_number: body.income_number || findaplicationCallCenter.income_number ,
      phone: body.phone || findaplicationCallCenterDraft.phone,  
      incoming_number:
        body.incoming_number || findaplicationCallCenterDraft.incoming_number,
      organization_name:
        body.organization_name || findaplicationCallCenterDraft.organization_name,
      organization_type:
        body.organization_type || findaplicationCallCenterDraft.organization_type,
      perform_date: body.perform_date || findaplicationCallCenterDraft.perform_date,
      performer: body.perform_date || findaplicationCallCenterDraft.performer,
      resend_application:
        body.resend_application || findaplicationCallCenterDraft.resend_application,
      response: body.response || findaplicationCallCenterDraft.response,
      sended_to_organizations:
        body.sended_to_organizations ||
        findaplicationCallCenterDraft.sended_to_organizations,
      sub_category_call_center_drafts: findSubCategory,
      districtsDrafts :findDistrict ,
      // user: request.userId
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    return;
  }

  async remove(id: string) {
    const findaplicationCallCenterDraft =
      await ApplicationCallCenterDraftEntity.findOneBy({ id }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

    if (!findaplicationCallCenterDraft) {
      throw new HttpException('application not found', HttpStatus.NOT_FOUND);
    }

    await ApplicationCallCenterDraftEntity.delete({ id });
  }
}
