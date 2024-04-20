const fs = require('fs');

const superagent = require('superagent');
//===========================================================================================================================================================================
//// flat structure vs triangular call back shape

const readFilePro2_chaining = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('🧾I could not find the  to read');
      console.log('------>>>>', data);
      resolve(data);
    });
  });
};

const writePro2_chaining = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('🦯I could not find the file to write');
      resolve(data);
    });
  });
};

const check_dir = (dirname) => {
  const fileExits = fs.existsSync(dirname);
  if (!fileExits) {
    console.log(`This file does not exit ${dirname}`);
  } else {
    return dirname;
  }
};

/// ==== using async functions

const getDotApi = async () => {
  try {
    const data = await readFilePro2_chaining(`${__dirname}/dog.txt`);
    const res = await await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    await writePro2_chaining(check_dir('dog-image.txt'), res.body.message);
  } catch (err) {
    console.log(err);
  }
};

//getDotApi();
//===== Method 1
// ======= Building Promise ===
/*

const readFilePro = (file) => {
  // return promise
  return new Promise((resolve, reject) => {
    // at this stage regardless the promise resolve or reject, we need to read the file first
    fs.readFile(file, (err, data) => {
      if (err) reject(`😣😏${err.message}😣😣`);
      resolve(data);
      console.log(`😁😀😁😀 ${data}`);
    });
  });
};

readFilePro(`${__dirname}/dog.txt`).then((data) => {
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((response) => {
      console.log(response.body.message);
      // fs.writeFile('where to write', 'what to write', anyproblems =>{xxxxxxx})
      fs.writeFile(
        `${__dirname}/dog-image.txt`,
        response.body.message,
        (err) => {
          if (err) console.log(err.message);
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
});
*/

//====================================================================================

//===== Method 2 promisify
// ======= Building Promise ===
// in this part we are going to change the then() callback function
/*

readFilePro2_chaining(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log('====>>>>>', data);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writePro2_chaining(`dog-image.txt`, res.body.message);
    //fs.writeFile('dog-image.txt', res.body.message)
    // fs.writeFile(`dog-image.txt`, res.body.message, (err) => {
    //   if (err) console.log(err.message);
    //   console.log('image saved 😁');
    // });
  })
  .then(() => {
    console.log('image saved 😁');
  })
  .catch((err) => {
    console.log(err);
  });

  */
/*
fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
    console.log("bread: ", data);
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(res => {
            fs.writeFile('dog-image.txt', res.body.message, err => {
                console.log(err)
            });
        }).catch(err => {
            console.log(err)
        })
        //.end((err, res) => {
            // if there is error we need to stop right here.
            // if (err)  console.log(err);

            // console.log(res.body.message);

            // fs.writeFile('dog-image.txt', res.body.message, err => {
            //     if (err) console.log(err);
            // });

    //});

});
*/
//===========================================================================================================================================================================

(async() => {
  try {
    const data = await getDotApi()

    console.log('1: Will get dop pics!', data);

    console.log('2: Will get dop pics!');
  } catch (error) {
    console.log('ERROR 💥💥💥💥')
  }
  
})()
//The above code is a simple example of how to read a file and then make a request to an API.
