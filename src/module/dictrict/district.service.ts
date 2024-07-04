import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create_district.dto';

import { UpdateDistrictDto } from './dto/update_district.dto';

import { Sub_Category_Section_Entity } from 'src/entities/sub_category_org.entity';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { District_Entity } from 'src/entities/district.entity';

@Injectable()
export class DistrictServise {
  async findAll() {
    const findDistrict = await District_Entity.find({
      order: {
        create_data: 'asc',
      },
    }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    return findDistrict;
  }

  async findOne(id: string) {
    const findOne = await District_Entity.find({
      where: {
        id,
      },
      relations: {
        applicationCallcenterIndistrict: true,
      },
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    return findOne;
  }

  async create(body: CreateDistrictDto) {
    const findRegion = await District_Entity.findOne({
      where: {
        id: body.region_id,
      },
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findRegion) {
      throw new HttpException(' Region not found', HttpStatus.NOT_FOUND);
    }

    await District_Entity.createQueryBuilder()
      .insert()
      .into(District_Entity)
      .values({
        title: body.title,
        region: findRegion,
      })
      .execute()
      .catch((e) => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });
  }
  async update(id: string, body: UpdateDistrictDto) {
    const findDistrict = await District_Entity.findOne({
      where: { id },
    });

    if (!findDistrict) {
      throw new HttpException('Sub Category not found', HttpStatus.NOT_FOUND);
    }
    let findRegion: District_Entity | null = null;
    if (body.region_id) {
      findRegion = await District_Entity.findOneBy({ id }).catch(
        (e) => {
          throw new HttpException('Not found Region', HttpStatus.NOT_FOUND);
        },
      );
      if (!findRegion) {
        throw new HttpException('Not found Region', HttpStatus.NOT_FOUND);
      }
    }

    const updatedVideo = await District_Entity.update(id, {
      title: body.title.toLowerCase() || findDistrict.title,

      region: findRegion,
    });

    return updatedVideo;
  }

  async remove(id: string) {
    const findDistrict = await District_Entity.findOneBy({
      id,
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findDistrict) {
      throw new HttpException('District not found', HttpStatus.NOT_FOUND);
    }

    await Sub_Category_Section_Entity.delete({ id });
  }
}
