import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category_Section_Entity } from './category_org.entity';
import { ApplicationOrgEntity } from './applicationOrg.entity';
import { ApplicationCallCenterEntity } from './applicationCallCenter.entity';

@Entity()
export class Sub_Category_Section_Entity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  title: string;

  // @Column({
  //   type: 'character varying',
  //   nullable: true,
  // })
  // title_ru: string;

  // @Column({
  //   type: 'character varying',
  //   nullable: true,
  // })
  // title_en: string;

  @ManyToOne(
    () => Category_Section_Entity,
    (category_org) => category_org.sub_category_orgs,
    { nullable: true },
  )
  category_org: Category_Section_Entity;

  @OneToMany(() => ApplicationCallCenterEntity, (org) => org.sub_category_call_center)
  applicationCallcenter: ApplicationOrgEntity[];

  @OneToMany(() => ApplicationOrgEntity, (org) => org.sub_category_org)
  applicationOrg: ApplicationOrgEntity[];

  @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
