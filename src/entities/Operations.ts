import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
} from "typeorm"
import moment from "moment"

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

  update(operation: Partial<Operations>) {
    this.title = operation.title
    this.feature_collection = operation.feature_collection
    return this.save()
  }

  static getSorted(operations: Operations[]) {
    return operations.sort((operationA, operationB) => {
      const momentA = moment(operationA.updated_at)
      const momentB = moment(operationB.updated_at)
      if (momentA.isAfter(momentB)) {
        return -1
      } else if (momentA.isBefore(momentB)) {
        return 1
      } else {
        return 0
      }
    })
  }
}
