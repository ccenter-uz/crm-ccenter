import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSectionCategoryDto } from './dto/create_section_categories.dto';
import { UpdateSectionCategoryDto } from './dto/update_section_categories.dto';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { ILike, Like,  } from 'typeorm';
@Injectable()
export class SectionCategoriesService {
  async findAll(  title : string,  pageNumber = 1,
    pageSize = 10,) {
      const offset = (pageNumber - 1) * pageSize;
    const [results, total] = await Category_Section_Entity.findAndCount({
where : {
title : title == 'null' ? null: ILike(`%${title}%`),

},

      relations : {
       sub_category_orgs : true
      },
      order: {
        create_data: 'desc',
      },

      select : {
        id: true,
        title :true,
        create_data :true,
        update_date :true,
        sub_category_orgs : {
          id:true
        } ,
      },
      skip: offset,
      take: pageSize,
    }).catch(
      (e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      },
    );

    const resultsWithCount = results.map(result => ({
      ...result,
      sub_category_orgs: result.sub_category_orgs.length,
    })); 
    const totalPages = Math.ceil(total / pageSize);
    return {
      results : resultsWithCount,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        pageSize,
        totalItems: total,
      },
    };
  }

  async findOne(id: string) {
    const findCategory: Category_Section_Entity =
      await Category_Section_Entity.findOne({
        where: {
          id: id,
        },
        relations: {
          sub_category_orgs: true,
        },
      });

    if (!findCategory) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return findCategory;
  }

  async create(body: CreateSectionCategoryDto) {
    const findCategory = await Category_Section_Entity.findOneBy({
      title: body.title,
    });

    if (findCategory) {
      throw new HttpException(
        'Already created this category',
        HttpStatus.FOUND,
      );
    }
    await Category_Section_Entity.createQueryBuilder()
      .insert()
      .into(Category_Section_Entity)
      .values({
        title: body.title.toLowerCase(),
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async update(id: string, body: UpdateSectionCategoryDto) {
    const findCategory = await Category_Section_Entity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findCategory) {
      throw new HttpException('Not found Category', HttpStatus.NOT_FOUND);
    }

    await Category_Section_Entity.createQueryBuilder()
      .update(Category_Section_Entity)
      .set({
        title: body.title.toLowerCase() || findCategory.title,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const findCategory = await Category_Section_Entity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Not found Category', HttpStatus.BAD_REQUEST);
    });

    if (!findCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    await Category_Section_Entity.createQueryBuilder()
      .delete()
      .from(Category_Section_Entity)
      .where({ id })
      .execute();
  }
}
