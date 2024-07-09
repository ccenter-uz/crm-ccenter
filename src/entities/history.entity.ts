import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { ApplicationCallCenterEntity } from './applicationCallCenter.entity';
  
  @Entity()
  export class HistoryAplicationEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'character varying',
      nullable: true,
    })
    action: string;

    @ManyToOne(
        () => ApplicationCallCenterEntity,
        (application) => application.history,
        { nullable: true },
      )
    applicationCallCenter: ApplicationCallCenterEntity;

  
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  
  }
  