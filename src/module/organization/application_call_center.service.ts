import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationCallCenterDto } from './dto/create_organization.dto';
import { UpdateApplicationCallCenterDto } from './dto/update_organization.dto';
// import { ApplicationCallCenterEntity } from 'src/entities/applicationOrg.entity';
// import { Phone_Organization_Entity } from 'src/entities/phone_organization.entity';
import { extname } from 'path';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { Sub_Category_Section_Entity } from 'src/entities/sub_category_org.entity';
// import { Picture_Organization_Entity } from 'src/entities/picture_organization.entity';/
import { allowedImageFormats } from 'src/utils/videoAndImageFormat';
import { googleCloudAsync } from 'src/utils/google_cloud';
import { ApplicationCallCenterEntity } from 'src/entities/applicationCallCenter.entity';

@Injectable()
export class ApplicationCallCenterServise {
  async findAll() {
    const findAll = await ApplicationCallCenterEntity.find({
      relations: {
        sub_category_call_center: {
          category_org:true
        }
      },
      order: {
        create_data: 'asc',
      },
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    return findAll;
  }

  async findOne(id: string) {
    const findOne = await ApplicationCallCenterEntity.find({
      where: {
        id,
      },
      relations: {
        sub_category_call_center: {
          category_org:true
        }
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

  async create(
    body: CreateApplicationCallCenterDto,
  ) {
    console.log(body);


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

    const createdOrg = await ApplicationCallCenterEntity.createQueryBuilder()
      .insert()
      .into(ApplicationCallCenterEntity)
      .values({
        applicant : body.applicant,
        application_type : body.application_type,
        comment: body.comment,
        crossfields :body.crossfields,
        field: body.field ,
        income_date : body.income_date,
        incoming_number: body.incoming_number ,
        organization_name: body.organization_name,
        organization_type:body.organization_type,
        perform_date :body.perform_date,
        performer: body.perform_date,
        region :body.region,
        resend_application: body.resend_application,
        response :body.response,
        sended_to_organizations: body.sended_to_organizations,
        sub_category_call_center: findSubCategory,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });
  

      return;
    // }
  }

  async update(id: string, body: UpdateApplicationCallCenterDto) {
    const findaplicationCallCenter = await ApplicationCallCenterEntity.findOne({
      where: {
        id: id,
      },
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    let findSubCategory = findaplicationCallCenter.sub_category_call_center;

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

    const updatedOrganization = await ApplicationCallCenterEntity.update(id, {
      applicant : body.applicant || findaplicationCallCenter.applicant,
      application_type : body.application_type || findaplicationCallCenter.application_type,
      comment: body.comment || findaplicationCallCenter.comment,
      crossfields :body.crossfields || findaplicationCallCenter.crossfields,
      field: body.field || findaplicationCallCenter.field,
      income_date : body.income_date || findaplicationCallCenter.income_date,
      incoming_number: body.incoming_number  || findaplicationCallCenter.incoming_number,
      organization_name: body.organization_name || findaplicationCallCenter.organization_name,
      organization_type:body.organization_type || findaplicationCallCenter.organization_type,
      perform_date :body.perform_date || findaplicationCallCenter.perform_date,
      performer: body.perform_date || findaplicationCallCenter.performer,
      region :body.region || findaplicationCallCenter.region,
      resend_application: body.resend_application || findaplicationCallCenter.resend_application,
      response :body.response || findaplicationCallCenter.response,
      sended_to_organizations: body.sended_to_organizations || findaplicationCallCenter.sended_to_organizations,
      sub_category_call_center: findSubCategory,
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

   return 
  }

  async remove(id: string) {
    const findaplicationCallCenter = await ApplicationCallCenterEntity.findOneBy({ id }).catch(
      () => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      },
    );

    if (!findaplicationCallCenter) {
      throw new HttpException('application not found', HttpStatus.NOT_FOUND);
    }

    await ApplicationCallCenterEntity.delete({ id });
  }
}
