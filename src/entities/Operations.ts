import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
} from "typeorm"

@Entity({ name: "operations" })
export default class Operations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column("text")
  title: string

  @Column("json", { nullable: true })
  feature_collection: any

  @Column("timestamptz", {
    default: "now",
  })
  created_at: Date

  @Column("timestamptz", {
    default: "now",
  })
  updated_at: Date

  @BeforeUpdate()
  onBeforeUpdate() {
    this.updated_at = new Date()
  }

  constructor(operation: Partial<Operations>) {
    super()
    Object.assign(this, operation)
  }
}
