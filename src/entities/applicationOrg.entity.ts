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

@Entity()
export class ApplicationOrgEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  above_incomes: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  applicant: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  application_sort: string;

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
  crossfields: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  deadline_date: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  director_fullName: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  dublicate: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  income_date: string;

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
  outcome_date: string;
  @Column({
    type: 'character varying',
    nullable: true,
  })
  outcoming_number: string;
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
  @Column({
    type: 'character varying',
    nullable: true,
  })
  region: string;
  @Column({
    type: 'character varying',
    nullable: true,
  })
  request_type: string;
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
  response_to_request: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  seen_date_breaked: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  where_seen: string;

  @ManyToOne(
    () => Sub_Category_Section_Entity,
    (sub_category_org) => sub_category_org.applicationOrg,
    { nullable: true },
  )
  sub_category_org: Sub_Category_Section_Entity;

  // @OneToMany(() => Phone_Organization_Entity, (phone) => phone.organization)
  // phones: Phone_Organization_Entity[];

  // @OneToMany(
  //   () => Picture_Organization_Entity,
  //   (picture) => picture.organization_id,
  // )
  // pictures: Picture_Organization_Entity[];

  // @OneToMany(() => CommentAndRateEntity, (comment) => comment.organization_id)
  // comments: CommentAndRateEntity[];

  // @OneToMany(
  //   () => Saved_Organization_Entity,
  //   (saved_org) => saved_org.organization_id,
  // )
  // saved_organization: Saved_Organization_Entity[];

  @UpdateDateColumn({ name: 'updated_at' })
  update_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
