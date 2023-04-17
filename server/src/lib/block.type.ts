import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileData {
  @Field({ nullable: true })
  ref: string;

  @Field({ nullable: true })
  url: string;
}

@ObjectType()
export class BlockData {
  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  level: number;

  @Field({ nullable: true })
  file: FileData;

  @Field({ nullable: true })
  caption: string;

  @Field({ nullable: true })
  stretched: boolean;

  @Field({ nullable: true })
  withBorder: boolean;

  @Field({ nullable: true })
  withBackground: boolean;

  @Field(() => [String], { nullable: true })
  items: [string];

  @Field({ nullable: true })
  style: string;
}

@ObjectType()
export class Block {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field(() => BlockData)
  data: BlockData;
}

// input

@InputType()
export class InputFileData {
  @Field({ nullable: true })
  ref: string;

  @Field({ nullable: true })
  url: string;
}

@InputType()
export class InputBlockData {
  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  level: number;

  @Field({ nullable: true })
  file: InputFileData;

  @Field({ nullable: true })
  caption: string;

  @Field({ nullable: true })
  stretched: boolean;

  @Field({ nullable: true })
  withBorder: boolean;

  @Field({ nullable: true })
  withBackground: boolean;

  @Field(() => [String], { nullable: true })
  items: [string];

  @Field({ nullable: true })
  style: string;
}

@InputType()
export class InputBlock {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field(() => InputBlockData)
  data: InputBlockData;
}
