import { Data, DataArray } from "../src/";

interface IPerson {
  name: string;
  dob?: string;
  age?: number;
}
const personData = new Data<IPerson>({
  onChange: (value) => console.log(value),
  defaultValue: {
    name: "",
    age: 18,
  },
});

personData.onChange.name("some person name");
personData.onChange.age(70);
personData.onChange.dob("dob date");

const personDataArray = new DataArray<IPerson>({
  onChange: (value) => console.log(value),
  defaultValue: [
    {
      name: "",
      age: 18,
    },
  ],
});

personData.data = { name: "erased" };

personDataArray.onChange[personDataArray.data.length]({
  name: `data${personDataArray.data.length}`,
});
personDataArray.onChange[personDataArray.data.length]({
  name: `data${personDataArray.data.length}`,
});

personDataArray.data = [];
