const fs = require('fs');
const superagent = require('superagent');

// running multiple promises without await key word

//============ setting our functions first ======
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

const getDotApi = async () => {
    try {
        const data = await readFilePro2_chaining(`${__dirname}/dog.txt`)

        const resPromise_1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);


        const resPromise_2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);


        const resPromise_3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        // using Promise.all() method
        
        const allPro = await Promise.all([resPromise_1, resPromise_2, resPromise_3]);

        
        await writePro2_chaining(
          check_dir('dog-image.txt'),
          allPro.map((el) => el.body.message).join('\n')
        );

    } catch (err) {
        console.log(err);
    }
};

getDotApi();