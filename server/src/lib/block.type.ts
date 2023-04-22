import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

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

  @Field({ nullable: true })
  service: string;

  @Field({ nullable: true })
  source: string;

  @Field({ nullable: true })
  embed: string;

  @Field({ nullable: true })
  width: number;

  @Field({ nullable: true })
  height: number;
}

@ObjectType()
export class Block {
  @Field(() => ID)
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

  @Field({ nullable: true })
  service: string;

  @Field({ nullable: true })
  source: string;

  @Field({ nullable: true })
  embed: string;

  @Field({ nullable: true })
  width: number;

  @Field({ nullable: true })
  height: number;
}

@InputType()
export class InputBlock {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field(() => InputBlockData)
  data: InputBlockData;
}
