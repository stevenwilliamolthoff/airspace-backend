import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
} from "typeorm"
import moment from "moment"

type OperationColumns = keyof Operations

@Entity({ name: "operations" })
export default class Operations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column("text")
  title: string

  @Column("json", { nullable: true })
  geo_json: any

  @Column("timestamptz", {
    default: "now",
  })
  start_at: string

  @Column("timestamptz", {
    default: () => "NOW() + interval '1 hour'",
  })
  end_at: string

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
    this.geo_json = operation.geo_json
    this.start_at = operation.start_at
    this.end_at = operation.end_at
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
