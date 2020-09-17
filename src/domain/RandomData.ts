import { RandomGenerator } from "../main/App";
import { IRandomData } from "../model/IRandomData";

export class RandomData implements IRandomData{
    data: string[];
    private randomGenerator: RandomGenerator;

    constructor(data: string[], randomGenerator: RandomGenerator) {
        this.data = data;
        this.randomGenerator = randomGenerator;
    }

    Next(number?: number) {

        let result:IRandomData;
        
        if(number && number >= this.data.length){
            number= undefined;
        }

        if(number)
        {
            let oldData= Object.assign(<string[]>[], this.data);

            let newData= this.randomGenerator.Generate(number).data;
            let bloqs= Math.floor(oldData.length/number);
            let iterations = Math.floor(oldData.length/bloqs);

            for (let i = 0; i < iterations; i++) {
                let index = Math.floor(Math.random() * bloqs)+i*bloqs;
                oldData[index] = newData.pop()!;
            }

            result= new RandomData(oldData, this.randomGenerator);
        }
        else
        {
            result= this.randomGenerator.Generate(this.data.length);
        }
        

        return result;
    }
}
