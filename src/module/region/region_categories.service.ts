import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create_region_categories.dto';
import { UpdateRegionDto } from './dto/update_region_categories.dto';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { Region_Entity } from 'src/entities/region.entity';
@Injectable()
export class RegionCategoriesService {
  async findAll() {
    const findRegion = await Region_Entity.find().catch(
      (e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      },
    );
    return findRegion;
  }

  async findOne(id: string) {
    const findRegion: Region_Entity =
      await Region_Entity.findOne({
        where: {
          id: id,
        },
        relations: {
          districts: true,
        },
      });

    if (!findRegion) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return findRegion;
  }

  async create(body: CreateRegionDto) {
    const findRegion = await Region_Entity.findOneBy({
      title: body.title,
    });

    if (findRegion) {
      throw new HttpException(
        'Already created this category',
        HttpStatus.FOUND,
      );
    }
    await Region_Entity.createQueryBuilder()
      .insert()
      .into(Region_Entity)
      .values({
        title: body.title.toLowerCase(),
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async update(id: string, body: UpdateRegionDto) {
    const findRegion = await Region_Entity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findRegion) {
      throw new HttpException('Not found Category', HttpStatus.NOT_FOUND);
    }

    await Region_Entity.createQueryBuilder()
      .update(Region_Entity)
      .set({
        title: body.title.toLowerCase() || findRegion.title,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const findRegion = await Region_Entity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Not found Category', HttpStatus.BAD_REQUEST);
    });

    if (!findRegion) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    await Region_Entity.createQueryBuilder()
      .delete()
      .from(Region_Entity)
      .where({ id })
      .execute();
  }
}
