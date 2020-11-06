export const data = [];

const fillData = (max) => {
  for (let i = 0; i < max; ++i) {
    data.push({
      name: "Name",
      email: "test@test.com",
      age: Math.floor(Math.random() * 100),
    });
  }
};

fillData(10);
