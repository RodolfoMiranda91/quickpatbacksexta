import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { PatrimonioController } from "./patrimonio.controller";
import { patrimonioProviders } from "./patrimonio.providers";
import { PatrimonioService } from "./patrimonio.service";



@Module({
    imports: [DatabaseModule],
    controllers:[PatrimonioController],
    providers:[
        ...patrimonioProviders,
        PatrimonioService,  
    ]
})
export class PatrimonioModule{
}