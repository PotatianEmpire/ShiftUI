let obj = {
    func() {
      console.log('hi');
    },
    prop: 'property',
  };
  
  let transferObj = {
    prop: 'old',
  };
  
  console.log('obj:');
  for (key in obj) {
    console.log(obj[key]);
    transferObj[key] = obj[key];
  }
  
  console.log("transferred obj:");
  console.log(transferObj)