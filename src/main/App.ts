import { IOptionRandomData } from "..";
import uid from "uid"
import { RandomData } from "../domain/RandomData";
import { IRandomData } from "../model/IRandomData";

export class RandomGenerator{

    private readonly options:IOptionRandomData;

    constructor(options?:Partial<IOptionRandomData>) {
        this.options= Object.assign({
            pattern:"@data",
            size:3    
        },options);
    }

    Generate(number:number):IRandomData{
        let aData:string[]= [];
        let re = /\@data/gi;

        for (let i = 0; i < number; i++) {
            aData.push(this.options.pattern.replace(re, uid(this.options.size)));
        }

        return new RandomData(aData, this);
    }
}