# mxcd
Random data

```typescript
let oGenerator= new RandomGenerator();
let oRandomData= oGenerator.Generate(10);

let data= oRandomData.data; //Generate a string[10]
let oNewDataRandom= oRandomData.Next(3);
let newData= oRandomData.data; //Generate a string[10] with 3 rows changed
```
## Options
### Template

```typescript
let oRandomData= new RandomGenerator({pattern:'{"user":"user_@data", "id":"@data"}'}); //@data is mandatory
let data= oRandomData.Generate(100);

let obj:[{user:string, id:string}]=JSON.parse(data);
```
### Size

```typescript
let oRandomData= new RandomGenerator({size:10}); //Random string of 10 characteres

let element= oRandomData.Generate(1).data[0];
```

<hr/>

Learn more in https://muxocode.com

<p align="center">
  <img src="https://muxocode.com/branding.png">
</p>