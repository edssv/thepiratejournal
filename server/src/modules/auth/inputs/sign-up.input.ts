import { InputType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/modules/user/inputs/create-user.input';

@InputType()
export class SignUpInput extends CreateUserInput {}
