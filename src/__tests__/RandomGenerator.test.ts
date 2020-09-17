import { RandomGenerator } from "../main"
import { IOptionRandomData } from "../model";

let fHitsCalculator=(oldData:string[], newData:string[])=>{
    
    let hits=0;
    for (let i = 0; i < oldData.length; i++) {
        let found=false;
        for (let j = 0; j < newData.length; j++) {
           if(oldData[i]===newData[j])
           {
               found=true;
               break;
           }
        }
        
        if(!found){
            hits++;
        }
    }

    return hits;
}

describe("App test",()=>{
    it("default options", ()=>{
        let oRandomData= new RandomGenerator();
        let options= (oRandomData as any).options as IOptionRandomData;

        expect(options.pattern).toBe("@data");
        expect(options.size).toBe(3);

    })


    it("size", ()=>{
            let oRandomData= new RandomGenerator({size:10});

            let element= oRandomData.Generate(1).data[0];

            expect(element.length).toBe(10);
    });


    describe("data",()=>{
        it("size", ()=>{
            let oRandomData= new RandomGenerator();

            let data= oRandomData.Generate(10).data;

            expect(data.length).toBe(10);
        });

        it("basic data", ()=>{
            let oRandomData= new RandomGenerator();
            let size=10;

            let data= oRandomData.Generate(size).data;

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if(i!=j){
                        expect(data[i]).not.toBe(data[j]);
                    }
                }
            }
        });

        describe("pattern", ()=>{
            describe("basic", ()=>{
                let oRandomData= new RandomGenerator({pattern:"user_@data"});
                let data= oRandomData.Generate(1).data;

                expect(data[0]).toMatch(/^user_/);
            });
            describe("json", ()=>{
                let oRandomData= new RandomGenerator({pattern:'{"user":"user_@data", "id":"@data"}'});
                let data= oRandomData.Generate(1).data[0];
    
                let obj:{user:string, id:string}=JSON.parse(data);

                expect(obj.user).toMatch(/^user_/);
                expect(obj.id.length).toBe(3);

            });


        });
    })

    describe("Regression", ()=>{
        it("Basic", ()=>{
            let oGenerator= new RandomGenerator();
            let oRandomData= oGenerator.Generate(10);

            let data= oRandomData.data;
            let newData= oRandomData.Next().data;

            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < newData.length; j++) {
                   expect(data[i]).not.toBe(newData[j]); 
                }             
            }
        })

        describe("Random parts", ()=>{
            it("Few",()=>{
                let oGenerator= new RandomGenerator();
                let oRandomData= oGenerator.Generate(10);
    
                let data= oRandomData.data;
                let newData= oRandomData.Next(3).data;
    
                let hits=fHitsCalculator(data, newData);
    
                expect(hits).toBe(3);
            })

            it("Regular",()=>{
                let oGenerator= new RandomGenerator({size:10});
                let oRandomData= oGenerator.Generate(100);
    
                let data= oRandomData.data;
                let newData= oRandomData.Next(20).data;
    
                let hits=fHitsCalculator(data, newData);
    
                expect(hits).toBe(20);
            })

            it("Lot",()=>{
                let oGenerator= new RandomGenerator({size:10});
                let oRandomData= oGenerator.Generate(1000);
    
                let data= oRandomData.data;
                let newData= oRandomData.Next(500).data;
    
                let hits=fHitsCalculator(data, newData);
    
                expect(hits).toBe(500);
            })

            it("Combo",()=>{
                let oGenerator= new RandomGenerator({size:10});
                let oRandomData= oGenerator.Generate(100);
                let oData=oRandomData.Next(20);

                let data= oRandomData.data;
                let newData= oData.data;
    
                let hits=fHitsCalculator(data, newData);
    
                expect(hits).toBe(20);

                oData=oData.Next(20);
                data= newData;
                newData= oData.data;

                hits=fHitsCalculator(data, newData);
                expect(hits).toBe(20);

                oData=oData.Next(5);
                data= newData;
                newData= oData.data;

                hits=fHitsCalculator(data, newData);
                expect(hits).toBe(5);

                oData=oData.Next();
                data= newData;
                newData= oData.data;

                hits=fHitsCalculator(data, newData);
                expect(hits).toBe(100);

                oData=oData.Next(8);
                data= newData;
                newData= oData.data;

                hits=fHitsCalculator(data, newData);
                expect(hits).toBe(8);
            })
        })
    })
})