import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { Category_Section_Entity } from 'src/entities/category_org.entity';
import { Sub_Category_Section_Entity } from 'src/entities/sub_category_org.entity';
import { ApplicationOrgEntity } from 'src/entities/applicationOrg.entity';
import { ApplicationCallCenterEntity } from 'src/entities/applicationCallCenter.entity';
import { Region_Entity } from 'src/entities/region.entity';
import { District_Entity } from 'src/entities/district.entity';
// import { Phone_Organization_Entity } from 'src/entities/phone_organization.entity';
// import { CommentAndRateEntity } from 'src/entities/commentAndRate.entity';
// import { Picture_Organization_Entity } from 'src/entities/picture_organization.entity';
// import { ImportedFilesTitleEntity } from 'src/entities/imported_files_title.entity';
// import { Section_Entity } from 'src/entities/section.entity';
// import { Saved_Organization_Entity } from 'src/entities/saved_org.entity';
// import { EntertainmentsEntity } from 'src/entities/entertainment.entity';
// import { EntertainmentCategoriesEntity } from 'src/entities/entertainment_Categories.entity';
// import { KnowDataEntity } from 'src/entities/know_data.entity';
// import { CommunalEntity } from 'src/entities/communal.entity';
// import { InformationTashkentEntity } from 'src/entities/information_Tashkent.entity';
// import { NumbersCodesEntity } from 'src/entities/Numbers_codes.entity';
// import { ControlUsersEntity } from 'src/entities/control_users.entity';

dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [
    UsersEntity,
    // ControlUsersEntity,
    // EntertainmentCategoriesEntity,
    // EntertainmentsEntity,
    // CommunalEntity,
    // InformationTashkentEntity,
    // KnowDataEntity,
    // NumbersCodesEntity,
    Category_Section_Entity,
    Sub_Category_Section_Entity,
    ApplicationOrgEntity,
    ApplicationCallCenterEntity,
    Region_Entity,
    District_Entity
    // Section_Entity,
    // ApplicationCallCenterEntity,
    // Saved_Organization_Entity,
    // Phone_Organization_Entity,
    // CommentAndRateEntity,
    // Picture_Organization_Entity,
    // ImportedFilesTitleEntity,
  ],
  autoLoadEntities: true,
  synchronize: true,
};
