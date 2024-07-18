import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSectionCategoryDto } from './dto/create_section_categories.dto';
import { UpdateSectionCategoryDto } from './dto/update_section_categories.dto';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { Between, ILike, Like,  } from 'typeorm';
import { Sub_Category_Section_Entity } from 'src/entities/sub_category_org.entity';
@Injectable()
export class SectionCategoriesService {
  async findallstatisticsfilter( 
    categoryId: string,
    subCategoryId: string,
    region: string,
    fromDate: string,
    untilDate: string,
    pageNumber = 1,
    pageSize = 10){
      const offset = (pageNumber - 1) * pageSize;
      if (fromDate == 'null' || untilDate == 'null') {

        const [results, total] = await Category_Section_Entity.findAndCount({
          where: {
            id: categoryId == 'null' ? null : categoryId,
            sub_category_orgs :{
              id: subCategoryId == 'null' ? null : subCategoryId,
              applicationCallcenter :{
                IsDraf: 'false',
                districts :{
                  region : {
                    id: region == 'null' ? null : region,
                   }
                }
              }
            }
          },
          relations: {
           sub_category_orgs: {
            applicationCallcenter: {
              districts: {
                region: true
              },
            }
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

        let arr = [ ]
    results.forEach(item  => {
          item.sub_category_orgs.forEach(subCategory => {

            arr.push({
              ...item,
              sub_category_orgs: {...subCategory,
              count : subCategory.applicationCallcenter.length }
            })
          });
      });

      console.log(arr , 'okkk');
      
  
        const totalPages = Math.ceil(total / pageSize);
  
        return {
          
          results : arr,
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
  
        const [results , total] = await Category_Section_Entity.findAndCount({
          where: {
            id: categoryId == 'null' ? null : categoryId,
            sub_category_orgs :{
              id: subCategoryId == 'null' ? null : subCategoryId,
              applicationCallcenter :{
                IsDraf: 'false',
                districts :{
                  region : {
                    id: region == 'null' ? null : region,
                   }
                },
                create_data: Between(fromDateFormatted, untilDateFormatted),
              }
            }
          },
          relations: {
           sub_category_orgs: {
            applicationCallcenter: {
              districts: {
                region: true
              },
            }
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
        let arr = [ ]
        let   resultsa : any = results.forEach(item  => {
          item.sub_category_orgs.forEach(subCategory => {

            arr.push({
              item,
              subCategory,
              count : subCategory.applicationCallcenter.length 
            })
              // subCategory.count = subCategory.applicationCallcenter.length ;
          });
      });

      console.log(arr , 'okkk');
      

  
        const totalPages = Math.ceil(total / pageSize);
  
        return {
          arr,
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

  async findOne(id: string , title: string , pageNumber = 1,
    pageSize = 10) {
      const offset = (pageNumber - 1) * pageSize;
    const  [results, total]  =
      await Sub_Category_Section_Entity.findAndCount({
        where: {
          title: title == 'null' ? null : ILike(`%${title}%`),
          category_org : {
            id :id
          }
        },
        relations: {
          category_org: true,
        },

        skip: offset,
        take: pageSize,
      }).catch(
        (e) => {
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        },
      );
      const totalPages = Math.ceil(total / pageSize);

      return {
        results ,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };
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
    }).catch((e) => {
      console.log(e);
      
      throw new HttpException('Not found Category', HttpStatus.BAD_REQUEST);
    });
    console.log(findCategory);
    if (!findCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    // await Category_Section_Entity.createQueryBuilder()
    //   .delete()
    //   .from(Category_Section_Entity)
    //   .where({ id })
    //   .execute();

      await Category_Section_Entity.delete({ id }).catch((e) => {
        console.log(e);
        
        throw new HttpException('Not found Category', HttpStatus.BAD_REQUEST);
      });;
  }
}
