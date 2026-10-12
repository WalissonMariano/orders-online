import { PartialType } from '@nestjs/swagger';
import { CreateTypeOfItemsDto } from './create-type-of-items.dto';

export class UpdateTypeOfItemsDto extends PartialType(CreateTypeOfItemsDto) {}
