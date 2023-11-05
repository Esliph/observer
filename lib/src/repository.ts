import { ModelSchema, ModelSchemaOptions } from '@esliph/repository-memory'
import { EventModelArgs } from './model'

export class ObserverRepository extends ModelSchema<EventModelArgs> {
    constructor(options?: ModelSchemaOptions) {
        super('_ObserverEvents', options)
    }
}
