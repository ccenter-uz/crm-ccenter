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
import { Sub_Category_Section_Entity } from './sub_category_org.entity';
import { District_Entity } from './district.entity';
import { UsersEntity } from './users.entity';

@Entity()
export class ApplicationCallCenterDraftEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  applicant: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  application_type: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  comment: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  income_date: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  incoming_number: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  organization_name: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  organization_type: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  perform_date: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  performer: string;

  // @Column({
  //   type: 'character varying',
  //   nullable: true,
  // })
  // region: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  resend_application: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  response: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  sended_to_organizations: string;

  @ManyToOne(
    () => Sub_Category_Section_Entity,
    (sub_category_org) => sub_category_org.applicationCallcenterDrafts,
    { nullable: true },
  )
  sub_category_call_center_drafts: Sub_Category_Section_Entity;

  @ManyToOne(
    () => District_Entity,
    (districts) => districts.applicationCallcenterIndistrict,
    { nullable: true },
  )
  districtsDrafts: District_Entity;

  @ManyToOne(
    () => UsersEntity,
    (user) => user.applicationCallCenterDrafts,
    { nullable: true },
  )
  user: UsersEntity;

  @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
