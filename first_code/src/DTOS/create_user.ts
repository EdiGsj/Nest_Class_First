import { Length, IsNotEmpty } from 'class-validator';

export class Create{

    @IsNotEmpty({message: 'Nome deve ser preenchido'})
    name: string;
    @IsNotEmpty()
    @Length(10, 100)
    email: string;
};